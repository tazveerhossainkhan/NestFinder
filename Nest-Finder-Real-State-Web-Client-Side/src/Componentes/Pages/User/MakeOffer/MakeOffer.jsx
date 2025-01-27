import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const MakeOffer = () => {

    const loadedData = useLoaderData()
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async data => {
        const property = {
            propertyTitle: loadedData.propertyTitle,
            propertyLocation: loadedData.propertyLocation,
            propertyImage: loadedData.propertyImage,
            agentName: loadedData.agentName,
            agentEmail: loadedData.agentEmail,
            offeredAmount: parseInt(data.offeredAmount),
            buyerEmail: user?.email,
            buyerName: user?.displayName,
            buyingDate: data.buyingDate,
            offerStatus: 'pending',
            propertyId: loadedData?.porpertyId
        }
        console.log(property)
        if (parseInt(data.offeredAmount) < loadedData?.priceRange) {
            Swal.fire({
                title: 'Offer Not Submitted',
                text: 'Your Offer Price should be at least equal to Agents Price Range',
                icon: 'error'
            });

        }
        else {
            const res = await axiosSecure.post('/requested', property)
            if (res.data.insertedId) {
                Swal.fire({
                    title: 'Offer Submitted',
                    text: 'Your offer has been successfully submitted!',
                    icon: 'success'
                });
            }

        }


    };


    

    return (
        <div className="lg:mx-36 lg:mt-10 p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-4">Make an Offer</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">Property Title</label>
                    <input
                        type="text"
                        readOnly {...register('propertyTitle')}
                        defaultValue={loadedData.propertyTitle} disabled
                        className="w-full mt-2 p-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Property Location</label>
                    <input
                        type="text"
                        readOnly {...register('propertyLocation')}
                        value={loadedData.propertyLocation} disabled
                        className="w-full mt-2 p-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Property Image</label>
                    <input
                        type="text"
                        readOnly {...register('propertyImage')}
                        value={loadedData.propertyImage} disabled
                        className="w-full mt-2 p-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Agent Name</label>
                    <input
                        type="text"
                        readOnly {...register('agentName')}
                        defaultValue={loadedData?.agentName} disabled
                        className="w-full mt-2 p-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Offered Amount</label>
                    <input
                        type="number"
                        {...register("offeredAmount", { required: true, min: loadedData?.priceRange[0], max: loadedData?.priceRange[1] })}
                        className="w-full mt-2 p-2 border rounded-lg" required placeholder={`Starting from $${loadedData.priceRange}`}
                    />
                    {errors.offeredAmount && <span className="text-red-500">Amount must be within the price range</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Buyer Email</label>
                    <input
                        type="email"
                        readOnly {...register('buyerEmail')}
                        value={user?.email} disabled
                        className="w-full mt-2 p-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Buyer Name</label>
                    <input
                        type="text"
                        readOnly {...register('buyerName')}
                        value={user?.displayName} disabled
                        className="w-full mt-2 p-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Buying Date</label>
                    <input
                        type="date"
                        {...register("buyingDate", { required: true })} required
                        className="w-full mt-2 p-2 border rounded-lg"
                    />
                </div>

                <button type="submit" className="bg-yellow-400 font-medium hover:border-2 hover:border-yellow-400 hover:bg-white text-black px-4 py-2 rounded-lg">
                    Submit Offer
                </button>
            </form>
        </div>
    );
};

export default MakeOffer;
