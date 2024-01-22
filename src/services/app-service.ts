import blogApiClient from "@/libs/blog-api-client";
import { Url } from "@/types/sitemap-type";
import { RawAxiosRequestHeaders } from "axios";


export async function getSitemaps(userAgent: string) {
    const headers: RawAxiosRequestHeaders = {
        'Accept': 'application/json',
        'User-Agent': userAgent
    };

    return await blogApiClient.get<Url[]>(`/api/sitemaps`, { headers });
};

export async function getInfo(userAgent: string) {
    const headers: RawAxiosRequestHeaders = {
        'Accept': 'application/json',
        'User-Agent': userAgent
    };
    
    return await blogApiClient.get(`/`, { headers });
};