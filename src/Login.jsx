import Header from "./Header";
import { useNavigate, A } from '@solidjs/router';
import "./css/Login.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/'); 
  };

  return (
  <>
    <Header></Header>

    <div class="login-wrapper">
      <h1 class="app-title">To-Do Online</h1>

      <div class="auth-container">
        <div class="tabs">
          <div class="tab active">Login</div>
          <A href="/signup" class="tab inactive">Sign Up</A>
        </div>

        <form class="login-form" onSubmit={handleLogin}>
          <div class="input-group">
            <label for="email">Email</label>

            <input 
              type="email" 
              id="email" 
              placeholder="nama@email.com" 
              required 
            />
          </div>

          <div class="input-group">
            <label for="password">Password</label>

            <input 
              type="password" 
              id="password" 
              placeholder="********" 
              required 
            />
          </div>

          <button type="submit" class="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  </>
);
}

export default Login;