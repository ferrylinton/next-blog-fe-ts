import { markdownToHtml } from '@/libs/markdown';
import { fetchPostBySlug } from '@/services/post-service';
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react'
import CalendarIcon from '@/icons/CalendarIcon';
import { getPostDate } from '@/utils/date-util';
import TagIcon from '@/icons/TagIcon';

const POST_BY_SLUG_KEY: string = 'PostBySlug'

type Props = {
    slug: string
}

export default function PostBySlug({ slug }: Props) {

    const router = useRouter();

    const { i18n } = useTranslation('common');

    const [isClient, setIsClient] = useState(false);

    const handleSelectTag = (tag: string) => {
        router.push(`/tag/${tag}`, undefined, { locale: i18n.language });
    }

    useEffect(() => {
        setIsClient(true)
    }, [])


    const { data: post } = useQuery([POST_BY_SLUG_KEY, slug], () => fetchPostBySlug(slug));

    return (
        <div className='w-full h-full grow flex justify-center items-start px-3 py-4 md:px-0'>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col'>
                {isClient && post &&
                    <div>
                        <div className='flex gap-3 text-sm uppercase mb-5'>
                            <div className="flex justify-center items-center gap-1 leading-none py-1 border-b border-gray-400 ">
                                <CalendarIcon className='w-[15px] h-[15px]' />
                                <span>{getPostDate(post)}</span>
                            </div>
                            <div className='flex gap-3'>
                                {
                                    post.tags.map(tag => {
                                        return (<div key={tag} onClick={() => handleSelectTag(tag)} className='flex justify-center items-center gap-1 leading-none py-1 border-b border-gray-400 cursor-pointer'>
                                            <TagIcon className='w-[15px] h-[15px]' />
                                            <span>{tag}</span>
                                        </div>)
                                    })
                                }
                            </div>
                        </div>
                        <div className="markdown"
                            dangerouslySetInnerHTML={{ __html: post?.content[i18n.language as keyof typeof post.content] }} />
                    </div>
                }
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