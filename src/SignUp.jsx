import Header from "./Header";
import { A, useNavigate } from '@solidjs/router';
import './css/Login.css'; // Kita gunakan CSS yang sama dengan login agar cepat

function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/login'); // Setelah daftar, diarahkan ke login
  };

  return (
    <>
        <Header></Header>

        <div class="login-wrapper">
            <h1 class="app-title">To-Do Online</h1>

            <div class="auth-container">
                <div class="tabs">
                    <A href="/login" class="tab inactive">Login</A>
                    <div class="tab active">Sign Up</div>
                </div>

                <form class="login-form" onSubmit={handleSignUp}>
                    <div class="input-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" placeholder="Username kamu" required />
                    </div>
                    <div class="input-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="nama@email.com" required />
                    </div>
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="********" required />
                    </div>

                    <button type="submit" class="login-btn">Daftar</button>
                </form>
            </div>
        </div>
    </>
  );
}

export default SignUp;