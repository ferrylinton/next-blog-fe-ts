import blogApiClient from "@/libs/blog-api-client";
import { Url } from "@/types/sitemap-type";


export async function getSitemaps() {
    return await blogApiClient.get<Url[]>(`/api/sitemaps`);
};