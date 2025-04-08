import React from "react";
import { Parallax } from 'react-parallax';


const Cover = ({img, title, description}) => {
  return (
        <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={img}
        bgImageAlt=""
        strength={-200} >

        <div className="hero h-[300px] md:h-[600px]" >
            <div className="hero-overlay "></div>
            <div className="hero-content text-center w-[70%] bg-black bg-opacity-35 p-10  text-white">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                    <p className="mb-5">{description}</p>
                </div>
            </div>
        </div>
    </Parallax>

  );
};

export default Cover;
