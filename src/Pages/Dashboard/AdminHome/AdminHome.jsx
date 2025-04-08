import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { GiTakeMyMoney } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { GrDeliver } from "react-icons/gr";
import CountUp from 'react-countup';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { PieChart, Pie, } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red'];

const AdminHome = () => {
    const {user} = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const{data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async() => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });


    const {data: chatData = []} = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats')
            return res.data;
        }
    })
    // console.log( 'chartData :',chatData )

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
      };
      
      const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };



    //   pie chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
    };

    const pieChartData = chatData.map(data => {
        return {name: data.category, value: data.revenue}
    })
      

    return (
        <div>
            <h2 className=' mt-10 border-b-2 border-green-500 mx-10 sm:mx-[20%] text-center font-semibold md:text-3xl mb-10 md:mb-20'>
                <span>Hi, Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>

            <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10 justify-items-center'>

                {/* card  */}
                <div className=' p-5  w-[150px] sm:w-[220px] border-2 rounded-2xl flex justify-center items-center gap-5 bg-gradient-to-r from-violet-700 to-violet-400 text-white shadow-[0px_4px_20px_rgba(139,92,246,0.6)] hover:shadow-[0px_4px_20px_rgba(34,197,94,0.6)] duration-500 cursor-pointer '>
                    <GiTakeMyMoney className=' sm:text-3xl md:text-5xl'></GiTakeMyMoney>
                    <div className='flex flex-col items-center'>
                        <p className='font-bold  sm:text-3xl md:text-5xl'>
                            <CountUp start={0} end={stats?.revenue } duration={3}></CountUp>
                        </p>
                        <p className=' sm:text-xl md:text-2xl font-medium'>Revenue</p>
                    </div>
                </div>

                <div className=' p-5  w-[150px] sm:w-[220px] border-2 rounded-2xl flex justify-center items-center gap-5 bg-gradient-to-r from-lime-600 to-lime-200 text-white shadow-[0px_4px_20px_rgba(139,92,246,0.6)] hover:shadow-[0px_4px_20px_rgba(34,197,94,0.6)] duration-500 cursor-pointer  '>
                    <FaUser  className=' sm:text-3xl md:text-5xl'></FaUser>
                    <div className='flex flex-col items-center'>
                        <p className='font-bold  sm:text-3xl md:text-5xl'>
                            <CountUp start={0} end={stats?.users} duration={3}></CountUp>
                        </p>
                        <p className=' sm:text-xl md:text-2xl font-medium'>Customer</p>
                    </div>
                </div>

                <div className=' p-5  w-[150px] sm:w-[220px] border-2 rounded-2xl flex justify-center items-center gap-5 bg-gradient-to-r from-rose-600 to-rose-200 text-white shadow-[0px_4px_20px_rgba(139,92,246,0.6)] hover:shadow-[0px_4px_20px_rgba(34,197,94,0.6)] duration-500 cursor-pointer  '>
                    <IoFastFoodOutline   className=' sm:text-3xl md:text-5xl'></IoFastFoodOutline>
                    <div className='flex flex-col items-center'>
                        <p className='font-bold  sm:text-3xl md:text-5xl'>
                            <CountUp start={0} end={stats?.menuItems} duration={3}></CountUp>
                        </p>
                        <p className=' sm:text-xl md:text-2xl font-medium'>Products</p>
                    </div>
                </div>

                <div className=' p-5  w-[150px] sm:w-[220px] border-2 rounded-2xl flex justify-center items-center gap-5 bg-gradient-to-r from-sky-500 to-sky-200 text-white shadow-[0px_4px_20px_rgba(139,92,246,0.6)] hover:shadow-[0px_4px_20px_rgba(34,197,94,0.6)] duration-500 cursor-pointer  '>
                    <GrDeliver   className=' sm:text-3xl md:text-5xl'></GrDeliver>
                    <div className='flex flex-col items-center'>
                        <p className='font-bold  sm:text-3xl md:text-5xl'>
                            <CountUp start={0} end={stats?.orders}  duration={3}></CountUp>
                        </p>
                        <p className=' sm:text-xl md:text-2xl font-medium'>Orders</p>
                    </div>
                </div>

            </div>

            <div className="flex flex-col xl:flex-row mt-10 justify-between ">
                <div className=" overflow-scroll flex justify-center">
                <BarChart
                        width={500}
                        height={300}
                        data={chatData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {chatData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))}
                    </Bar>
                </BarChart>
                </div>

                <div className=" overflow-scroll flex justify-center">
                <PieChart width={400} height={400}>
                    <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend></Legend>
                </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;