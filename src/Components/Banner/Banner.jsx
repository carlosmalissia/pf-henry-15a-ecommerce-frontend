"use client";
import React, { useEffect, useState } from "react";
import useScreenSize from "../../hooks/userScreenSize";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import Image from "next/image";

function Banner() {

    const [slides, setSlides] = useState([
        {
            Image: "/images/banner1.webp",
        },
        {
            Image: "/images/banner2.webp",
        },
        {
            Image: "/images/banner3.webp",
        },

        {
            Image: "/images/banner5.webp",
        },
        {
            Image: "/images/banner6.webp",
        },
        {
            Image: "/images/banner7.webp",
        }
    ]
    );

    const slidesMobil = [
        {
            Image: "/images/banner1Movil.webp",
        },
        {
            Image: "/images/banner2Mobil.webp",
        },
        {
            Image: "/images/banner6Mobil.webp",
        },
        {
            Image: "/images/banner7Mobil.webp",
        }
    ];

    const handleWidth = () => {
        if (window.innerWidth < 700) {
            setSlides(slidesMobil)
        }
    }
    useEffect(() => {
        const handleResize = () => handleWidth()
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, [])

    useEffect(() => {
        handleWidth()
    }, [])
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(intervalId);
    }, [currentIndex]);

    //`url(${slides[currentIndex].Image})`

    return (
        <div className="max-w-[2000px] mx-auto h-[500px]  group">
            <Image
                src={slides[currentIndex].Image}
                alt="banner"
                width={1080}
                height={400}
                className="w-full h-full object-cover rounded-md mt-4"

            />
            {/* <div
        style={{ backgroundImage: `url(${slides[currentIndex].Image})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
      ></div> */}

            {/* Left Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            {/* Right Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            <div className="flex top-4 justify-center py-2">
                {slides.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className="text-2xl cursor-pointer"
                    >
                        <RxDotFilled />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Banner;

