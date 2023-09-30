import { markdownToHtml } from '@/libs/markdown';
import { fetchPostBySlug } from '@/services/post-service';
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from "next/router";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react'

const POST_BY_SLUG_KEY: string = 'PostBySlug'

type Props = {
    slug: string
}

export default function PostBySlug({ slug }: Props) {

    const router = useRouter();

    const { i18n } = useTranslation('common');

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
    }, [])


    const { data: post } = useQuery([POST_BY_SLUG_KEY, slug], () => fetchPostBySlug(slug));

    return (
        <div className='w-full h-full grow flex justify-center items-start'>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col'>
                {isClient && post && <div className="w-full prose prose-neutral max-w-none"
                    dangerouslySetInnerHTML={{ __html: post?.content[i18n.language as keyof typeof post.content] }} />}
            </div>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const props = await serverSideTranslations(context.locale ?? 'id', ['common']);
    const slug = context.params?.slug as string;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [POST_BY_SLUG_KEY, slug],
        queryFn: () => fetchPostBySlug(slug),
    })

    return {
        props: {
            slug,
            dehydratedState: dehydrate(queryClient),
            ...props
        },
    };
}