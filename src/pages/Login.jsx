
import { useEffect, useState } from "react";
import "../styles/Login.css";

function Login({ onBackHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    alert("Login successful!");

    if (onBackHome) {
      onBackHome();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="login-page">

      {/* =========================================
          LIQUID ANIMATED BACKGROUND
      ========================================= */}

      <div className="liquid-bg">

        <div className="liquid-left"></div>

        <div className="liquid-right"></div>

        <div className="liquid-liquid-light"></div>

      </div>

      {/* =========================================
          BRAND
      ========================================= */}

      <div className="login-brand">
        AÊTRE
      </div>

      {/* =========================================
          SIDE LABELS
      ========================================= */}

      <div className="side-label side-label-left">
        AÊTRE / PRIVATE COLLECTION
      </div>

      <div className="side-label side-label-right">
        01 — ACCESS
      </div>

      {/* =========================================
          LOGIN CARD
      ========================================= */}

      <div className="login-card">

        {/* BACK BUTTON */}

        <button
          type="button"
          className="login-back-button"
          onClick={onBackHome}
        >
          <span>←</span>
          BACK TO AÊTRE
        </button>

        {/* =========================================
            HEADING
        ========================================= */}

        <div className="login-heading">

          <span className="login-eyebrow">
            PRIVATE ACCESS
          </span>

          <div className="login-logo">
            AÊTRE
          </div>

          <div className="login-line"></div>

          <h1>
            Welcome{" "}
            <span>back.</span>
          </h1>

          <p>
            Enter your details to continue your journey.
          </p>

        </div>

        {/* =========================================
            FORM
        ========================================= */}

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <div className="input-group">

            <label htmlFor="email">
              EMAIL ADDRESS
            </label>

            <div className="input-wrapper">

              <span className="input-number">
                01
              </span>

              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                autoComplete="email"
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div className="input-group">

            <label htmlFor="password">
              PASSWORD
            </label>

            <div className="input-wrapper">

              <span className="input-number">
                02
              </span>

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="current-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>

            </div>

          </div>

          {/* =========================================
              OPTIONS
          ========================================= */}

          <div className="login-options">

            <label className="remember">

              <input
                type="checkbox"
              />

              <span className="custom-checkbox"></span>

              Remember me

            </label>

            <button
              type="button"
              className="forgot-password"
              onClick={() =>
                alert(
                  "Password recovery coming soon."
                )
              }
            >
              FORGOT PASSWORD?
            </button>

          </div>

          {/* =========================================
              LOGIN BUTTON
          ========================================= */}

          <button
            type="submit"
            className="login-button"
          >

            <span>
              ENTER AÊTRE
            </span>

            <span className="button-arrow">
              →
            </span>

          </button>

        </form>

        {/* =========================================
            DIVIDER
        ========================================= */}

        <div className="divider">
          <span>OR</span>
        </div>

        {/* =========================================
            REGISTER
        ========================================= */}

        <div className="register-text">

          <span>
            New to AÊTRE?
          </span>

          <button
            type="button"
            onClick={() =>
              alert(
                "Create account coming soon."
              )
            }
          >
            CREATE ACCOUNT
          </button>

        </div>

        {/* =========================================
            FOOTER
        ========================================= */}

        <div className="login-footer">

          <span>
            EST. 2026
          </span>

          <span>
            EXTRAIT DE PARFUM
          </span>

          <span>
            PARIS — CAIRO
          </span>

        </div>

      </div>

    </div>
  );
}

export default Login;
