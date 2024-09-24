import React, { useState } from "react";
import "./login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useDarkMode } from "../../../components/Context/DarkMode";
import close from "../../../assets/exit.png";

function LogIn() {
  const [action, setAction] = useState("");
  const { darkMode } = useDarkMode();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  function registerLink() {
    setAction(" active");
  }

  function loginLink() {
    setAction("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (username && password && (action ? email : true)) {
      setShowModal(true);
    }
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className={`login-body ${darkMode ? "dark" : ""}`}>
      <div className={`wrapper-login ${action}`}>
        <div className="form-box login">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
          <form onSubmit={handleSubmit}>
            <h1>Registration</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <MdEmail className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
      {showModal && (
        <div className="login-modal-content">
          <img
            className="close"
            onClick={closeModal}
            src={close}
            alt="close message"
          />
          <h3>This is a demo form for portfolio purposes only.</h3>
        </div>
      )}
    </div>
  );
}

export default LogIn;
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import "./login.css";
// import { FaUser, FaLock } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { useDarkMode } from "../../../components/Context/DarkMode";
// import close from "../../../assets/exit.png";

// function LogIn() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [action, setAction] = useState("");
//   const { darkMode } = useDarkMode();
//   const [showModal, setShowModal] = useState(false);

//   const registerLink = () => setAction(" active");
//   const loginLink = () => setAction("");

//   const onLoginSubmit = (data) => {
//     console.log("Datos de Login:", data);
//     setShowModal(true);
//   };

//   const onRegisterSubmit = (data) => {
//     console.log("Datos de Registro:", data);
//     setShowModal(true);
//   };

//   const closeModal = () => setShowModal(false);

//   return (
//     <div className={`login-body ${darkMode ? "dark" : ""}`}>
//       <div className={`wrapper-login ${action}`}>
//         {/* Formulario de Login */}
//         <div className="form-box login">
//           <form onSubmit={handleSubmit(onLoginSubmit)}>
//             <h1>Login</h1>
//             <div className="input-box">
//               <input
//                 type="text"
//                 placeholder="Username"
//                 {...register("loginUsername", { required: true })} // Cambiar nombre para evitar conflictos
//               />
//               {errors.loginUsername && (
//                 <span>El nombre de usuario es obligatorio</span>
//               )}
//               <FaUser className="icon" />
//             </div>
//             <div className="input-box">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 {...register("loginPassword", { required: true })} // Cambiar nombre para evitar conflictos
//               />
//               {errors.loginPassword && (
//                 <span>La contraseña es obligatoria</span>
//               )}
//               <FaLock className="icon" />
//             </div>
//             <div className="remember-forgot">
//               <label>
//                 <input type="checkbox" />
//                 Recordarme
//               </label>
//               <a href="#">¿Olvidaste tu contraseña?</a>
//             </div>
//             <button type="submit">Login</button>
//             <div className="register-link">
//               <p>
//                 ¿No tienes una cuenta?
//                 <a href="#" onClick={registerLink}>
//                   Registrar
//                 </a>
//               </p>
//             </div>
//           </form>
//         </div>

//         {/* Formulario de Registro */}
//         <div className="form-box register">
//           <form onSubmit={handleSubmit(onRegisterSubmit)}>
//             <h1>Registro</h1>
//             <div className="input-box">
//               <input
//                 type="text"
//                 placeholder="Username"
//                 {...register("registerUsername", { required: true })} // Cambiar nombre para evitar conflictos
//               />
//               {errors.registerUsername && (
//                 <span>El nombre de usuario es obligatorio</span>
//               )}
//               <FaUser className="icon" />
//             </div>
//             <div className="input-box">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 {...register("email", { required: true })}
//               />
//               {errors.email && <span>El email es obligatorio</span>}
//               <MdEmail className="icon" />
//             </div>
//             <div className="input-box">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 {...register("registerPassword", { required: true })} // Cambiar nombre para evitar conflictos
//               />
//               {errors.registerPassword && (
//                 <span>La contraseña es obligatoria</span>
//               )}
//               <FaLock className="icon" />
//             </div>
//             <div className="remember-forgot">
//               <label>
//                 <input type="checkbox" /> Acepto los términos y condiciones
//               </label>
//             </div>
//             <button type="submit">Registrar</button>
//             <div className="register-link">
//               <p>
//                 ¿Ya tienes una cuenta?
//                 <a href="#" onClick={loginLink}>
//                   Login
//                 </a>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="login-modal-content">
//           <img
//             className="close"
//             onClick={closeModal}
//             src={close}
//             alt="cerrar mensaje"
//           />
//           <h3>
//             Este es un formulario de demostración solo para fines de portafolio.
//           </h3>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LogIn;
