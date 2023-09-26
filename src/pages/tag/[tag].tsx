import PostItem from '@/components/PostItem';
import { fetchPostBySlug, fetchPosts } from '@/services/post-service';
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from 'next';
import { Inter } from 'next/font/google';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import SearchBox from '@/components/SearchBox';
import { useRouter } from "next/router";

const POSTS_BY_TAG: string = 'PostsByTag'

type Props = {
    tag: string
}

export default function PostByTag({tag} : Props) {

    const router = useRouter();

    const { i18n } = useTranslation('common');

    const tag2 = typeof router.query?.tag === "string" ? router.query.tag : "";


    const { data: post } = useQuery([POSTS_BY_TAG, tag], () => fetchPosts({tag}));

    return (
        <>
            <SearchBox />
            <main className={`flex min-h-screen flex-col items-center justify-between`}>

                <div className="mx-auto w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl flex justify-start items-start flex-wrap gap-2 px-3">
                    {
                        tag + ',' + tag2
                    }

                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const props = await serverSideTranslations(context.locale ?? 'id', ['common']);
    const tag = context.params?.tag as string;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [POSTS_BY_TAG, tag],
        queryFn: () => fetchPosts({tag}),
    })

    return {
        props: {
            tag,
            dehydratedState: dehydrate(queryClient),
            ...props
        },
    };
}