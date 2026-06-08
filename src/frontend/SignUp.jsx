import Header from "./Header";
import { A, useNavigate } from '@solidjs/router';
// import { findUserByEmail, findUserByName, addUser } from "./Database";
//untuk cek jika username atau email sudah ada di database
import './css/Login.css'; // Kita gunakan CSS yang sama dengan login agar cepat

function SignUp() {
//   const navigate = useNavigate();

//   const handleSignUp = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const inputUsername = formData.get("username").trim();
//     const inputEmail = formData.get("email").trim();
//     const inputPassword = formData.get("password");
    
//     if (inputUsername === "" || inputEmail === "" || inputPassword === "") {
//         alert("Belum ada data yang dimasukkan.");
//         return;
//     }

//     let checkName = findUserByName(inputUsername);
//     if (checkName !== null) {
//         alert("Username sudah digunakan! Gunakan username lain.");
//         return;
//     }

//     let checkEmail = findUserByEmail(inputEmail);
//     if (checkEmail !== null) {
//         alert("Email sudah terdaftar! Gunakan email lain.");
//         return;
//     }

//     let success = addUser(inputUsername, inputEmail, inputPassword);
//     if(success) {
//         alert("Akun berhasil dibuat!");
//         navigate('/login'); // Setelah daftar, diarahkan ke login
//     }
//   };

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
                        <input type="text" id="username" name="username" placeholder="Username kamu" required />
                    </div>
                    <div class="input-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="nama@email.com" required />
                    </div>
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="********" required />
                    </div>

                    <button type="submit" class="login-btn">Daftar</button>
                </form>
            </div>
        </div>
    </>
  );
}

export default SignUp;
