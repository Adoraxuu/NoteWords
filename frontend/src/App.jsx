import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register, logout, getCurrentUser } from './services/api';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });

  useEffect(() => {
    getCurrentUser()
      .then(() => setCurrentUser(true))
      .catch(() => setCurrentUser(false));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await register(formData);
      }
      await login(formData);
      setCurrentUser(true);
    } catch (error) {
      alert("操作失敗：" + (error.response?.data?.detail || "未知錯誤"));
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      setCurrentUser(false);
      navigate("/login");
    } catch (error) {
      alert("登出失敗：" + (error.response?.data?.detail || "未知錯誤"));
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">認證應用</div>
        <div>
          {currentUser ? (
            <button onClick={handleLogout} className="btn btn-light">登出</button>
          ) : (
            <button onClick={() => setIsRegistering(!isRegistering)} className="btn btn-light">
              {isRegistering ? "切換到登錄" : "切換到註冊"}
            </button>
          )}
        </div>
      </nav>
      
      <div className="container mt-4">
        {currentUser ? (
          <div className="text-center">
            <h2>您已登錄！</h2>
          </div>
        ) : (
          <div>
            <h2 className="text-center">{isRegistering ? "註冊" : "登錄"}</h2>
            <form onSubmit={handleSubmit}>
              {isRegistering && (
                <div className="form-group">
                  <label className="form-label">電子郵件地址</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="輸入電子郵件"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <small className="form-text text-muted">
                    我們絕不會與其他人分享您的電子郵件。
                  </small>
                </div>
              )}
              <div className="form-group">
                <label className="form-label">用戶名</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="輸入用戶名"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">密碼</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="密碼"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                {isRegistering ? "註冊" : "登錄"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;