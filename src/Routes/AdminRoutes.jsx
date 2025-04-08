import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import UseAdmin from '../Hooks/UseAdmin';
import UseAuth from '../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoutes = ({children}) => {

    const {user, loading} = UseAuth();
    const [isAdmin, isAdminLoading] = UseAdmin();

    const location = useLocation();

    if(loading || isAdminLoading){
        return  <div className='py-32 flex justify-center items-center'>
            <ScaleLoader
                height={77}
                margin={10}
                radius={0}
                width={5}
                />
        </div>
    }

    if(user && isAdmin ){
        return children;
    }

    return <Navigate to={'/'} state={{from: location}} replace></Navigate>

};

export default AdminRoutes;