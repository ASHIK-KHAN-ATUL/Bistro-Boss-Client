import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import featuredPic from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {

    const formattedDate = new Intl.DateTimeFormat('en-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date());

    return (
        <div className='fetured-item bg-fixed pt-10 my-20'>
            <SectionTitle
                subHeading={"Check It Out"}
                heading={"Fetured Item"}
            ></SectionTitle>
            <div className=' flex flex-col md:flex-row justify-center items-center py-10 px-12 md:py-20 md:px-24 gap-10 bg-red-200 bg-opacity-40'>
                <div>
                    <img src={featuredPic} alt="" />
                </div>
                <div className='font-medium text-black sm:text-white '>
                    <p>{formattedDate}</p>
                    <p className='py-4'>Where i can get some ?</p>
                    <p className='uppercase'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam optio adipisci autem accusamus, commodi eius atque cum ab molestiae ea repudiandae expedita praesentium dolorum similique quam aspernatur, eum deserunt ipsum?</p>
                    <button className='btn btn-outline border-0 border-b-4 hover:border-b-4 border-red-500 hover:border-white duration-500 text-lg font-bold mt-4'>Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;