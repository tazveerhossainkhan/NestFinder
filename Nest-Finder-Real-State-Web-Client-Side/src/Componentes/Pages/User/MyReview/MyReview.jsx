import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MyReviewCard from "./MyReviewCard";


const MyReview = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { data: properties = [] } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myReviews?email=${user?.email}`);
            return res.data;
        }
    });
    console.log(properties)

    return (
        <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-4">
                <h1 className="lg:text-5xl text-3xl font-bold">Your Property Reviews</h1>
                <p className="lg:text-xl text-lg font-normal">Hear what our satisfied clients have to say about their experiences. Read the latest reviews and testimonials from our happy homeowners.</p>
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 justify-items-center gap-8">
                {
                    properties.map((item, index) => <MyReviewCard key={index} item={item}></MyReviewCard>)
                }
            </div>


        </div>
    );
};

export default MyReview;
