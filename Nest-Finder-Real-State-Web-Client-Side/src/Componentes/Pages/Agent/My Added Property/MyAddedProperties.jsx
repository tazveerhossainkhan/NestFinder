import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";


const MyAddedProperties = () => {

    const axiosSecure = useAxiosSecure();

    const { user } = useContext(AuthContext);


    const { data: properties = [] } = useQuery({
        queryKey: ['properties', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/properties?email=${user?.email}`)
            return res.data
        }
    })
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
                {properties.map(property => (
                    <div key={property._id} className="bg-white shadow-md rounded-lg overflow-hidden border-2 border-black">
                        <img src={property.propertyImage} alt={property.title} className="w-full h-64 object-cover" />
                        <div className="p-4">
                            <h3 className="text-2xl font-bold mb-2">{property.propertyTitle}</h3>
                            <p className="text-gray-600 text-lg mb-2 font-medium">{property.propertyLocation}</p>
                            <div className="flex items-center mb-2">
                                <img src={user.photoURL} alt={property.agentName} className="w-8 h-8 rounded-full mr-2 ring ring-black" />
                                <span className="text-base font-medium">{property.agentName}</span>
                            </div>
                            <p className="text-gray-600 text-base font-medium mb-2">
                            Offer Status: <span className={getStatusClass(property.status)}>{property.status}</span>
                        </p>
                            <p className="text-xl font-bold text-yellow-400 mb-2">Starting from ${property.priceRange}</p>
                            <div className="flex justify-end">
                                {property.status === "rejected" && (
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Update</button>
                                )}
                                <button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default MyAddedProperties;