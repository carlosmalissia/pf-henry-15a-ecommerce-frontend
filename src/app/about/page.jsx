import React from 'react'
import alanfavatier from '../../../public/images/alanfavatier.jpg'
import mirkaalamilla from '../../../public/images/mirkaalamilla.jpg'
import carlosmalissia from '../../../public/images/carlosmalissia.jpg'
import isaacbarboza from '../../../public/images/isaacbarboza.jpg'
import luisreyes from '../../../public/images/luisreyes.jpg'
import Image from "next/image";

function About() {
    return (
        <div className='mt-48 mx-24 pb-24'>
            <h1 className='text-5xl mb-3'>
                Nosotros
            </h1>
            <div className='border border-white mb-4 rounded-2xl flex flex-row p-6 justify-around items-center shadow-lg'>
                <h1 className='justify-center items-center text-4xl'>
                    Alan Favatier
                </h1>
                <Image src={alanfavatier} alt='perfil NicoTS' className='w-3/12' />
            </div>
            <div className='border border-white mb-4 rounded-2xl flex flex-row p-6 justify-around items-center'>
                <h1 className='justify-center items-center text-4xl'>
                    Pablo Guerreño
                </h1>
                <img src='https://github.com/Guerre-Pablo-Agustin.png' alt='perfil MatiJS' className='w-3/12' />
            </div>
            <div className='border border-white mb-4 rounded-2xl flex flex-row p-6 justify-around items-center'>
                <h1 className='justify-center items-center text-4xl'>
                    Mirka Alamilla
                </h1>
                <Image src={mirkaalamilla} alt='perfil RicardoJS' className='w-3/12' />
            </div>
            <div className='border border-white mb-4 rounded-2xl flex flex-row p-6 justify-around items-center'>
                <h1 className='justify-center items-center text-4xl'>
                    Fernando Revilla
                </h1>
                <img src='https://github.com/LCamarilloFlores.png' alt='perfil LuísTS' className='w-3/12' />
            </div>
            <div className='border border-white mb-4 rounded-2xl flex flex-row p-6 justify-around items-center'>
                <h1 className='justify-center items-center text-4xl'>
                    Isaac Rodríguez
                </h1>
                <Image src={isaacbarboza} alt='perfil IsaacJS' className='w-3/12' />
            </div>
            <div className='border border-white mb-4 rounded-2xl flex flex-row p-6 justify-around items-center'>
                <h1 className='justify-center items-center text-4xl'>
                    Carlos Malissia
                </h1>
                <Image src={carlosmalissia} alt='perfil CarlosJS' className='w-3/12' />
            </div>
            <div className='border border-white mb-4 rounded-2xl flex flex-row p-6 justify-around items-center'>
                <h1 className='justify-center items-center text-4xl'>
                    Luis Reyes
                </h1>
                <Image src={luisreyes} alt='perfil AngeloJS' className='w-3/12' />
            </div>

        </div>
    )
}

export default About