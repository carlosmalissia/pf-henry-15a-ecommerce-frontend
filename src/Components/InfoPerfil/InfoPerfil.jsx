import React from 'react'
import { useAppSelector } from "@/redux/hooks";

const InfoPerfil = () => {
  
    const userData = useAppSelector((state) => state.loginReducer.user);
  /* console.log("userData", userData); */
  const userToken = useAppSelector((state) => state.loginReducer.token);

  const name = userData?.name
  
  /* console.log("este es el name " + name);
  console.log("este es el token " + userToken); */
    return (
        <div className="min-h-screen mr-64 mt-20 ml-12  ">
          <h2 className="text-3xl font-semibold mb-12">¡Bienvenido a tu Perfil, {name} !</h2>
          <p className="text-gray-700 mb-6">
            En tu perfil de usuario, puedes realizar diversas acciones para personalizar tu experiencia.
            A continuación, te explicamos algunas de las funcionalidades disponibles:
          </p>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
           
            <div className="p-4 bg-white rounded-md shadow">
              <h3 className="text-lg font-semibold mb-2">Modificar Datos Personales</h3>
              <p className="text-gray-600">
                Actualiza tu información personal, como nombre, dirección, email y contraseña.
              </p>
              
            </div>
    
            
            <div className="p-4 bg-white rounded-md shadow">
              <h3 className="text-lg font-semibold mb-2">Revisar Tus Reseñas</h3>
              <p className="text-gray-600">
                Accede a todas las reseñas que has realizado. Modifica tus comentarios según sea necesario.
              </p>
              
            </div>
    
            
            <div className="p-4 bg-white rounded-md shadow">
              <h3 className="text-lg font-semibold mb-2">Ver Historial de Compras</h3>
              <p className="text-gray-600">
                Explora todas las compras que has realizado. Obtén detalles sobre productos y fechas.
              </p>
              
            </div>
          </div>
        </div>
      );
    };

export default InfoPerfil