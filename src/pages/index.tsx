import Banner from '@/components/Banner';
import PostItem from '@/components/PostItem';
import { fetchPosts } from '@/services/post-service';
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';


const POSTS_KEY = 'POSTS_INDEX';

export default function HomePage() {

  const router = useRouter();

  const { i18n } = useTranslation('common');

  const { data: pageable } = useQuery([POSTS_KEY], () => fetchPosts());

  return (
    <div className='w-full h-full grow flex justify-center items-start'>
      <div className={`w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col`}>
        <Banner />
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