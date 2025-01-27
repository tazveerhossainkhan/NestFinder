import { NavLink } from "react-router-dom";
import useAdmin from "../../../../../Hooks/useAdmin";
import useAgent from "../../../../../Hooks/useAgent";

const Dashboard = () => {
    const [isAgent] = useAgent();
    const [isAdmin] = useAdmin();

    const getTitle = () => {
        if (isAdmin) return "Admin Dashboard";
        if (isAgent) return "Agent Dashboard";
        return "User Dashboard";
    };

    return (
        <div className="lg:mx-36 p-6">
            {/* Header Image */}
            <div className="relative h-64 mb-10">
                <img src="https://i.ibb.co/Y0Lvtwz/abstract-particle-structure-background-532781-716.jpg" alt="Dashboard Header" className="w-full rounded-lg h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-5xl font-bold text-yellow-400">{getTitle()}</h1>
                </div>
            </div>

            {isAdmin ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                    <NavLink
                        to='/dashboard/adminProfile'
                        className="flex border-yellow-400 items-center justify-center text-2xl text-yellow-400 font-semibold p-8 border-4 rounded-xl bg-white hover:bg-yellow-400 dark:bg-gray-800 hover:text-black dark:text-white transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"
                    >
                        Admin Profile
                    </NavLink>
                    <NavLink
                        to='/dashboard/manageProperties'
                        className="flex border-yellow-400 items-center justify-center text-2xl text-yellow-400 font-semibold p-8 border-4 rounded-xl bg-white hover:bg-yellow-400 dark:bg-gray-800 hover:text-black dark:text-white transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"
                    >
                        Manage Properties
                    </NavLink>
                    <NavLink
                        to='/dashboard/manageUsers'
                        className="flex border-yellow-400 items-center justify-center text-2xl text-yellow-400 font-semibold p-8 border-4 rounded-xl bg-white hover:bg-yellow-400 dark:bg-gray-800 hover:text-black dark:text-white transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"
                    >
                        Manage Users
                    </NavLink>
                    <NavLink
                        to='/dashboard/manageReviews'
                        className="flex border-yellow-400 items-center justify-center text-2xl text-yellow-400 font-semibold p-8 border-4 rounded-xl bg-white hover:bg-yellow-400 dark:bg-gray-800 hover:text-black dark:text-white transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"
                    >
                        Manage Reviews
                    </NavLink>
                </div>
            ) : isAgent ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NavLink
                        to='/dashboard/agentProfile'
                        className="flex border-yellow-400 items-center justify-center text-2xl text-yellow-400 font-semibold p-8 border-4 rounded-xl bg-white hover:bg-yellow-400 dark:bg-gray-800 hover:text-black dark:text-white transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"
                    >
                        Agent Profile
                    </NavLink>
                    <NavLink
                        to='/dashboard/addProperty'
                        className="flex border-yellow-400 items-center justify-center text-2xl text-yellow-400 font-semibold p-8 border-4 rounded-xl bg-white hover:bg-yellow-400 dark:bg-gray-800 hover:text-black dark:text-white transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"
                    >
                        Add Property
                    </NavLink>
                    <NavLink
                        to='/dashboard/myAddedProperties'
                        className="flex border-yellow-400 items-center justify-center text-2xl text-yellow-400 font-semibold p-8 border-4 rounded-xl bg-white hover:bg-yellow-400 dark:bg-gray-800 hover:text-black dark:text-white transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"
                    >
                        My Added Properties
                    </NavLink>
                    <NavLink
                        to='/dashboard/mySoldProperties'
                        className="flex border-yellow-400 items-center justify-center text-2xl text-yellow-400 font-semibold p-8 border-4 rounded-xl bg-white hover:bg-yellow-400 dark:bg-gray-800 hover:text-black dark:text-white transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"
                    >
                        My Sold Properties
                    </NavLink>
                    <NavLink
                        to='/dashboard/requestedProperties'
                        className="flex border-yellow-400 items-center justify-center text-2xl text-yellow-400 font-semibold p-8 border-4 rounded-xl bg-white hover:bg-yellow-400 dark:bg-gray-800 hover:text-black dark:text-white transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"
                    >
                        Requested Properties
                    </NavLink>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NavLink
                        to='/dashboard/myProfile'
                        className="flex border-yellow-400 items-center justify-center text-2xl text-yellow-400 font-semibold p-8 border-4 rounded-xl bg-white hover:bg-yellow-400 dark:bg-gray-800 hover:text-black dark:text-white transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"
                    >
                        My Profile
                    </NavLink>
                    <NavLink
                        to='/dashboard/wishlist'
                        className="flex border-yellow-400 items-center justify-center text-2xl text-yellow-400 font-semibold p-8 border-4 rounded-xl bg-white hover:bg-yellow-400 dark:bg-gray-800 hover:text-black dark:text-white transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"
                    >
                        Wishlist
                    </NavLink>
                    <NavLink
                        to='/dashboard/propertyBought'
                        className="flex border-yellow-400 items-center justify-center text-2xl text-yellow-400 font-semibold p-8 border-4 rounded-xl bg-white hover:bg-yellow-400 dark:bg-gray-800 hover:text-black dark:text-white transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"
                    >
                        Property Bought
                    </NavLink>
                    <NavLink
                        to='/dashboard/myReviews'
                        className="flex border-yellow-400 items-center justify-center text-2xl text-yellow-400 font-semibold p-8 border-4 rounded-xl bg-white hover:bg-yellow-400 dark:bg-gray-800 hover:text-black dark:text-white transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"
                    >
                        My Reviews
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
