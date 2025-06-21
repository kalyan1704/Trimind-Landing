import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [currentView, setCurrentView] = useState('home')
  const [tradingData, setTradingData] = useState({
    sentiment: 0.85,
    technical: 'UP',
    whale: 'BUY',
    decision: 'GO LONG',
    price: 2450.50,
    change: 2.34,
    volume: '2.1M'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [signals, setSignals] = useState([])
  const [portfolio, setPortfolio] = useState({
    totalValue: 12450.00,
    todayPL: 234.50,
    totalPL: 1234.50,
    totalDeposits: 10000.00,
    totalWithdrawals: 500.00,
    availableBalance: 3450.00,
    positions: [
      { asset: 'ETH', quantity: 2.5, avgPrice: 2400, currentPrice: 2450.50, pl: 126.25, allocation: 50.2 },
      { asset: 'BTC', quantity: 0.1, avgPrice: 42000, currentPrice: 43200, pl: 120.00, allocation: 34.7 },
      { asset: 'SOL', quantity: 15.0, avgPrice: 85, currentPrice: 92.50, pl: 112.50, allocation: 11.1 },
      { asset: 'ADA', quantity: 1000, avgPrice: 0.45, currentPrice: 0.48, pl: 30.00, allocation: 4.0 }
    ],
    earnings: {
      daily: 234.50,
      weekly: 1250.75,
      monthly: 3450.25,
      yearly: 12500.00
    },
    transactionHistory: [
      { type: 'deposit', amount: 5000, date: '2024-06-15', status: 'completed' },
      { type: 'withdrawal', amount: 500, date: '2024-06-10', status: 'completed' },
      { type: 'deposit', amount: 3000, date: '2024-06-01', status: 'completed' },
      { type: 'deposit', amount: 2000, date: '2024-05-20', status: 'completed' },
      { type: 'trade', amount: 1500, date: '2024-06-18', status: 'completed', asset: 'ETH' },
      { type: 'trade', amount: 800, date: '2024-06-17', status: 'completed', asset: 'BTC' }
    ]
  })
  const [priceHistory, setPriceHistory] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')

  // Generate initial price history
  useEffect(() => {
    const generatePriceHistory = () => {
      const history = []
      let currentPrice = 2400
      for (let i = 0; i < 50; i++) {
        currentPrice += (Math.random() - 0.5) * 20
        history.push({
          time: new Date(Date.now() - (50 - i) * 60000).toLocaleTimeString(),
          price: currentPrice
        })
      }
      setPriceHistory(history)
    }
    generatePriceHistory()
  }, [])

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTradingData(prev => ({
        ...prev,
        price: prev.price + (Math.random() - 0.5) * 10,
        sentiment: Math.max(0, Math.min(1, prev.sentiment + (Math.random() - 0.5) * 0.1))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const showNotificationMessage = (message) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('Login form submitted')
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')
    
    console.log('Email:', email, 'Password:', password)
    
    // Simulate authentication
    if (email && password) {
      console.log('Login successful, redirecting to dashboard')
      setIsLoggedIn(true)
      setUser({ email, name: email.split('@')[0] })
      setCurrentView('dashboard')
      showNotificationMessage('Successfully logged in!')
    } else {
      console.log('Login failed - missing email or password')
      showNotificationMessage('Please enter both email and password')
    }
  }

  const handleSignup = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    
    if (name && email && password) {
      setIsLoggedIn(true)
      setUser({ email, name })
      setCurrentView('dashboard')
      showNotificationMessage('Account created successfully! Welcome to TriMind!')
    }
  }

  const generateSignal = () => {
    setIsLoading(true)
    setTimeout(() => {
      const newSignal = {
        id: Date.now(),
        asset: Math.random() > 0.5 ? 'ETH' : 'BTC',
        action: Math.random() > 0.5 ? 'GO LONG' : 'GO SHORT',
        confidence: Math.floor(Math.random() * 30) + 70,
        timestamp: new Date().toLocaleTimeString(),
        price: (Math.random() * 1000 + 2000).toFixed(2),
        reasoning: [
          'Strong bullish momentum detected',
          'Whale accumulation pattern',
          'Technical breakout confirmed',
          'Sentiment analysis positive'
        ].slice(0, Math.floor(Math.random() * 3) + 2)
      }
      setSignals(prev => [newSignal, ...prev.slice(0, 9)])
      setIsLoading(false)
      showNotificationMessage(`New ${newSignal.action} signal generated for ${newSignal.asset}!`)
    }, 2000)
  }

  const executeTrade = (signal) => {
    const tradeAmount = Math.random() * 1000 + 500
    const newPosition = {
      asset: signal.asset,
      quantity: (tradeAmount / parseFloat(signal.price)).toFixed(4),
      avgPrice: parseFloat(signal.price),
      currentPrice: parseFloat(signal.price),
      pl: 0,
      allocation: Math.random() * 20 + 5 // Random allocation between 5-25%
    }
    
    const newTransaction = {
      type: 'trade',
      amount: tradeAmount,
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      asset: signal.asset
    }
    
    setPortfolio(prev => ({
      ...prev,
      positions: [...prev.positions, newPosition],
      totalValue: prev.totalValue + tradeAmount,
      availableBalance: prev.availableBalance - tradeAmount,
      transactionHistory: [newTransaction, ...prev.transactionHistory]
    }))
    
    showNotificationMessage(`Trade executed: ${signal.action} ${signal.asset} at $${signal.price}`)
  }

  const depositFunds = () => {
    const amount = Math.random() * 5000 + 1000
    const newTransaction = {
      type: 'deposit',
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    }
    
    setPortfolio(prev => ({
      ...prev,
      totalValue: prev.totalValue + amount,
      availableBalance: prev.availableBalance + amount,
      totalDeposits: prev.totalDeposits + amount,
      transactionHistory: [newTransaction, ...prev.transactionHistory]
    }))
    
    showNotificationMessage(`Deposited $${amount.toFixed(2)} to your account`)
  }

  const withdrawFunds = () => {
    const amount = Math.random() * 1000 + 500
    if (portfolio.availableBalance >= amount) {
      const newTransaction = {
        type: 'withdrawal',
        amount: amount,
        date: new Date().toISOString().split('T')[0],
        status: 'completed'
      }
      
      setPortfolio(prev => ({
        ...prev,
        totalValue: prev.totalValue - amount,
        availableBalance: prev.availableBalance - amount,
        totalWithdrawals: prev.totalWithdrawals + amount,
        transactionHistory: [newTransaction, ...prev.transactionHistory]
      }))
      
      showNotificationMessage(`Withdrawn $${amount.toFixed(2)} from your account`)
    } else {
      showNotificationMessage('Insufficient funds for withdrawal')
    }
  }

  // Safe price chart calculations
  const getMinPrice = () => {
    if (priceHistory.length === 0) return 2300
    return Math.min(...priceHistory.map(p => p.price))
  }

  const getMaxPrice = () => {
    if (priceHistory.length === 0) return 2700
    return Math.max(...priceHistory.map(p => p.price))
  }

  // Static Brain Logo Component
  const BrainLogo = () => (
    <div className="brain-logo">
      <div className="brain-core">
        <div className="brain-icon">🧠</div>
      </div>
      <div className="orbit orbit-1">
        <div className="orbit-symbol tokens">🪙</div>
      </div>
      <div className="orbit orbit-2">
        <div className="orbit-symbol charts">📊</div>
      </div>
      <div className="orbit orbit-3">
        <div className="orbit-symbol dollar">💵</div>
      </div>
    </div>
  )

  const renderHome = () => (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <BrainLogo />
            <span className="logo-text">TriMind</span>
          </div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <button className="cta-button" onClick={() => setCurrentView('login')}>Login</button>
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
              <button className="primary-button" onClick={() => setCurrentView('signup')}>Start Trading Now</button>
              <button className="secondary-button" onClick={() => setCurrentView('demo')}>Watch Demo</button>
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
                  <span className="metric-value positive">+{(tradingData.sentiment * 100).toFixed(1)}%</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Technical Direction</span>
                  <span className="metric-value positive">📈 {tradingData.technical}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Whale Activity</span>
                  <span className="metric-value positive">{tradingData.whale}</span>
                </div>
                <div className="decision">
                  <span className="decision-label">AI Decision</span>
                  <span className="decision-value">📈 {tradingData.decision}</span>
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
            <button className="primary-button large" onClick={() => setCurrentView('signup')}>Get Started Free</button>
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
                <BrainLogo />
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
    </>
  )

  const renderLogin = () => (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <BrainLogo />
          <h2>Welcome Back to TriMind</h2>
          <p>Sign in to access your trading dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" required placeholder="Enter your password" />
          </div>
          <button type="submit" className="auth-button">Sign In</button>
        </form>
        <div className="auth-footer">
          <p>Don't have an account? <button onClick={() => setCurrentView('signup')} className="link-button">Sign up</button></p>
          <button onClick={() => setCurrentView('home')} className="link-button">Back to Home</button>
          <button 
            onClick={() => {
              setIsLoggedIn(true)
              setUser({ email: 'test@example.com', name: 'Test User' })
              setCurrentView('dashboard')
              showNotificationMessage('Test login successful!')
            }} 
            className="auth-button"
            style={{ marginTop: '1rem', background: '#48bb78' }}
          >
            Test Login (Skip Form)
          </button>
        </div>
      </div>
    </div>
  )

  const renderSignup = () => (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <BrainLogo />
          <h2>Join TriMind</h2>
          <p>Create your account and start trading with AI</p>
        </div>
        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" required placeholder="Enter your full name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" required placeholder="Create a password" />
          </div>
          <button type="submit" className="auth-button">Create Account</button>
        </form>
        <div className="auth-footer">
          <p>Already have an account? <button onClick={() => setCurrentView('login')} className="link-button">Sign in</button></p>
          <button onClick={() => setCurrentView('home')} className="link-button">Back to Home</button>
        </div>
      </div>
    </div>
  )

  const renderDashboard = () => (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <BrainLogo />
            <span className="logo-text">TriMind</span>
          </div>
          <div className="nav-menu">
            <span className="user-info">Welcome, {user?.name}</span>
            <button className="cta-button" onClick={() => {setIsLoggedIn(false); setCurrentView('home')}}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          {/* Live Trading Dashboard */}
          <div className="dashboard-card main-card">
            <h3>Live Trading Dashboard</h3>
            <div className="live-metrics">
              <div className="metric-row">
                <div className="metric">
                  <span className="metric-label">Current Price</span>
                  <span className="metric-value">${tradingData.price.toFixed(2)}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">24h Change</span>
                  <span className="metric-value positive">+{tradingData.change}%</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Volume</span>
                  <span className="metric-value">{tradingData.volume}</span>
                </div>
              </div>
              <div className="ai-decision">
                <h4>AI Decision</h4>
                <div className="decision-display">
                  <span className="decision-badge">{tradingData.decision}</span>
                  <span className="confidence">Confidence: 87%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price Chart */}
          <div className="dashboard-card">
            <h3>Price Chart</h3>
            <div className="price-chart">
              <div className="chart-container">
                {priceHistory.length > 0 && priceHistory.map((point, index) => (
                  <div
                    key={index}
                    className="chart-point"
                    style={{
                      left: `${(index / (priceHistory.length - 1)) * 100}%`,
                      bottom: `${((point.price - getMinPrice()) / (getMaxPrice() - getMinPrice())) * 100}%`
                    }}
                  />
                ))}
              </div>
              <div className="chart-labels">
                <span>${getMinPrice().toFixed(0)}</span>
                <span>${getMaxPrice().toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Trading Signals */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Trading Signals</h3>
              <button onClick={generateSignal} disabled={isLoading} className="generate-btn">
                {isLoading ? 'Generating...' : 'Generate Signal'}
              </button>
            </div>
            <div className="signals-list">
              {signals.map(signal => (
                <div key={signal.id} className="signal-item">
                  <div className="signal-info">
                    <span className="signal-asset">{signal.asset}</span>
                    <span className={`signal-action ${signal.action.includes('LONG') ? 'positive' : 'negative'}`}>
                      {signal.action}
                    </span>
                  </div>
                  <div className="signal-details">
                    <span className="signal-price">${signal.price}</span>
                    <span className="signal-confidence">{signal.confidence}%</span>
                    <button onClick={() => executeTrade(signal)} className="execute-btn">Execute</button>
                  </div>
                  <div className="signal-reasoning">
                    {signal.reasoning.map((reason, index) => (
                      <span key={index} className="reason-tag">{reason}</span>
                    ))}
                  </div>
                  <span className="signal-time">{signal.timestamp}</span>
                </div>
              ))}
              {signals.length === 0 && (
                <p className="no-signals">No signals generated yet. Click "Generate Signal" to start.</p>
              )}
            </div>
          </div>

          {/* AI Agents Status */}
          <div className="dashboard-card">
            <h3>AI Agents Status</h3>
            <div className="agents-grid">
              <div className="agent">
                <div className="agent-icon">🧠</div>
                <div className="agent-info">
                  <h4>Sentiment Agent</h4>
                  <span className="agent-status active">Active</span>
                  <span className="agent-score">{(tradingData.sentiment * 100).toFixed(1)}%</span>
                </div>
              </div>
              <div className="agent">
                <div className="agent-icon">📊</div>
                <div className="agent-info">
                  <h4>Technical Agent</h4>
                  <span className="agent-status active">Active</span>
                  <span className="agent-score">{tradingData.technical}</span>
                </div>
              </div>
              <div className="agent">
                <div className="agent-icon">🐋</div>
                <div className="agent-info">
                  <h4>Whale Agent</h4>
                  <span className="agent-status active">Active</span>
                  <span className="agent-score">{tradingData.whale}</span>
                </div>
              </div>
              <div className="agent">
                <div className="agent-icon">📈</div>
                <div className="agent-info">
                  <h4>Fundamental Agent</h4>
                  <span className="agent-status active">Active</span>
                  <span className="agent-score">Strong</span>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Summary */}
          <div className="dashboard-card">
            <h3>Portfolio Summary</h3>
            <div className="portfolio-stats">
              <div className="portfolio-metric">
                <span className="metric-label">Total Value</span>
                <span className="metric-value">${portfolio.totalValue.toFixed(2)}</span>
              </div>
              <div className="portfolio-metric">
                <span className="metric-label">Today's P&L</span>
                <span className="metric-value positive">+${portfolio.todayPL.toFixed(2)}</span>
              </div>
              <div className="portfolio-metric">
                <span className="metric-label">Total P&L</span>
                <span className="metric-value positive">+${portfolio.totalPL.toFixed(2)}</span>
              </div>
              <div className="portfolio-metric">
                <span className="metric-label">Available Balance</span>
                <span className="metric-value">${portfolio.availableBalance.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Earnings Overview */}
            <div className="earnings-section">
              <h4>Earnings Overview</h4>
              <div className="earnings-grid">
                <div className="earning-item">
                  <span className="earning-label">Daily</span>
                  <span className="earning-value positive">+${portfolio.earnings.daily.toFixed(2)}</span>
                </div>
                <div className="earning-item">
                  <span className="earning-label">Weekly</span>
                  <span className="earning-value positive">+${portfolio.earnings.weekly.toFixed(2)}</span>
                </div>
                <div className="earning-item">
                  <span className="earning-label">Monthly</span>
                  <span className="earning-value positive">+${portfolio.earnings.monthly.toFixed(2)}</span>
                </div>
                <div className="earning-item">
                  <span className="earning-label">Yearly</span>
                  <span className="earning-value positive">+${portfolio.earnings.yearly.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Account Summary */}
            <div className="account-summary">
              <h4>Account Summary</h4>
              <div className="account-metrics">
                <div className="account-metric">
                  <span className="metric-label">Total Deposits</span>
                  <span className="metric-value">${portfolio.totalDeposits.toFixed(2)}</span>
                </div>
                <div className="account-metric">
                  <span className="metric-label">Total Withdrawals</span>
                  <span className="metric-value">${portfolio.totalWithdrawals.toFixed(2)}</span>
                </div>
                <div className="account-metric">
                  <span className="metric-label">Net Investment</span>
                  <span className="metric-value">${(portfolio.totalDeposits - portfolio.totalWithdrawals).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="portfolio-actions">
              <button className="action-btn" onClick={depositFunds}>Deposit</button>
              <button className="action-btn" onClick={withdrawFunds}>Withdraw</button>
              <button className="action-btn">History</button>
            </div>
          </div>

          {/* Token Holdings */}
          <div className="dashboard-card">
            <h3>Token Holdings</h3>
            <div className="holdings-overview">
              <div className="holdings-summary">
                <span className="summary-label">Total Holdings</span>
                <span className="summary-value">{portfolio.positions.length} Assets</span>
              </div>
            </div>
            <div className="holdings-list">
              {portfolio.positions.map((position, index) => (
                <div key={index} className="holding-item">
                  <div className="holding-info">
                    <div className="holding-header">
                      <span className="holding-asset">{position.asset}</span>
                      <span className="holding-allocation">{position.allocation}%</span>
                    </div>
                    <div className="holding-details">
                      <span className="holding-quantity">{position.quantity} {position.asset}</span>
                      <span className="holding-value">${(position.quantity * position.currentPrice).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="holding-metrics">
                    <div className="price-info">
                      <span className="avg-price">Avg: ${position.avgPrice.toFixed(2)}</span>
                      <span className="current-price">${position.currentPrice.toFixed(2)}</span>
                    </div>
                    <div className="pl-info">
                      <span className={`holding-pl ${position.pl >= 0 ? 'positive' : 'negative'}`}>
                        {position.pl >= 0 ? '+' : ''}${position.pl.toFixed(2)}
                      </span>
                      <span className="pl-percentage">
                        {position.pl >= 0 ? '+' : ''}{((position.pl / (position.quantity * position.avgPrice)) * 100).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction History */}
          <div className="dashboard-card">
            <h3>Transaction History</h3>
            <div className="transaction-list">
              {portfolio.transactionHistory.map((transaction, index) => (
                <div key={index} className="transaction-item">
                  <div className="transaction-icon">
                    {transaction.type === 'deposit' && <span className="icon">📥</span>}
                    {transaction.type === 'withdrawal' && <span className="icon">📤</span>}
                    {transaction.type === 'trade' && <span className="icon">💱</span>}
                  </div>
                  <div className="transaction-info">
                    <div className="transaction-header">
                      <span className="transaction-type">
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        {transaction.asset && ` - ${transaction.asset}`}
                      </span>
                      <span className="transaction-date">{transaction.date}</span>
                    </div>
                    <div className="transaction-details">
                      <span className={`transaction-amount ${transaction.type === 'withdrawal' ? 'negative' : 'positive'}`}>
                        {transaction.type === 'withdrawal' ? '-' : '+'}${transaction.amount.toFixed(2)}
                      </span>
                      <span className={`transaction-status ${transaction.status}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="transaction-actions">
              <button className="action-btn">View All</button>
              <button className="action-btn">Export</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDemo = () => (
    <div className="demo-container">
      <div className="demo-header">
        <button onClick={() => setCurrentView('home')} className="back-btn">← Back to Home</button>
        <h2>TriMind Demo</h2>
      </div>
      <div className="demo-content">
        <div className="demo-video">
          <video 
            controls 
            width="100%" 
            height="auto"
            poster="/trimind_demo_poster.jpg"
            style={{ borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
          >
            <source src="/trimind_demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-info">
            <h3>TriMind Platform Demo</h3>
            <p>Watch how our AI-powered platform analyzes markets, generates signals, and helps you make profitable trading decisions.</p>
            <div className="video-stats">
              <span>Duration: 21 seconds</span>
              <span>Quality: HD</span>
              <span>Format: MP4</span>
            </div>
          </div>
        </div>
        <div className="demo-features">
          <h3>What You'll See in This Demo</h3>
          <ul>
            <li>🎯 <strong>AI Mind Logo Animation</strong> - Our custom logo with revolving trading elements</li>
            <li>📊 <strong>Live Dashboard Walkthrough</strong> - Real-time market data and AI insights</li>
            <li>🤖 <strong>Four AI Agents</strong> - Sentiment, Technical, Fundamental, and Whale tracking</li>
            <li>⚡ <strong>Signal Generation</strong> - How AI creates trading recommendations</li>
            <li>📈 <strong>Portfolio Management</strong> - Track performance and manage positions</li>
            <li>🔔 <strong>Smart Notifications</strong> - Never miss trading opportunities</li>
          </ul>
          <div className="demo-cta-section">
            <h4>Ready to Experience TriMind?</h4>
            <p>Join thousands of traders who trust our AI for profitable decisions.</p>
            <div className="demo-buttons">
              <button onClick={() => setCurrentView('signup')} className="demo-cta primary">Start Free Trial</button>
              <button onClick={() => setCurrentView('home')} className="demo-cta secondary">Learn More</button>
            </div>
            <p className="demo-note">No credit card required • 14-day free trial • Cancel anytime</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="app">
      {currentView === 'home' && renderHome()}
      {currentView === 'login' && renderLogin()}
      {currentView === 'signup' && renderSignup()}
      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'demo' && renderDemo()}
      
      {/* Notification */}
      {showNotification && (
        <div className="notification">
          {notificationMessage}
        </div>
      )}
    </div>
  )
}

export default App
