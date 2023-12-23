import Banner from '@/components/Banner';
import PostItem from '@/components/PostItem';
import PostIcon from '@/icons/PostIcon';
import { getLatestPosts } from '@/services/post-service';
import { withCommonData } from '@/services/wrapper-service';
import { Post } from '@/types/post-type';
import { MessageError } from '@/types/response-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';


type Props = {
  posts?: Post[],
  messageError?: MessageError
}

export default function HomePage({ posts, messageError }: Props) {

  const { t } = useTranslation('common');

  return (
    <div className='w-full h-full grow flex flex-col justify-start items-center'>
      <Banner />
      <div className={`w-full px-2 pb-5 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col`}>
        <div className='flex justify-start items-center gap-2 pb-2 my-5 border-b-4 border-lime-500'>
          <PostIcon className='w-[20px] h-[20px] font-bold' />
          <span className='text-xl'>{t('recentBlogPosts')}</span>
        </div>
        <div className="flex flex-col flex-wrap gap-1">
          {posts && posts.map((post, index) => <PostItem key={index} post={post} />)}
          {messageError && <div className="w-full bg-red-700 px-4 py-3 mb-8 text-sm flex flex-col text-white capitalize">{messageError.message}</div>}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = withCommonData(async () => {
  const { data: posts } = await getLatestPosts();

  return {
    props: {
      posts
    },
  }

})