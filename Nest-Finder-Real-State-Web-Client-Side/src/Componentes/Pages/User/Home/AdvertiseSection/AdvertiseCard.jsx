import { Link } from "react-router-dom";


const AdvertiseCard = ({ item }) => {
    const { propertyImage, propertyLocation, priceRange, status, propertyTitle } = item
    return (
        <div>
            <div className=" max-w-sm md:h-[500px] bg-white border-2 border-black rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl">
                <a href="#">
                    <img className="rounded-t-lg h-60" src={propertyImage} alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{propertyTitle}</h5>
                    </a>
                    <p className="text-gray-600 text-base mb-2 font-medium">Location: {propertyLocation}</p>
                    <p className="text-gray-600 text-base mb-2 font-medium">Verification Status: <span className="text-base font-medium text-green-500">{status}</span></p>
                    <div className="flex justify-between items-center mt-6">
                        <div className="">
                            <p className=" text-xl font-bold text-yellow-400 mb-2">Starting from ${priceRange}</p>
                        </div>
                        <div>
                            <Link to={`/propertyDetails/${item._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black btn btn-warning btn-md">
                                <span className="inline-flex items-center"> {/* Container for text and SVG */}
                                    <span className="mr-1">Details</span> {/* Margin to separate text and SVG */}
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdvertiseCard;