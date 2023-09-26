import PostItem from '@/components/PostItem';
import SearchBox from '@/components/SearchBox';
import { fetchPosts } from '@/services/post-service';
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const POSTS_KEY = 'POSTS_INDEX';

export default function HomePage() {

  const { i18n } = useTranslation('common');

  const { data: pageable } = useQuery([POSTS_KEY], () => fetchPosts());

  return (
    <>
      <SearchBox />
      <main className={`flex min-h-screen flex-col items-center justify-between`}>

        <div className="mx-auto w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl flex justify-start items-start flex-wrap gap-2 px-3">
          {
            pageable && pageable.data.map((post, index) => <PostItem key={index} post={post} />)
          }

        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const props = await serverSideTranslations(context.locale ?? 'id', ['common'])
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [POSTS_KEY],
    queryFn: () => fetchPosts(),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...props
    },
  };
}