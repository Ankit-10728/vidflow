import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        toast.error(
            error.response?.data?.message || "Something went wrong"
        );
        return Promise.reject(error);
    }
);


export default api