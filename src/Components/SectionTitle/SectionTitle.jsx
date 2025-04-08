import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='text-center w-1/2 sm:w-4/12 mx-auto my-10'>
            <p className=' text-sm sm:text-base text-yellow-500 pb-4 font-medium'>---{subHeading}---</p>
            <h3 className='text-sm sm:text-xl md:text-3xl uppercase border-y-4 py-4'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;