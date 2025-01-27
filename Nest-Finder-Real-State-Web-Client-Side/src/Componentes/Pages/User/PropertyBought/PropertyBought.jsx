import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { HashLoader } from "react-spinners";
import useAuth from "../../../../Hooks/useAuth";
import { Link } from "react-router-dom";

const PropertyBought = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: properties = [], isLoading, error } = useQuery({
        queryKey: ['requested'],
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/requested/${user?.email}`);
                return res.data;
            }
            return [];
        },
        enabled: !!user?.email
        
    });

    if (isLoading) {
        return <div className="w-full flex items-center justify-center"><HashLoader className='text-black' /></div>;
    }

    if (error) {
        return <div>Error loading properties</div>;
    }

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'text-orange-500';
            case 'rejected':
                return 'text-red-500';
            case 'accepted':
                return 'text-green-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="lg:mx-36 lg:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {properties.map(property => (
                <div key={property._id} className="bg-white shadow-md rounded-lg overflow-hidden border-2 border-black">
                    <img src={property.propertyImage} alt={property.title} className="w-full h-64 object-cover" />
                    <div className="p-4">
                        <h3 className="text-2xl font-bold mb-2">{property.propertyTitle}</h3>
                        <p className="text-gray-600 text-lg mb-2 font-medium">Location: {property.propertyLocation}</p>
                        <div className="flex items-center mb-2">
                            {/* <img src={property.agentImage} alt={property.agentName} className="w-8 h-8 rounded-full mr-2" /> */}
                            <span className="text-base font-medium">Agent Name: {property.agentName}</span>
                        </div>
                        <p className="text-gray-600 text-base font-medium mb-2">
                            Offer Status: <span className={getStatusClass(property.offerStatus)}>{property.offerStatus}</span>
                        </p>
                        <div className="flex justify-between items-center mt-6">
                            <div className="">
                                <p className="text-xl font-bold text-yellow-400 mb-2">Offered Amount ${property.offeredAmount}</p>
                            </div>
                            <div>
                                <Link 
                                    to={`/pay/${property._id}`} 
                                    className={`btn btn-warning btn-md text-black px-4 py-2 rounded-md ${property.offerStatus !== 'accepted' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={property.offerStatus !== 'accepted'}
                                >
                                    Pay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PropertyBought;
