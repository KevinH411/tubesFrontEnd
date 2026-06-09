import Header from "./Header";
import { A, useNavigate } from '@solidjs/router';
import './css/Login.css';
import { signup } from "./Database";
import { createSignal } from "solid-js";

function SignUp() {
    const navigate = useNavigate();
  //mengambil nilai input di SolidJS
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

     const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signup(username(), email(), password());
            navigate('/login');
        } catch (err) {
            alert(err.message);
        }
     }

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
                            <input
                                type="username"
                                onInput={(e) => setUsername(e.target.value)}
                                value={username()}
                                placeholder="your username"
                                required
                            />
                    </div>
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

                    <button type="submit" class="login-btn">Daftar</button>
                </form>
            </div>
        </div>
    </>
  );
}

export default SignUp;
