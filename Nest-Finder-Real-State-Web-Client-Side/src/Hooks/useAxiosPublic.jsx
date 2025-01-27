import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://nest-finder-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;