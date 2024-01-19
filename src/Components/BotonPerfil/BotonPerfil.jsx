import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import HoverLogin from '../HoverPerfil/HoverPerfil';
import { useAppSelector } from "@/redux/hooks";
import { useGetUserByIdQuery } from "@/redux/services/usersApi"


const userIcon = <FontAwesomeIcon icon={faUser} />;

// Nuevo componente para el botón de ingresar
const ButtonWelcome = ({ onMouseEnter, onMouseLeave }) => {
    const userData = useAppSelector((state) => state.loginReducer.user);
    // console.log("userData", userData);
    
    const id = userData?._id;

    const getUserByIdQuery = useGetUserByIdQuery(id);
    console.log("esta es  la data del usuario",getUserByIdQuery);
    const userName= getUserByIdQuery?.currentData?.name
    const image= getUserByIdQuery?.currentData?.image 
    console.log("esta es la foto de perfil", image);
    
    return (
        <button
            className='text-gray-600 font-'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
           {userIcon} Hola {userName}
        </button>
    );
};

const BotonPerfil = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div>
            {/* Renderiza el componente IngresarButton */}
            <ButtonWelcome onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />

            {/* Muestra el formulario solo cuando se hace hover */}
            {isHovered && (
                <div className='fixed flex justify-center items-center' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <HoverLogin />
                </div>
            )}
        </div>
    );
};

export default BotonPerfil;
