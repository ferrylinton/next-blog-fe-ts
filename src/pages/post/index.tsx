import PostItem from '@/components/PostItem';
import { fetchPosts } from '@/services/post-service';
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

const POSTS_KEY = 'postsx';

export default function PostPage() {

  const router = useRouter();

  const { i18n } = useTranslation('common');

  const { t } = i18n;

  const keyword = typeof router.query?.keyword === "string" ? router.query.keyword : '';

  const { data: pageable } = useQuery([POSTS_KEY], () => fetchPosts({ keyword }));


  return (
    <div className='w-full h-full grow flex justify-center items-start'>
      <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col'>
        {keyword && <div className='flex flex-col my-5 lowercase px-2 md:px-0 '>
          <div className='w-full flex justify-between gap-2 border-b border-gray-300'>
            <div className='text-base'>
              <span className='capitalize font-bold'>{t('keyword')} : </span> {keyword}
            </div>
            <div className='capitalize'>
              <span className='capitalize font-bold'>{t('total')} : </span> {pageable?.pagination.total}
            </div>
          </div>
        </div>}
        <div className="flex flex-col flex-wrap gap-2 px-2 md:px-0">
          {
            pageable && pageable.data.map((post, index) => <PostItem key={index} post={post} />)
          }
          {
            pageable && pageable.pagination.total === 0 &&
            <div className='border border-gray-300 p-3 text-center'>{t('dataIsEmpty')}</div>
          }
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const props = await serverSideTranslations(context.locale ?? 'id', ['common']);
  const keyword = context.params?.keyword as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [POSTS_KEY],
    queryFn: () => fetchPosts({ keyword }),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...props
    },
  };
}