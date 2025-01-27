/* import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const usePropertyMutation = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const verifyPropertyMutation = useMutation(
        async (propertyId) => {
            await axiosSecure.post(`/verifyProperty/${propertyId}`);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('allProperties');
            },
        }
    );

    const rejectPropertyMutation = useMutation(
        async (propertyId) => {
            await axiosSecure.post(`/rejectProperty/${propertyId}`);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('allProperties');
            },
        }
    );

    return { verifyPropertyMutation, rejectPropertyMutation };
};

export default usePropertyMutation; */
