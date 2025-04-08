import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useMenu from '../../../Hooks/UseMenu';
import { FaEdit, FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { Link } from 'react-router-dom';

const MangeItems = () => {

    const [menu,  refetch] = useMenu()
    const axiosSecure = UseAxiosSecure();

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.delete(`/menu/${item._id}`)
                console.log(res.data)

                if(res.data.deletedCount > 0){
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your menu has been deleted.",
                        icon: "success",
                        timer: 1500
                      });
                } 
            }
          });
    }

    return (
        <div>
           <SectionTitle heading={'Manage All Item'} subHeading={'Hurry up'} ></SectionTitle>

           <div>
           <div className="overflow-x-auto">
            <table className="table w-full border-2 border-orange-400">
                {/* head */}
                <thead className='bg-orange-400'>
                <tr>
                    <th></th>
                    <th>Image</th>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {
                        menu.map((item, index) => <tr key={index}>
                        <td>
                            {index + 1}
                        </td>
    
                        <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                    <img src={item.image} alt="Menu image " />
                                </div>
                            </div>
                        </div>
                        </td>
                        <td>
                            {item.name}
                        </td>
                        <td className='text-right'>${item.price}</td>
                        <td>
                            <Link to={`/dashboard/updateItem/${item._id}`} >
                                <button className='btn bg-orange-400 lg:text-xl p-2 lg:p-3 rounded-md' ><FaEdit></FaEdit></button>
                            </Link>
                        </td>

                        <td>
                            <button onClick={() => handleDeleteItem(item)} className="btn bg-red-500 lg:text-xl text-white p-2 lg:p-3 rounded-md "><FaTrashAlt /></button>
                        </td>

                    </tr>)
                    }
                </tbody>
            </table>
            </div>
           </div>
        </div>
    );
};

export default MangeItems;