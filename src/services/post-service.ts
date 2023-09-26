import axios from "@/libs/axios";
import { Pageable } from "@/types/common-type";
import { Post } from "@/types/post-type";

type RequestParams = {
    tag?: string,
    keyword?: string,
    page?: number
}


export async function fetchPosts(params?: RequestParams): Promise<Pageable<Post>> {
    return await axios.get<Pageable<Post>>(`/api/posts`, { params }).then(({ data }) => data)
};

export async function fetchPostBySlug(slug: string): Promise<Post> {
    return await axios.get<Post>(`/api/posts?slug=${slug}`).then(({ data }) => data)
};

