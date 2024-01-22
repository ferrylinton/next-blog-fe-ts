import blogApiClient from "@/libs/blog-api-client";
import { Pageable } from "@/types/common-type";
import { Post } from "@/types/post-type";
import { RequestParams } from "@/types/request-params-type";
import { RawAxiosRequestHeaders } from "axios";



export async function getPosts(clientIp: string, userAgent: string, params?: RequestParams) {
    const headers: RawAxiosRequestHeaders = {
        'Accept': 'application/json',
        'x-client-ip': clientIp,
        'User-Agent': userAgent
    };

    return await blogApiClient.get<Pageable<Post>>(`/api/posts`, { params, headers });
};

export async function getLatestPosts(clientIp: string, userAgent: string) {
    const headers: RawAxiosRequestHeaders = {
        'Accept': 'application/json',
        'x-client-ip': clientIp,
        'User-Agent': userAgent
    };

    return await blogApiClient.get<Pageable<Post>>(`/api/posts/latest`, { headers });
};

export async function getPostBySlug(slug: string, clientIp: string, userAgent: string) {
    const headers: RawAxiosRequestHeaders = {
        'Accept': 'application/json',
        'x-client-ip': clientIp,
        'User-Agent': userAgent
    };

    return await blogApiClient.get<Post>(`/api/posts/${slug}`, { headers });
};

