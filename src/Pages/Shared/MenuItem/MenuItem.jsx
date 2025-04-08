import React from 'react';

const MenuItem = ({item}) => {

    const {name, category, image , price, recipe} = item;

    return (
        <div className='flex justify-center items-center space-x-5 mx-auto scale-75 md:scale-90 md:w-[550px] lg:w-auto'>
            <img style={{borderRadius: '0 200px 200px 200px'}} className=' h-[100px] w-[100px] shadow-2xl border-2 border-black' src={image} alt="" />
            <div>
                <h3 className='uppercase'>{name}----------</h3>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-500'>${price}</p>
        </div>
    );
};

export default MenuItem;