import { useState } from 'react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">🐾</span>
            <span className="logo-text">TriMind</span>
          </div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#contact" className="nav-link">Contact</a>
            <button className="cta-button">Get Started</button>
          </div>
          <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              AI-Powered Copycat Trading
              <span className="highlight"> That Actually Works</span>
            </h1>
            <p className="hero-subtitle">
              TriMind combines sentiment analysis, technical indicators, fundamental data, and whale tracking to make intelligent trading decisions. Let AI do the heavy lifting while you focus on profits.
            </p>
            <div className="hero-buttons">
              <button className="primary-button">Start Trading Now</button>
              <button className="secondary-button">Watch Demo</button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">95%</span>
                <span className="stat-label">Accuracy Rate</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Monitoring</span>
              </div>
              <div className="stat">
                <span className="stat-number">$2M+</span>
                <span className="stat-label">Traded Volume</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="trading-dashboard">
              <div className="dashboard-header">
                <span className="dashboard-title">Live Analysis</span>
                <span className="dashboard-status">● Active</span>
              </div>
              <div className="dashboard-content">
                <div className="metric">
                  <span className="metric-label">Sentiment Score</span>
                  <span className="metric-value positive">+0.85</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Technical Direction</span>
                  <span className="metric-value positive">📈 UP</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Whale Activity</span>
                  <span className="metric-value positive">BUY</span>
                </div>
                <div className="decision">
                  <span className="decision-label">AI Decision</span>
                  <span className="decision-value">📈 GO LONG</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Why Choose TriMind?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Multi-Agent AI</h3>
              <p>Four specialized AI agents work together: sentiment analysis, technical indicators, fundamental data, and whale tracking.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Real-Time Analysis</h3>
              <p>Get instant trading signals with live market data, news sentiment, and whale wallet monitoring.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Advanced Metrics</h3>
              <p>Conviction scores, volatility analysis, and risk assessment to make informed decisions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Reliable</h3>
              <p>Built with enterprise-grade security and 99.9% uptime guarantee for peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2 className="section-title">How TriMind Works</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Data Collection</h3>
              <p>Our AI agents gather real-time data from multiple sources: market prices, news sentiment, technical indicators, and whale wallet movements.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>AI Analysis</h3>
              <p>Each agent specializes in different aspects of market analysis, providing comprehensive insights for informed decisions.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Signal Generation</h3>
              <p>Our aggregation algorithm combines all agent outputs to generate clear trading signals: GO LONG, GO SHORT, or HOLD.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Execute Trades</h3>
              <p>Automatically execute trades or receive notifications to manually place orders based on AI recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Trading Smarter?</h2>
            <p>Join thousands of traders who trust TriMind for their investment decisions.</p>
            <button className="primary-button large">Get Started Free</button>
            <p className="cta-note">No credit card required • 14-day free trial</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">🐾</span>
                <span className="logo-text">TriMind</span>
              </div>
              <p>AI-powered copycat trading that delivers results.</p>
            </div>
            <div className="footer-section">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <a href="#contact">Contact</a>
              <a href="#help">Help Center</a>
              <a href="#docs">Documentation</a>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#disclaimer">Risk Disclaimer</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 TriMind. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
