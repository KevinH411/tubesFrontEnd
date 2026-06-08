import Header from "./Header";
import { useNavigate, A } from '@solidjs/router';
import "./css/Login.css";
import { login } from "./Database";
import { createSignal } from "solid-js";

function Login() {
  const navigate = useNavigate();

  //mengambil nilai input di SolidJS
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //mencari user berdasarkan email
      const res = await login(email(), password());

      localStorage.setItem("currentUser", JSON.stringify(res))
      navigate("/")
    } catch (err) {
      alert(err.message);
    }
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
                onInput={(e) => setEmail(e.target.value)}
                value={email()}
                placeholder="nama@email.com"
                required
              />
            </div>

            <div class="input-group">
              <label for="password">Password</label>

              <input
                type="password"
                onInput={(e) => setPassword(e.target.value)}
                value={password()}
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