import React from "react";
import Image from "next/image";
import alanfavatier from "../../../public/images/alanfavatier.jpg";
import mirkaalamilla from "../../../public/images/mirkaalamilla.jpg";
import carlosmalissia from "../../../public/images/carlosmalissia.jpg";
import isaacbarboza from "../../../public/images/isaacbarboza.jpg";
import luisreyes from "../../../public/images/luisreyes.jpg";

import { LuBriefcase, LuMapPin, LuMail } from "react-icons/lu";

function About() {
  const teamMembers = [
    {
      name: "Alan Favatier",
      image: alanfavatier,
      email: "alanfavatier305@gmail.com",
    },
    {
      name: "Pablo Guerreño",
      image: {
        src: "https://github.com/Guerre-Pablo-Agustin.png",
        width: 100,
        height: 100,
      },
      email: "guerre.pablo.agustin@gmail.com",
    },
    {
      name: "Mirka Alamilla",
      image: mirkaalamilla,
      email: "mirkaalamilla97@gmail.com",
    },
    {
      name: "Fernando Revilla",
      image: {
        src: "https://github.com/LCamarilloFlores.png",
        width: 100,
        height: 100,
      },
      email: "revcastfer@gmail.com",
    },
    {
      name: "Isaac Rodríguez",
      image: isaacbarboza,
      email: "isaacrbarboza98@gmail.com",
    },
    {
      name: "Carlos Malissia",
      image: carlosmalissia,
      email: "musicarlos72@gmail.com",
    },
    { name: "Luis Reyes", image: luisreyes, email: "luis.rocca96@gmail.com" },
  ];

  return (
    <section id="about">
      <div className="mt-48 mx-24 pb-24">
        <h1 className="text-5xl mb-8 text-center font-bold">Nosotros</h1>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div className="shadow-lg shadow-gray-500 cursor-pointer w-full max-w-sm bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 transform hover:scale-110 transition-transform duration-400 ease-in-out">
              <div className="flex flex-col items-center pb-10 pt-10">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={member.image.src}
                  alt="Bonnie image"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {member.name}
                </h5>
                {/* <span className="text-sm text-gray-500 dark:text-gray-400">
               Visual Designer
             </span> */}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {member.email}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
