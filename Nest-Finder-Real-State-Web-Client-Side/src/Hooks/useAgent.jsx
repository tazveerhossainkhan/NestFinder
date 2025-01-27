import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAgent = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: isAgent } = useQuery({
        queryKey: [user?.email, 'isAgent'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/agents?email=${user?.email}`)
            console.log(res.data)
            return res.data?.agent;
        }
    })

    return [isAgent]
};

export default useAgent;