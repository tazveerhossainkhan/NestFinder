import { Link, useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import ShowReviewinDetails from "./ShowReviewinDetails";

const PropertyDetails = () => {
    const loadedData = useLoaderData()
    const { user } = useAuth()





    const { _id, propertyTitle, propertyImage, priceRange, agentName, agentEmail, propertyLocation, status } = loadedData

    // console.log(loadedData)

    const axiosSecure = useAxiosSecure();
    const { data: properties = []  } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/getReviews/${_id}`);
            return res.data;
        }
    });
    // console.log(properties)





    const handleWishlist = async () => {

        const wishlist = { propertyTitle, status, propertyImage, priceRange, agentName, agentEmail, propertyLocation, porpertyId: _id, email: user?.email, name: user?.displayName }
        const res = await axiosSecure.post('/wishlist', wishlist)
        if (res.data.insertedId) {
            Swal.fire({
                // position: "top-end",
                icon: "success",
                title: "Wishlist Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
        console.log(wishlist)
    }

    return (
        <div className="lg:mx-32 grid md:grid-cols-12 grid-cols-1 gap-10 p-4">
            <div className="col-span-8">
                {/* Property Details Content */}
                <div className="">
                    {/* Property Image */}
                    <div className="mb-8">
                        <img src={propertyImage} alt="Property" className="w-full h-96 rounded-lg" />
                    </div>
                    <div className="mb-8">
                        <h2 className="text-3xl font-semibold mb-4">{propertyTitle}</h2>
                        <p className="text-xl font-normal mb-4">{propertyLocation}</p>
                        <p className="text-xl text-yellow-400  w-1/3 font-bold mb-4">Starting from ${priceRange}</p>
                    </div>

                    {/* Property Description */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Property Description</h2>
                        <p>Welcome to this charming 3-bedroom, 2-bathroom home nestled in the heart of a peaceful suburban neighborhood. This tastefully designed residence boasts an open floor plan with ample natural light, creating a warm and inviting atmosphere. The spacious living area features hardwood floors and a cozy fireplace, perfect for relaxing or entertaining guests. The kitchen is equipped with modern appliances, granite countertops, and plenty of storage space. Retreat to the serene master suite with a private en-suite bathroom and walk-in closet. Outside, enjoy the beautifully landscaped backyard oasis, complete with a covered patio, lush greenery, and a sparkling pool, ideal for summer gatherings and outdoor enjoyment. Conveniently located near schools, parks, shopping, and dining options, this home offers the perfect blend of comfort, convenience, and style. Dont miss out on this wonderful opportunity to make this your dream home!</p>
                    </div>

                    {/* Reviews Section */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                        {/* from here review card should start */}
                        <div className="grid grid-cols-1 gap-5 mb-4">
                            {
                                properties.map((item, index) => <ShowReviewinDetails key={index} item={item}></ShowReviewinDetails>)
                            }
                        </div>


                        <Link to={`/dashboard/addReview/${loadedData._id}`}><button className="rounded-lg bg-yellow-400 p-4 font-semibold text-xl text-black hover:text-black hover:bg-white hover:border-2 hover:border-yellow-400">Add Review</button>
                        </Link>

                    </div>
                </div>

            </div>

            <div className="col-span-4 text-center flex flex-col gap-10">

                <div className="bg-yellow-400 h-96 py-8 rounded-lg">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Agent Information</h2>
                        <div className="border-2 border-black"></div>

                        <div className="flex flex-col items-center">
                            <h2 className="lg:text-3xl text-xl font-semibold mb-4">{agentName}</h2>
                            <p className="lg:text-xl text-lg font-normal mb-4">{agentEmail}</p>
                        </div>
                    </div>
                </div>

                <button onClick={() => handleWishlist()} className="rounded-lg bg-yellow-400 p-4 font-semibold text-xl text-black hover:text-black hover:bg-white hover:border-2 hover:border-yellow-400">Wishlist</button>

            </div>
        </div>
    );
};

export default PropertyDetails;
