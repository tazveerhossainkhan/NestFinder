import { useContext } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const Wishlist = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: wishlists = [] } = useQuery({
        queryKey: ['wishlist', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist?email=${user?.email}`);
            return res.data;
        }
    });

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'text-orange-500';
            case 'rejected':
                return 'text-red-500';
            case 'verified':
                return 'text-green-500';
            default:
                return 'text-gray-500';
        }
    };



    return (
        <div>
            <div className="lg:mx-36 lg:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {wishlists.map(wishlist => (
                    <div key={wishlist._id} className="bg-white shadow-md rounded-lg overflow-hidden border-2 border-black">
                        <img src={wishlist.propertyImage} alt={wishlist.title} className="w-full h-64 object-cover" />
                        <div className="p-4">
                            <h3 className="text-2xl font-bold mb-2">{wishlist.propertyTitle}</h3>
                            <p className="text-gray-600 text-lg mb-2 font-medium">Location: {wishlist.propertyLocation}</p>
                            <div className="flex items-center mb-2">
                                <span className="text-base font-medium">Agent Name: {wishlist.agentName}</span>
                            </div>
                            <p className="text-gray-600 text-base font-medium mb-2">
                            Offer Status: <span className={getStatusClass(wishlist.status)}>{wishlist.status}</span>
                        </p>
                            <p className="text-xl font-bold text-yellow-400 mb-2">Starting from ${wishlist.priceRange}</p>
                            <div className="flex justify-end">
                                <Link to={`/dashboard/makeOffer/${wishlist._id}`}><button className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">
                                    Make an Offer
                                </button></Link>
                                <button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
