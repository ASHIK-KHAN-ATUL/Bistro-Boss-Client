import React from 'react';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import Cover from '../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({items, title, image, description, btnText}) => {
    return (
        <div className='my-20'>
            {title && <Cover img={image} title={title} description={description}></Cover>}          
            <div className='grid lg:grid-cols-2 gap-7 my-5 justify-items-center mx-auto'>
                {
                    items.map(item => <MenuItem 
                        item={item}
                        key={item._id} ></MenuItem> )
                }
            </div>
            <div className='flex justify-center items-center mt-4 ' >
                <Link to={`/orderFood/${title}`} className='btn btn-outline border-0 border-b-4 hover:border-b-4  hover:border-white duration-500 text-lg font-bold mt-4'>{btnText}</Link>
            </div>
        </div>
    );
};

export default MenuCategory;