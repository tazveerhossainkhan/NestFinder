
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useUser from "../../../../Hooks/useUser";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`

const AddProperty = () => {

    const collectUser = useUser();

    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure(); 
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        try {
            // console.log(data);

            // Create a FormData object
            const formData = new FormData();
            formData.append('image', data.propertyImage[0]); // assuming data.propertyImage is a FileList

            // Upload image to imgbb and get a URL
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const property = { agentName: collectUser?.name, agentEmail: collectUser?.email, agentImage: collectUser?.photoURL, priceRange: parseInt(data.priceRange), propertyTitle: data.propertyTitle, propertyLocation: data.propertyLocation, propertyImage: res.data.data.display_url , status:'pending'}


            const result = await axiosSecure.post('/properties', property)
            if (result.data.insertedId) {
                Swal.fire({
                    // position: "top-end",
                    icon: "success",
                    title: "Property Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error uploading image:', error.response ? error.response.data : error.message);
        }

    };

    if (!collectUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="lg:mx-36 lg:mt-10 min-h-screen bg-white flex flex-col-reverse lg:gap-0 gap-4 lg:flex-row  items-center lg:py-10 py-4">
            {/* Add Property Form Section */}
            <div className="w-full lg:w-1/2 px-5">
                <div className="bg-white shadow-md shadow-stone-700 rounded-lg p-6">
                    <h2 className="text-4xl font-bold mb-10 text-center text-gray-900">Add Property</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="form-group">
                            <label htmlFor="propertyTitle" className="block mb-2 text-lg text-gray-700">Property Title</label>
                            <input  {...register("propertyTitle")} type="text" id="propertyTitle" className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-black focus:outline-none" placeholder="Title of your property" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="propertyLocation" className="block mb-2 text-lg text-gray-700">Property Location</label>
                            <input {...register("propertyLocation")} type="text" id="propertyLocation" className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-black focus:outline-none" placeholder="Property location" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="propertyImage" className="block mb-2 text-lg text-gray-700">Property Image</label>
                            <input {...register("propertyImage")} type="file" id="propertyImage" className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-black focus:outline-none" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="priceRange" className="block mb-2 text-lg text-gray-700">Price Range</label>
                            <input {...register("priceRange")} type="text" id="priceRange" className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-black focus:outline-none" placeholder="$300,000 - $350,000" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="agentName" className="block mb-2 text-lg text-gray-700">Agent Name</label>
                            <input {...register("agentName")} defaultValue={collectUser?.name} type="text" id="agentName" disabled className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-black focus:outline-none" placeholder={collectUser.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="agentEmail" className="block mb-2 text-lg text-gray-700">Agent Email</label>
                            <input {...register("agentEmail")} type="text" defaultValue={collectUser?.email} disabled id="agentEmail" className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-black focus:outline-none" placeholder={collectUser.email} />
                        </div>
                        <button type="submit" className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">Add Property</button>
                    </form>
                </div>
            </div>

            {/* Promotional Banner Section */}
            <div className="w-full lg:w-1/2 px-5 mt-10 lg:mt-0 relative">
                <div className="bg-gray-900 text-white p-10 rounded-lg flex flex-col items-center justify-center">
                    <img src="https://i.ibb.co/mbkqF31/mikita-yo-Hup-Lwltb-W3k-unsplash.jpg" alt="Promotional Banner" className="w-full rounded-md shadow-md" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <h2 className="text-4xl font-bold mb-4">List Your Property</h2>
                        <p className="mb-8">Add your property to our platform to reach potential buyers and sell faster. List your property today and get started on your selling journey.</p>
                        <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProperty;
