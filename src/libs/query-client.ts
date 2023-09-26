import { QueryClient } from "@tanstack/react-query";
import axiosInstance from "./axios";

const pathSeparator = "/";

export default new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: ({ queryKey }) =>
                axiosInstance
                    .get(queryKey.join(pathSeparator))
                    .then(({ data }) => data),
        },
    },
});
