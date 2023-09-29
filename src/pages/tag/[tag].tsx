import PostItem from '@/components/PostItem';
import { fetchPosts } from '@/services/post-service';
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from "next/router";
import { useTranslation } from 'react-i18next';


const POSTS_BY_TAG: string = 'PostsByTag'

export default function PostByTag() {

    const router = useRouter();

    const { i18n } = useTranslation('common');

    const { t } = i18n;

    const { data: pageable } = useQuery([POSTS_BY_TAG], () => fetchPosts());

    const tag = typeof router.query?.tag === "string" ? router.query.tag : '';

    return (
        <main className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col'>
            {tag && <div className='flex flex-col my-5 lowercase px-2 md:px-0 '>
                <div className='w-full flex justify-between gap-2 border-b border-gray-300'>
                    <div className='text-lg'>
                        <span className='capitalize font-bold'>{t('tag')} :</span> {tag}
                    </div>
                </div>
            </div>}
            <div className="flex flex-col flex-wrap gap-2 px-2 md:px-0">
                {
                    pageable && pageable.data.map((post, index) => <PostItem key={index} post={post} />)
                }
            </div>
        </main>
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