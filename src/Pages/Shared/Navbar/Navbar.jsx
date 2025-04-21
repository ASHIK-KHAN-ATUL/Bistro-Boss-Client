import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import { FaShoppingCart } from 'react-icons/fa';
import UseCart from '../../../Hooks/UseCart';
import UseAdmin from '../../../Hooks/UseAdmin'

const Navbar = () => {

    const {logout, user} = useContext(AuthContext);
    const [cart] = UseCart();
    const [isAdmin] = UseAdmin();

    const handleLogout = () => {
        logout()
        .then(res => {})
        .catch(error => console.log(error))
    }
    
    const navOptions = <>
                <li className=''><Link to={'/'}>Home</Link></li>
                <li><Link to={'/menu'}>Our Menu</Link></li>
                {
                    user && isAdmin && <li><Link to={'/dashboard/adminHome'} >Dashboard</Link></li>
                }
                {
                    user && !isAdmin && <li><Link to={'/dashboard/userHome'} >Dashboard</Link></li>
                }
                <li><Link to={'/orderFood/salad'}>Order Food</Link></li>
                <li>
                    <Link to={'/dashboard/cart'}>
                    <button className="btn"> <FaShoppingCart></FaShoppingCart>
                        <div className="badge badge-secondary">+{cart.length}</div>
                    </button>
                    </Link>
                </li>
                {
                    user? <>
                        <button onClick={() =>handleLogout()} className="btn btn-error">Logout</button>
                    </> :  <>
                        <li><Link to={'/login'}>Login</Link></li>
                    </>
                }
            </>

    return (
        <div className=''>
            <div className=" fixed h-24 w-full z-10 text-white bg-black bg-opacity-50 max-w-screen-xl flex items-center">
                
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden mx-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-xl dropdown-content bg-black  z-[1] bg-opacity-75 rounded-lg mt-3 w-72 h-96 p-2 shadow flex justify-between">
                        {navOptions}
                    </ul>
                    </div>
                    <a className="btn btn-ghost text-4xl lg:text-3xl">Bistro Boss</a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 flex justify-center items-center">
                       {navOptions}
                    </ul>
                </div>

                <div className="navbar-end text-4xl mr-3">
                    <p className='' > {user?.displayName} </p>
                </div>

            </div>


        </div>
    );
};

export default Navbar;