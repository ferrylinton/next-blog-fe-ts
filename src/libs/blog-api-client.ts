import axios from "axios";

const blogApiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
    headers: {
        "Content-type": "application/json",
    },
    timeout: 15000,
    validateStatus: function (status) {
        return (status >= 200 && status < 300) || status === 400 || status === 409;
    }
});

export default blogApiClient;