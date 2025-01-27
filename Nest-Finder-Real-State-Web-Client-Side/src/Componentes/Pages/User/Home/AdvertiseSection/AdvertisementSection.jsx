
import AdvertiseCard from "./AdvertiseCard";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { HashLoader } from "react-spinners";


const AdvertisementSection = () => {
    const axiosSecure = useAxiosSecure();

    const { data: properties = [], isLoading, error } = useQuery({
        queryKey: ['verifiedProperties'],
        queryFn: async () => {
            const res = await axiosSecure.get('/verifiedProperties')
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="w-full flex items-center justify-center"><HashLoader className='text-yellow-400' /></div>
    }

    if (error) {
        return <div>Error loading properties</div>;
    }
    return (
        <div className="max-w-7xl mx-auto lg:space-y-10 space-y-5">
            <div className="text-center space-y-4">
                <h1 className="lg:text-5xl text-3xl font-bold">Advertisement Section</h1>
                <p className="lg:text-xl text-lg font-normal">Discover our featured properties and find your dream home today. Browse through the latest listings and take advantage of the best deals on the market.</p>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-items-center gap-4">
                {
                    properties.slice(0,4).map((item, index) => <AdvertiseCard key={index} item={item}></AdvertiseCard>)
                }
            </div>

        </div>
    );
};

export default AdvertisementSection;