import React, { useState } from "react";
import "./login.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useDarkMode } from "../../../components/Context/DarkMode";

function LogIn() {
  const [action, setAction] = useState("");
  const { darkMode } = useDarkMode();
  const registerLink = () => {
    setAction(" active");
  };

  const loginLink = () => {
    setAction("");
  };

  return (
    <div className={`login-body ${darkMode ? "dark" : ""}`}>
      <div className={`wrapper-login ${action}`}>
        <div className="form-box login">
          <form action="">
            <h1>Login</h1>
            <div className="input-box">
              <input type="text" placeholder="Username" required />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required />
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit">Login</button>
            <div className="register-link">
              <p>
                Dont have an account?
                <a href="#" onClick={registerLink}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
        <div className="form-box register">
          <form action="">
            <h1>Registration</h1>
            <div className="input-box">
              <input type="text" placeholder="Username" required />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="email" placeholder="Email" required />
              <MdEmail className="icon" />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required />
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />I agree to the terms & conditions
              </label>
            </div>
            <button type="submit">Register</button>
            <div className="register-link">
              <p>
                Already have an account?
                <a href="#" onClick={loginLink}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;

// import React, { useState } from "react";
// import "./login.css";
// import { FaUser, FaLock } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { useDarkMode } from "../../../components/Context/DarkMode";

// function LogIn() {
//   const [action, setAction] = useState("");
//   const { darkMode } = useDarkMode();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const registerLink = () => setAction(" active");
//   const loginLink = () => setAction("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (username && password && (action === " active" ? email : true)) {
//       setShowModal(true); // Muestra el modal si los campos están completos
//     }
//   };

//   const closeModal = () => setShowModal(false);

//   return (
//     <div className={`login-body ${darkMode ? "dark" : ""}`}>
//       <div className={`wrapper-login ${action}`}>
//         <div className="form-box login">
//           <form onSubmit={handleSubmit}>
//             <h1>Login</h1>
//             <div className="input-box">
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//               <FaUser className="icon" />
//             </div>
//             <div className="input-box">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <FaLock className="icon" />
//             </div>
//             <div className="remember-forgot">
//               <label>
//                 <input type="checkbox" />
//                 Remember me
//               </label>
//               <a href="#">Forgot password?</a>
//             </div>
//             <button type="submit">Login</button>
//             <div className="register-link">
//               <p>
//                 Don't have an account?
//                 <button type="button" onClick={registerLink}>Register</button>
//               </p>
//             </div>
//           </form>
//         </div>
//         <div className="form-box register">
//           <form onSubmit={handleSubmit}>
//             <h1>Registration</h1>
//             <div className="input-box">
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//               <FaUser className="icon" />
//             </div>
//             <div className="input-box">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <MdEmail className="icon" />
//             </div>
//             <div className="input-box">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <FaLock className="icon" />
//             </div>
//             <div className="remember-forgot">
//               <label>
//                 <input type="checkbox" />
//                 I agree to the terms & conditions
//               </label>
//             </div>
//             <button type="submit">Register</button>
//             <div className="register-link">
//               <p>
//                 Already have an account?
//                 <button type="button" onClick={loginLink}>Login</button>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Disclaimer</h2>
//             <p>This is a demo form for portfolio purposes only.</p>
//             <button onClick={closeModal}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LogIn;
