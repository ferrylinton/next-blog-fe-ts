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

const POST_BY_SLUG_KEY: string = 'PostBySlug'

type Props = {
    slug: string
}

export default function PostBySlug({ slug }: Props) {

    const router = useRouter();

    const { i18n } = useTranslation('common');

    const slug2 = typeof router.query?.slug === "string" ? router.query.slug : "";
    console.log(slug2)


    const { data: post } = useQuery([POST_BY_SLUG_KEY, slug], () => fetchPostBySlug(slug));

    return (
        <>
            <SearchBox />
            <main className={`flex min-h-screen flex-col items-center justify-between`}>

                <div className="mx-auto w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl flex justify-start items-start flex-wrap gap-2 px-3">
                    {
                        slug
                    }

                </div>
            </main>
        </>
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