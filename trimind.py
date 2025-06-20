import asyncio
import yfinance as yf
import re
import logging
import openai
import requests
import streamlit as st
import aiohttp
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
oai_key = os.getenv("OPENAI_API_KEY")
bearer_token = os.getenv("JENIUS_BEARER_TOKEN")
openai.api_key = oai_key

# ----------------- AGENT 1: Sentiment Analysis (Jenius MCP) -----------------
async def call_jenius_sentiment(symbol):
    headers = {"Authorization": f"Bearer {bearer_token}"}
    async with aiohttp.ClientSession() as session:
        async with session.post(
            "https://mcp-jenius.rndm.io/api/tools/sentiment_news_analysis",
            json={"symbol": symbol},
            headers=headers
        ) as response:
            return await response.text()

def extract_sentiment(markdown):
    sentiment = re.search(r"Sentiment Score:\s*(-?[0-9.]+)", markdown)
    return {
        "sentiment_score": float(sentiment.group(1)) if sentiment else 0.0,
        "summary": markdown[:250] + "..."
    }

async def agent_sentiment(symbol):
    raw = await call_jenius_sentiment(symbol)
    return extract_sentiment(raw)

# ----------------- AGENT 2: Technicals (Jenius MCP) -----------------
async def call_jenius_technical(symbol):
    headers = {"Authorization": f"Bearer {bearer_token}"}
    async with aiohttp.ClientSession() as session:
        async with session.post(
            "https://mcp-jenius.rndm.io/api/tools/web2_insights_analysis",
            json={"symbol": symbol},
            headers=headers
        ) as response:
            return await response.text()

def extract_metrics(markdown):
    metrics = {}
    try:
        price = re.search(r"Price:\s*\$([\d,.]+)", markdown)
        vwap = re.search(r"VWAP:\s*\$([\d,.]+)", markdown)
        direction = re.search(r"Direction:\s*(\w+)", markdown)
        score = re.search(r"Conviction Score:\s*([\d.]+)", markdown)
        if price: metrics['price'] = float(price.group(1).replace(',', ''))
        if vwap: metrics['vwap'] = float(vwap.group(1).replace(',', ''))
        if direction: metrics['direction'] = direction.group(1).lower()
        if score: metrics['conviction_score'] = float(score.group(1))
    except Exception as e:
        logging.error(f"Technical parse error: {e}")
    return metrics

async def agent_jenius(symbol):
    markdown = await call_jenius_technical(symbol)
    data = extract_metrics(markdown)
    data['summary'] = markdown[:300] + "..."
    return data

# ----------------- AGENT 3: Fundamentals -----------------
def agent_fundamentals(ticker):
    try:
        info = yf.Ticker(ticker).info
        pe = info.get("trailingPE", 0)
        beta = info.get("beta", 1)
        growth = info.get("earningsQuarterlyGrowth", 0)
        value_score = min(max((growth * 2 - pe/20), 0), 1)
        volatility = "high" if beta > 1.2 else "moderate" if beta > 0.8 else "low"
        return {
            "value_score": round(value_score, 2),
            "volatility": volatility,
            "fundamental_notes": f"PE: {pe}, Growth: {growth}, Beta: {beta}"
        }
    except:
        return {}

# ----------------- AGENT 4: Whale Tracker -----------------
import json

def agent_whales(token="ETH"):
    try:
        with open("mock_whale_wallets.json") as f:
            data = json.load(f)
        relevant = [tx for tx in data if tx['asset'].upper() == token.upper()]
        buy_count = sum(1 for tx in relevant if tx['action'] == 'buy')
        sell_count = sum(1 for tx in relevant if tx['action'] == 'sell')
        whale_bias = "buy" if buy_count > sell_count else "sell" if sell_count > buy_count else "neutral"
        return {
            "whale_bias": whale_bias,
            "confidence_level": round(buy_count / len(relevant), 2) if relevant else 0,
            "total_trx": len(relevant),
            "recent_assets": list(set(tx['asset'] for tx in relevant))
        }
    except:
        return {"whale_bias": "neutral", "confidence_level": 0.5, "total_trx": 0}

# ----------------- AGGREGATOR -----------------
def aggregate_decision(sent, tech, fund, whale):
    if tech.get("direction") == "up" and tech.get("conviction_score", 0) > 1.2 and sent.get("sentiment_score", 0) > 0.3 and whale.get("whale_bias") == "buy":
        return "📈 Go LONG"
    elif tech.get("direction") == "down" and sent.get("sentiment_score", 0) < -0.3 and fund.get("volatility") == "high" and whale.get("whale_bias") == "sell":
        return "📉 Go SHORT"
    else:
        return "⏸️ HOLD / Unclear"

# ----------------- STREAMLIT UI -----------------
async def run_trimind(ticker="ETH"):
    st.title("🐾 TriMind CopyCat AI Trading")
    st.subheader(f"Live Analysis for {ticker}")

    sent_task = agent_sentiment(ticker)
    tech_task = agent_jenius(ticker)
    fund_data = agent_fundamentals(ticker)
    whale_data = agent_whales(ticker)

    sent_result, tech_result = await asyncio.gather(sent_task, tech_task)
    decision = aggregate_decision(sent_result, tech_result, fund_data, whale_data)

    st.success(f"Decision: {decision}")
    st.markdown("### 🔎 Agent Outputs")
    st.json({"Sentiment (Jenius)": sent_result})
    st.json({"Technical (Jenius)": tech_result})
    st.json({"Fundamentals": fund_data})
    st.json({"Whale Activity": whale_data})

if __name__ == "__main__":
    ticker = st.sidebar.text_input("Enter Token/Ticker", value="ETH")
    asyncio.run(run_trimind(ticker)) 