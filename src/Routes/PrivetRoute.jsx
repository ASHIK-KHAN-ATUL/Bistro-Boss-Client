import { Navigate, useLocation } from 'react-router-dom';
import { RotateLoader  } from 'react-spinners';
import UseAuth from '../Hooks/UseAuth';

const PrivetRoute = ({children}) => {

    const {user, loading} = UseAuth();
    const location = useLocation();

    if(loading){
        return  <div className='flex justify-center items-center h-screen'>
            <div>
            <RotateLoader 
                height={77}
                margin={10}
                radius={0}
                width={5}
                />
            </div>
        </div>
    }

    if(user){
        return children;
    }

    return <Navigate to={'/login'} state={{from: location}} replace></Navigate>
};

export default PrivetRoute;