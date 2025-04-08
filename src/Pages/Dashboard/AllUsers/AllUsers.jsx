import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {

    const axiosSecure = UseAxiosSecure();

    const { refetch ,data: users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    title: `${user.name.split(' ')[0]} Is An Admin Now !!`,
                    icon: "success",
                    timer: 1500 
                });
                refetch();
            }
        })
    }

    const handleDeleteUser = user => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                    console.log(res)
                    if(res.data.deletedCount > 0){
                        refetch();
                        Swal.fire({
                        title: "Deleted!",
                        text: `${user.name} User has been deleted.`,
                        icon: "success"
                    });
                    }
                    })

                }
                });
    }



    return (
        <div>
            <div className='flex justify-evenly my-4'>
                <h2 className=' sm:text-3xl'>All Users</h2>
                <h2 className='sm:text-3xl'>Total Users : {users.length}</h2>
            </div>
            <div className='max-w-full overflow-x-auto border-2 border-orange-400'>
            <table className='table min-w-max w-full'>
                <thead className="lg:text-lg bg-orange-400 rounded-lg">
                    <tr className='text-white'>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => 
                        <tr key={index}  className="lg:text-lg font-semibold">
                            <th> {index + 1} </th>
                            <td > {user.name} </td>
                            <td> {user.email} </td>
                            <td>
                                {
                                    user.role === 'admin' ? 

                                    'Admin' 
                                    :

                                    <button onClick={() => handleMakeAdmin(user)}  className='btn bg-orange-400 lg:text-xl p-2 lg:p-3 rounded-md' ><FaUsers></FaUsers></button>
                                }
                            </td>
                            <td>
                                <button onClick={() => handleDeleteUser(user)} className="btn bg-red-500 lg:text-xl text-white p-2 lg:p-3 rounded-md "><FaTrashAlt /></button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default AllUsers;