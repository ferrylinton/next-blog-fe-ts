import PostItem from '@/components/PostItem';
import TagIcon from '@/icons/TagIcon';
import TagsIcon from '@/icons/TagsIcon';
import { fetchPosts } from '@/services/post-service';
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';


const POSTS_BY_TAG: string = 'PostsByTag'

export default function PostByTag() {

    const router = useRouter();

    const { i18n } = useTranslation('common');

    const { t } = i18n;

    const { data: pageable } = useQuery([POSTS_BY_TAG], () => fetchPosts());

    const tag = typeof router.query?.tag === "string" ? router.query.tag : '';

    return (
        <div className='w-full h-full grow flex justify-center items-start'>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col'>
                {
                    tag && <div className='flex justify-between my-5 px-2 md:px-0'>
                        <div className='flex justify-center items-center gap-2 py-2 px-4 bg-gray-600 text-sm text-white'>
                            <TagIcon className='w-[15px] h-[15px]' />
                            <span className='font-bold uppercase'>{t('tag')}</span>
                            <span className='font-bold uppercase'>: </span>
                            <span>{tag}</span>
                        </div>
                    </div>
                }
                <div className="flex flex-col flex-wrap gap-2 px-2 md:px-0">
                    {
                        pageable && pageable.data.map((post, index) => <PostItem key={index} post={post} />)
                    }
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const props = await serverSideTranslations(context.locale ?? 'id', ['common']);
    const tag = context.params?.tag as string;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [POSTS_BY_TAG, tag],
        queryFn: () => fetchPosts({ tag }),
    })

    return {
        props: {
            tag,
            dehydratedState: dehydrate(queryClient),
            ...props
        },
    };
}