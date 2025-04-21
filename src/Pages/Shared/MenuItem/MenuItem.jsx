import React from 'react';

const MenuItem = ({item}) => {

    const {name, category, image , price, recipe} = item;

    return (
        <div className='flex justify-center items-center space-x-5 mx-auto scale-75 md:scale-90 md:w-[550px] lg:w-auto'>
            <img style={{borderRadius: '50px 200px 200px 200px'}} className=' h-[100px] w-[100px] object-cover shadow-2xl border-2 border-black' src={image} alt="" />
            <div>
                <h3 className='uppercase text-2xl'>{name}----------</h3>
                <p className='text-xl'>{recipe}</p>
            </div>
            <p className='text-yellow-500 text-4xl lg:text-2xl'>${price}</p>
        </div>
    );
};

export default MenuItem;