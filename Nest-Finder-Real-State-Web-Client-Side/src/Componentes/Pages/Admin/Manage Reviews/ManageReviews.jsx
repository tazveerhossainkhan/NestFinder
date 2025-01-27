import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import ManageReviewCard from "./ManageReviewCard";
// import ManageReviewCard from "./ManageReviewCard";

const ManageReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { data: properties = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allReviews');
            return res.data;
        }
    });
    console.log(properties)
    
    return (
        <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-4">
                <h1 className="lg:text-5xl text-3xl font-bold">All User Review</h1>
                <p className="lg:text-xl text-lg font-normal">Hear what our satisfied clients have to say about their experiences. Read the latest reviews and testimonials from our happy homeowners.</p>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 justify-items-center gap-8">
                {
                    properties.map((item, index) => <ManageReviewCard key={index} item={item}></ManageReviewCard>)
                }
            </div>
        </div>
    );
};

export default ManageReviews;