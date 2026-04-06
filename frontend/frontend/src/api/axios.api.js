import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
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