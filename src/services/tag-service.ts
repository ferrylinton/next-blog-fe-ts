import { logger } from "@/configs/winston";
import blogApiClient from "@/libs/blog-api-client";
import { Tag } from "@/types/tag-type";
import { RawAxiosRequestHeaders } from "axios";


export async function getTags(clientIp: string, userAgent: string): Promise<Tag[]> {
    try {
        const headers: RawAxiosRequestHeaders = {
            'Accept': 'application/json',
            'x-client-ip': clientIp,
            'User-Agent': userAgent
        };
        const { data } = await blogApiClient.get<Array<Tag>>(`/api/tags`, { headers });
        return data;
    } catch (error) {
        logger.error(error);
        return []
    }
};