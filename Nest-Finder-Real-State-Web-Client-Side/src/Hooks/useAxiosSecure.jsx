import axios from "axios";


const axiosSecure = axios.create({
    baseURL:'https://nest-finder-server.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;