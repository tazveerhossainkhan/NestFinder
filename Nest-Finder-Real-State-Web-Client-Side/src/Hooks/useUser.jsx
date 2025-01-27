import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: collectUser = {} } = useQuery({
    queryKey: [user?.email, "collectUser"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/collectUser/${user?.email}`);
      return res.data;
    },
  });

  return collectUser;
};

export default useUser;
