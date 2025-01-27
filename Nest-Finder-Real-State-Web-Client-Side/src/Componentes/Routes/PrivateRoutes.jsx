import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { HashLoader } from 'react-spinners';
import { AuthContext } from '../Providers/AuthProvider';

const PrivateRoutes = ({ children }) => {
    const location = useLocation()
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <div className="w-full flex items-center justify-center"><HashLoader className='text-black' /></div>
    }

    if (user) {
        return children
    }
    return <Navigate to="/login" state={location?.pathname || "/"}></Navigate>;
};

export default PrivateRoutes;