import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const userIcon = <FontAwesomeIcon icon={faUser} />;

const Ingresar = () => {
  return (
    <div>
      <li >
          {userIcon} Ingresar
      </li>
    </div>
  );
};

export default Ingresar;





/* import React, { useState } from "react";

// Iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
const envelopeIcon = <FontAwesomeIcon icon={faEnvelope} />;
const userIcon = <FontAwesomeIcon icon={faUser} />;
const lockIcon = <FontAwesomeIcon icon={faLock} />;

const Ingresar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // Lógica de inicio de sesión
  };

  return (
    <div>
      <button
        className="text-gray-600 font-medium"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {userIcon} Ingresar
      </button>

      {isHovered && (
        <div
          className="fixed flex items-center "
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="bg-white shadow-md rounded pt-8 pb-8 mb-4"
            onSubmit={handleLoginSubmit}
          >
            <div className="flex flex-col">
              <h2 className="mb-2 text-lg"> ¡Bienvenido a Henrucci!</h2>
              <p className="text-sm text-gray-600 break-words">
                Para una experiencia de compra personalizada, te invitamos a
                iniciar sesión en tu cuenta.
              </p>
            </div>
            <button
              type="submit"
              className="w-full max-w-xs bg-teal-500 hover:bg-red-500 text-white px-4 py-2 rounded focus:outline-none focus:border-teal-300 duration-200 mt-4"
            >
              Vamos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ingresar; */










// import React, { useState } from 'react';
// import Link from "next/link";

// // iconos //
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// /* import { FaGoogle } from 'react-icons/fa'; */
// const envelopeIcon = <FontAwesomeIcon icon={faEnvelope} />;
// const userIcon = <FontAwesomeIcon icon={faUser} />;
// const lockIcon = <FontAwesomeIcon icon={faLock} />;

// // componentes //
// import { validateLoginForm } from '../../app/Register/formValidation';
// import WelcomeMessageLogin from "../WelcomeMessageLogin/WelcomeMessageLogin";

// // redux //
// import { useLoginUserMutation } from "@/redux/services/usersApi";

// const Login = () => {
//   //estado para el hover del boton ingresar
//   const [isHovered, setIsHovered] = useState(false);
//   //estado para las validaciones
//   const [formErrors, setFormErrors] = useState({});
//   // estado para el mensaje de bienvenida //
//   const [welcomeMessageLogin ,setWelcomeMessageLogin]= useState("")
//   //estado para el login
//   const [loginUser] = useLoginUserMutation();

//   const [loginFormData, setLoginFormData] = useState({
//     loginEmail: "",
//     loginPassword: "",
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginFormData({
//       ...loginFormData,
//       [name]: value,
//     });
//   };

//   const validateForm = () => {
//     const formData = loginFormData;
//     const errors = validateLoginForm(formData);
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       try {
//         const loginResponse = await loginUser(loginFormData);
//         if (loginResponse?.data?.token) {
//           setWelcomeMessageLogin("Inicio de sesión exitoso");
//           console.log("sesión exitosa:", loginResponse);
//         } else {
//           console.error("Error en el inicio de sesión:", loginResponse?.data?.error);
//         }

//         setLoginFormData({
//           loginEmail: "",
//           loginPassword: "",
//         });
//       } catch (error) {
//         console.error("Error al iniciar sesión:", error);
//       }
//     } else {
//       console.log("Formulario de inicio de sesión inválido");
//     }
//   };

//   return (
//     <div>
//       <button
//         className='text-gray-600 font-medium'
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         {userIcon} Ingresar
//       </button>

//       {isHovered && (
//         <div className='fixed flex justify-center items-center' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//           <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full h-96" onSubmit={handleLoginSubmit}>
//             <div className='flex flex-col'>
//               <Link href="/Register" className='ml-32 text-red-500'>
//                 Crear cuenta
//               </Link>
//               <h2 className='mb-4 text-lg'>Ingresa</h2>
//               <label htmlFor='loginEmail' className='mr-3 font-semibold font-[Poppins] pt-4'>
//                 {envelopeIcon} Correo electrónico
//               </label>
//               <input
//               type="email"
//               id="loginEmail"
//               name="loginEmail"
//               placeholder="Email"
//               value={loginFormData.loginEmail}
//               onChange={handleChange}
//                 className={`mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500`}
//               />
//                {formErrors.loginEmail && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {formErrors.loginEmail}
//                   </p>
//                 )}
//             </div>

//             {/* contraseña */}
//             <div className='flex flex-col'>
//               <label htmlFor='loginPassword' className='mt-8 p-1 mr-3 font-semibold font-[Poppins]'>
//                 {lockIcon} Contraseña
//               </label>
//               <input
//                  type="password"
//                  id="loginPassword"
//                  name="loginPassword"
//                  placeholder="Contraseña"
//                  value={loginFormData.loginPassword}
//                  onChange={handleChange}
//                 className={`mr-10 bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-teal-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500 `}
//               />
//                {formErrors.loginPassword && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {formErrors.loginPassword}
//                   </p>
//                 )}
//             </div>

//             <button
//               type="button"
//               className='flex items-center justify-center w-full h-8 bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded focus:outline-none focus:border-teal-300 duration-200 mt-2'
//             >
//               {/* <FaGoogle className="mr-2" /> */}
//               Accede con Google
//             </button>
//             <button type="submit" className='w-64 bg-teal-500 hover:bg-red-500 text-white px-4 py-2 rounded focus:outline-none focus:border-teal-300 duration-200 mt-2'>
//               Ingresar
//             </button>
//           </form>
//         </div>
//       )}
//       {welcomeMessageLogin && <WelcomeMessageLogin />}
//     </div>
//   );
// }

// export default Login;
