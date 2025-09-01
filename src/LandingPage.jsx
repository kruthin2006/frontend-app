import React, { useState } from 'react';
import Dashboard from './Dashboard';
import './LandingPage.css';

const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', email: '', password: '', confirmPassword: '' 
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const openAuthModal = (tab) => {
    setActiveTab(tab);
    setShowAuthModal(true);
    setMessage({ text: '', type: '' });
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setLoginData({ email: '', password: '' });
    setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    setTimeout(() => {
      if (loginData.email && loginData.password) {
        const demoUser = {
          name: loginData.email.split('@')[0],
          email: loginData.email
        };
        
        setUser(demoUser);
        setIsAuthenticated(true);
        setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
      } else {
        setMessage({ text: 'Please enter email and password', type: 'error' });
      }
      setLoading(false);
    }, 1000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }
    
    setLoading(true);
    setMessage({ text: '', type: '' });

    setTimeout(() => {
      if (registerData.name && registerData.email && registerData.password) {
        setMessage({ text: 'Registration successful! You can now login.', type: 'success' });
        
        setTimeout(() => {
          setActiveTab('login');
          setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
        }, 1500);
      } else {
        setMessage({ text: 'Please fill all fields', type: 'error' });
      }
      setLoading(false);
    }, 1000);
  };

  if (isAuthenticated) {
    return <Dashboard user={user} />;
  }

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <i className="fas fa-brain"></i>
            <span>PersonalAI</span>
          </div>
          <div className="nav-actions">
            <button 
              className="nav-btn login-btn"
              onClick={() => openAuthModal('login')}
            >
              Sign In
            </button>
            <button 
              className="nav-btn register-btn"
              onClick={() => openAuthModal('register')}
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Your Intelligent Assistant Is Here</h1>
            <p>PersonalAI helps you work smarter, not harder. Get quick answers, spark new ideas, and enjoy personalized support tailored just for you.</p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => openAuthModal('register')}>
                Get Started Free
              </button>
              <button className="btn-secondary">
                <i className="fas fa-play-circle"></i> Watch Demo
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="ai-visualization">
              <div className="central-orb">
                <i className="fas fa-brain"></i>
              </div>
              <div className="floating-elements">
                <div className="floating-element el-1">
                  <i className="fas fa-comment"></i>
                </div>
                <div className="floating-element el-2">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <div className="floating-element el-3">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="floating-element el-4">
                  <i className="fas fa-code"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2>Why Professionals Choose PersonalAI</h2>
          <p className="section-subtitle">Experience the future of personal assistance with our powerful features</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>Lightning Fast</h3>
              <p>Get instant responses to your queries with our optimized AI engine</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-lock"></i>
              </div>
              <h3>Secure & Private</h3>
              <p>Your data is encrypted and never shared with third parties</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Smart Learning</h3>
              <p>Adapts to your preferences and style for personalized assistance</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
                <i className="fas fa-brain"></i>
                <span>PersonalAI</span>
              </div>
              <p>Transforming the way you work and think with artificial intelligence</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#">Features</a>
                <a href="#">Use Cases</a>
              </div>
              
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Blog</a>
              </div>
              
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">Contact</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2023 PersonalAI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={closeAuthModal}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeAuthModal}>
              <i className="fas fa-times"></i>
            </button>
            
            <div className="auth-container">
              <div className="auth-header">
                <h2>{activeTab === 'login' ? 'Welcome Back' : 'Create Your Account'}</h2>
                <p>
                  {activeTab === 'login' 
                    ? 'Sign in to continue your journey with PersonalAI' 
                    : 'Join thousands of users enhancing their productivity with PersonalAI'
                  }
                </p>
              </div>

              <div className="auth-tabs">
                <button 
                  className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                  onClick={() => setActiveTab('login')}
                >
                  Sign In
                </button>
                <button 
                  className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
                  onClick={() => setActiveTab('register')}
                >
                  Register
                </button>
              </div>

              <div className="auth-forms">
                {activeTab === 'login' ? (
                  <form className="auth-form" onSubmit={handleLogin}>
                    {message.text && (
                      <div className={`message ${message.type}`}>
                        {message.text}
                      </div>
                    )}
                    
                    <div className="input-group">
                      <div className="input-with-icon">
                        <i className="fas fa-envelope"></i>
                        <input
                          type="email"
                          name="email"
                          value={loginData.email}
                          onChange={handleLoginChange}
                          placeholder="Enter your email"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <div className="input-with-icon">
                        <i className="fas fa-lock"></i>
                        <input
                          type="password"
                          name="password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          placeholder="Enter your password"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="auth-submit-btn"
                      disabled={loading}
                    >
                      {loading ? <div className="spinner"></div> : 'Sign In'}
                    </button>

                    <div className="auth-divider">
                      <span>Or continue with</span>
                    </div>

                    <div className="social-auth">
                      <button type="button" className="social-btn google-btn">
                        <i className="fab fa-google"></i>
                        Google
                      </button>
                      <button type="button" className="social-btn github-btn">
                        <i className="fab fa-github"></i>
                        GitHub
                      </button>
                    </div>
                  </form>
                ) : (
                  <form className="auth-form" onSubmit={handleRegister}>
                    {message.text && (
                      <div className={`message ${message.type}`}>
                        {message.text}
                      </div>
                    )}
                    
                    <div className="input-group">
                      <div className="input-with-icon">
                        <i className="fas fa-user"></i>
                        <input
                          type="text"
                          name="name"
                          value={registerData.name}
                          onChange={handleRegisterChange}
                          placeholder="Full name"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <div className="input-with-icon">
                        <i className="fas fa-envelope"></i>
                        <input
                          type="email"
                          name="email"
                          value={registerData.email}
                          onChange={handleRegisterChange}
                          placeholder="Email address"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <div className="input-with-icon">
                        <i className="fas fa-lock"></i>
                        <input
                          type="password"
                          name="password"
                          value={registerData.password}
                          onChange={handleRegisterChange}
                          placeholder="Create password"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <div className="input-with-icon">
                        <i className="fas fa-lock"></i>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={registerData.confirmPassword}
                          onChange={handleRegisterChange}
                          placeholder="Confirm password"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="auth-submit-btn"
                      disabled={loading}
                    >
                      {loading ? <div className="spinner"></div> : 'Create Account'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;