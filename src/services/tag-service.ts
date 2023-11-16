import { logger } from "@/configs/winston";
import blogApiClient from "@/libs/blog-api-client";
import { Tag } from "@/types/tag-type";


export async function getTags(): Promise<Tag[]> {
    try {
        const { data } = await blogApiClient.get<Array<Tag>>(`/api/tags`);
        return data;
    } catch (error) {
        logger.error(error);
        return []
    }
};