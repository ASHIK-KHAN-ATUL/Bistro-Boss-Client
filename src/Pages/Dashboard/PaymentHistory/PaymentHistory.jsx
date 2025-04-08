import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const PaymentHistory = () => {

    const axiosSecure = UseAxiosSecure();
    const {user} = UseAuth();
    const {data: payments = []} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data
        }
    })

    return (
        <div>
            <SectionTitle heading={'Payment History'} subHeading={'Your all payments'}></SectionTitle>
            <div className='bg-green-100  p-10'>
                <h2 className='text-3xl mb-10'>Total payments : {payments.length}</h2>

                <div className="overflow-x-auto">
                <table className="table rounded-2xl">
                    {/* head */}
                    <thead className=''>
                    <tr>
                        <th></th>
                        <th>Price</th>
                        <th>Transaction Id</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody className=' '>
                    {
                        payments.map((payment, index) => <tr className='bg-purple-300 ' key={payment._id}>
                            <th>{index + 1 }</th>
                            <td>{payment.price}</td>
                            <td>{payment.transactionId}</td>
                            <td>{payment.status}</td>
                        </tr>)
                    }
                    
                    </tbody>
                </table>
                </div>

            </div>
        </div>
    );
};

export default PaymentHistory;