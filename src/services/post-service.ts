import blogApiClient from "@/libs/blog-api-client";
import { markdownToHtml } from "@/libs/markdown";
import { Pageable } from "@/types/common-type";
import { Post } from "@/types/post-type";
import { RequestParams } from "@/types/request-params-type";



export async function getPosts(params?: RequestParams){
    return await blogApiClient.get<Pageable<Post>>(`/api/posts`, { params });
};

export async function getLatestPosts(){
    return await blogApiClient.get<Pageable<Post>>(`/api/posts/latest`);
};

export async function getPostBySlug(slug: string) {
    return await blogApiClient.get<Post>(`/api/posts/${slug}`);
};

