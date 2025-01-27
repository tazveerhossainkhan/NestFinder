import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from 'react-router-dom';
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { HashLoader } from "react-spinners";

const AllProperties = () => {
    const axiosSecure = useAxiosSecure();
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    const { data: properties = [], isLoading, error } = useQuery({
        queryKey: ['verifiedProperties'],
        queryFn: async () => {
            const res = await axiosSecure.get('/verifiedProperties')
            return res.data;
        }
    });

    const handleSort = (order) => {
        setSortOrder(order);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const sortedProperties = properties.slice().sort((a, b) => {
        if (sortOrder === "asc") {
            return a.priceRange - b.priceRange;
        } else {
            return b.priceRange - a.priceRange;
        }
    });

    const filteredProperties = sortedProperties.filter(property =>
        property.propertyLocation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return <div className="w-full flex items-center justify-center"><HashLoader className='text-black' /></div>
    }

    if (error) {
        return <div>Error loading properties</div>;
    }

    return (
        <div className="lg:mx-36 lg:mt-10 p-6">
            <div className="flex justify-between mb-4">
                <div>
                    <input type="text" placeholder="Search by location" value={searchTerm} onChange={handleSearch} className="border-2 border-yellow-400 text-base lg:font-medium font-normal rounded-md p-3" />
                </div>
                <div>
                    <select onChange={(e) => handleSort(e.target.value)} value={sortOrder} className="border-2 border-yellow-400 text-base lg:font-medium font-normal  rounded-md p-3">
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map(property => (
                    <div key={property._id} className="bg-white shadow-md rounded-lg overflow-hidden border-2 border-black">
                        <img src={property.propertyImage} alt={property.title} className="w-full h-64 object-cover" />
                        <div className="p-4">
                            <h3 className="text-2xl font-bold mb-2">{property.propertyTitle}</h3>
                            <p className="text-gray-600 text-lg mb-2 font-medium">Location: {property.propertyLocation}</p>
                            <div className="flex items-center mb-2">
                                <span className="text-base font-medium">Agent Name: {property.agentName}</span>
                            </div>
                            <p className="text-gray-600 text-base font-medium mb-2">Verification Status: <span className="text-green-500">{property.status}</span></p>
                            <div className="flex justify-between items-center mt-6">
                                <div className="">
                                    <p className=" text-xl font-bold text-yellow-400 mb-2">Starting from ${property.priceRange}</p>
                                </div>
                                <div>
                                    <Link to={`/propertyDetails/${property._id}`} className="btn btn-warning btn-md text-black px-4 py-2 rounded-md">Details</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProperties;
