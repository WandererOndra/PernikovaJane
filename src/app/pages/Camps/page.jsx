"use client"
import { useState } from "react";
import posters from "./posters";
import Image from "next/image";


export default function Camps() {

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextPoster = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % posters.length);
      };

      const prevPoster = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? posters.length - 1 : prevIndex - 1
        );
      };

  return (
    <main>
        <div className="flex flex-col items-center lg:flex-row py-5 gap-5 lg:pt-10 lg:px-32 ">
            <div className=" flex flex-col grow sm:pt-5 lg:order-2 text-center gap-5 lg:w-1/2 lg:pt-10">
                <div className="text-4xl sm:text-6xl">
                    <h2>{posters[currentIndex].year}</h2>
                </div>
                <div className="text-2xl sm:text-4xl">
                    <h3>{posters[currentIndex].title}</h3>
                </div>
                <div className=" text-base px-2 sm:px-10 md:px-20 lg:px-0 sm:text-2xl">
                    <p>{posters[currentIndex].info}</p>
                    <p>{posters[currentIndex].actual}</p>
                </div>
                <div className="lg:order-3 space-x-2 py-2">
            <button className="transitionBtn" onClick={prevPoster}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6" stroke="currentColor">
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/>
                <path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z"/>
            </svg>

            </button>
            <button className="transitionBtn" onClick={nextPoster}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6" stroke="currentColor">
                    <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/>
                    <path d="M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z"/>
                </svg>
            </button>
          </div>
            </div>
            <div className="flex justify-center grow-0 px-2 py-2 md:pb-5 lg:pb-0 lg:w-1/3">
                <div className="items-center object-scale-down">
                    <a href={posters[currentIndex].imageUrl} target="_blank" rel="noopener noreferrer">
                        <Image
                            src={posters[currentIndex].imageUrl}
                            width={posters[currentIndex].width}
                            height={posters[currentIndex].height}
                            alt="Plakát"
                            priority={true}
                            className="rounded-lg transform-none md:transform md:hover:scale-105 md:transition md:ease-out md:duration-300"
                        />
                    </a>
                </div>
            </div>
        </div>
    </main>
  )
}
