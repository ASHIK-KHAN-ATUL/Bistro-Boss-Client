import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
    baseURL: 'https://bistro-boss-server-tau-ten.vercel.app'
})

const UseAxiosSecure = () => {

    const navigate = useNavigate();
    const {logout } = UseAuth();
    
  
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        // console.log('Request Stopped By Interceptors', token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(error){
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, async (error) =>{
        const status = error.response.status
        // console.log('Status Error In The Interceptors', status);
        if(status === 401 || status === 403){
            await logout()
            navigate('/login')
        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default UseAxiosSecure;