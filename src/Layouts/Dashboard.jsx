import { BsList } from "react-icons/bs";
import { FaEnvelope, FaHome, FaList, FaShoppingBag, FaShoppingCart, FaUsers } from "react-icons/fa";
import { MdOutlineManageSearch, MdPayment, MdReviews } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { NavLink, Outlet } from "react-router-dom";
import UseCart from "../Hooks/UseCart";
import { ImSpoonKnife } from "react-icons/im";
import { FaBookBookmark } from "react-icons/fa6";
import UseAdmin from "../Hooks/UseAdmin";


const Dashboard = () => {

    const [cart] = UseCart();

    const [isAdmin] = UseAdmin();

    return (
        <div className="flex ">
            <div className=" w-[32%] lg:w-64 min-h-screen bg-orange-400">
                <ul className="menu md:p-4 my-5 flex flex-col space-y-5  sm:text-base lg:text-xl">

                    {
                        isAdmin ? 
                        <>
                            <li className="">
                                <NavLink className={'p-0 '} to='/dashboard/adminHome' ><FaHome></FaHome>Admin Home</NavLink>
                            </li>
                            <li className="">
                                <NavLink className={'p-0 '} to='/dashboard/addItems' ><ImSpoonKnife />Add Items</NavLink>
                            </li>
                            <li className="">
                                <NavLink className={'p-0 '} to='/dashboard/manageItems' ><MdOutlineManageSearch/>Manage Items</NavLink>
                            </li>
                            <li className="">
                                <NavLink className={'p-0 '} to='/dashboard/manageBookings' ><FaBookBookmark />Manage Bookings</NavLink>
                            </li>
                            <li className="">
                                <NavLink className={'p-0 '} to='/dashboard/allUsers' ><FaUsers />All Users</NavLink>
                            </li>
                        </> 
                        : 
                        <>
                            <li className="">
                                <NavLink className={'p-0 '} to='/dashboard/userHome' ><FaHome></FaHome>User Home</NavLink>
                            </li>
                            <li>
                                <NavLink className={'p-0'} to='/dashboard/reservation' ><SlCalender />
                                Reservation</NavLink>
                            </li>
                            <li>
                                <NavLink className={'p-0'} to='/dashboard/review' ><MdReviews />Add a Review</NavLink>
                            </li>
                            <li>
                                <NavLink className={'p-0'} to='/dashboard/bookings' ><FaList></FaList>My Bookings</NavLink>
                            </li>
                            <li>
                                <NavLink className={'p-0'} to='/dashboard/cart' ><FaShoppingCart></FaShoppingCart>My Cart({cart.length})</NavLink>
                            </li>
                            <li>
                                <NavLink className={'p-0'} to='/dashboard/paymentHistory' ><MdPayment />Payment History</NavLink>
                            </li>
                        </>
                    }

                    <div className="divider"></div>

                    <li>
                        <NavLink className={'p-0'} to='/' ><FaHome></FaHome>Home</NavLink>
                    </li>
                    <li>
                        <NavLink className={'p-0'} to='/menu' ><BsList />
                        Menu</NavLink>
                    </li>
                    <li>
                        <NavLink className={'p-0'} to='/orderFood/salad' ><FaShoppingBag />
                        Shop</NavLink>
                    </li>
                    <li>
                        <NavLink className={'p-0'} to='/' ><FaEnvelope />
                        Contact</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 w-[68%] p-2 md:p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;