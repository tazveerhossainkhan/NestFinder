import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";


const AdminRoute = ({children}) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="h-72">
            <progress className="progress w-56 my-auto "></progress>
        </div>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>
};

export default AdminRoute;