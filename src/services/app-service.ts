import blogApiClient from "@/libs/blog-api-client";
import { Url } from "@/types/sitemap-type";
import { RawAxiosRequestHeaders } from "axios";


export async function getSitemaps(clientIp: string, userAgent: string) {
    const headers: RawAxiosRequestHeaders = {
        'Accept': 'application/json',
        'x-client-ip': clientIp,
        'User-Agent': userAgent
    };

    return await blogApiClient.get<Url[]>(`/api/sitemaps`, { headers });
};

export async function getInfo(clientIp: string, userAgent: string) {
    const headers: RawAxiosRequestHeaders = {
        'Accept': 'application/json',
        'x-client-ip': clientIp,
        'User-Agent': userAgent
    };

    return await blogApiClient.get(`/`, { headers });
};