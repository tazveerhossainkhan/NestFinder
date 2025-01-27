import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";

const PropertyDetails = () => {
    const loadedData = useLoaderData();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const reviewData = {
            propertyId: loadedData._id,
            propertyTitle: loadedData.propertyTitle,
            propertyImage: loadedData.propertyImage,
            priceRange: loadedData.priceRange,
            status: loadedData.status,
            userEmail: user?.email,
            userName: user?.displayName,
            userImage: user?.photoURL,
            review: data.review,
            reviewDate: data.reviewDate
        };
        const res = await axiosSecure.post('/reviews', reviewData);
        if (res.data.insertedId) {
            Swal.fire({
                icon: "success",
                title: "Review Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }

        console.log(reviewData)
    };


    return (
        <div className="lg:mx-36 lg:mt-10 p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-4">Add a Review</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">Property Title</label>
                        <input
                            type="text"
                            readOnly {...register('propertyTitle')}
                            defaultValue={loadedData.propertyTitle} disabled
                            className="w-full mt-2 p-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Property Location</label>
                        <input
                            type="text"
                            readOnly {...register('propertyLocation')}
                            value={loadedData.propertyLocation} disabled
                            className="w-full mt-2 p-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Property Image</label>
                        <input
                            type="text"
                            readOnly {...register('propertyImage')}
                            value={loadedData.propertyImage} disabled
                            className="w-full mt-2 p-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Agent Name</label>
                        <input
                            type="text"
                            readOnly {...register('agentName')}
                            defaultValue={loadedData?.agentName} disabled
                            className="w-full mt-2 p-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Agent Email</label>
                        <input
                            type="text"
                            readOnly {...register('agentEmail')}
                            defaultValue={loadedData?.agentEmail} disabled
                            className="w-full mt-2 p-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Reviewer Email</label>
                        <input
                            type="email"
                            readOnly {...register('reviewerEmail')}
                            value={user?.email} disabled
                            className="w-full mt-2 p-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Reviewer Name</label>
                        <input
                            type="text"
                            readOnly {...register('reviewerName')}
                            value={user?.displayName} disabled
                            className="w-full mt-2 p-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Review Date</label>
                        <input
                            type="date"
                            {...register("reviewDate", { required: true })} required
                            className="w-full mt-2 p-2 border rounded-lg"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Reviewer Image</label>
                    <input
                        type="text"
                        readOnly {...register('reviewerName')}
                        value={user?.photoURL} disabled
                        className="w-full mt-2 p-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Your Review</label>
                    <textarea
                        {...register("review", { required: true })}
                        className="w-full mt-2 p-2 border rounded-lg"
                        rows="4"
                        placeholder="Write your review here..."
                    ></textarea>
                    {errors.review && <span className="text-red-500">This field is required</span>}
                </div>


                <button type="submit" className="bg-yellow-400 font-medium hover:border-2 hover:border-yellow-400 hover:bg-white text-black px-4 py-2 rounded-lg">
                    Add Review
                </button>
            </form>
        </div>
    );
};

export default PropertyDetails;
