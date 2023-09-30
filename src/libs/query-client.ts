import { QueryClient } from "@tanstack/react-query";
import axiosInstance from "./axios";


export default new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: ({ queryKey }) =>
                axiosInstance
                    .get(queryKey.join('/'))
                    .then(({ data }) => data),
        },
    },
});
