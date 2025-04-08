import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import UseAuth from '../../Hooks/UseAuth';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {

    const {googleSignIn} = UseAuth();
    const axiosPublic = UseAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(res => {
            console.log(res.user);
            const userInfo = { 
                email : res.user?.email,
                name : res.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data);
                navigate('/')
            })
        })
    }

    return (
        <div>
            <div className='divider mx-5'></div>
            <div className='flex justify-center my-5'>
                <button onClick={handleGoogleSignIn} 
                className=' bg-none border-4 border-orange-400 flex justify-center items-center px-4 py-3 gap-3 rounded-lg '>
                    <FaGoogle></FaGoogle>
                    <span className='font-bold'>Login</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;