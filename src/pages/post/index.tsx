import PagingInfo from '@/components/PagingInfo';
import PostList from '@/components/PostList';
import { isValidPage } from '@/libs/paging-util';
import { getPosts } from '@/services/post-service';
import { withCommonData } from '@/services/wrapper-service';
import { Pageable } from '@/types/common-type';
import { Post } from '@/types/post-type';
import { RequestParams } from '@/types/request-params-type';
import { MessageError } from '@/types/response-type';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

type Props = {
  pageable?: Pageable<Post>,
  messageError?: MessageError
}

export default function PostPage({ pageable, messageError }: Props) {

  const router = useRouter();

  const keyword = router.query?.keyword as string;

  const tag = router.query?.tag as string;

  return (
    <>
      <div className='w-full h-full grow flex flex-col justify-start items-center pt-[70px] px-2 pb-5'>
        <PagingInfo tag={tag} keyword={keyword} total={pageable?.pagination.total || 0} />
        <PostList pageable={pageable} />
        {messageError && <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center'><div className="w-full bg-red-700 px-4 py-3 mb-8 text-sm flex flex-col text-white capitalize">{messageError.message}</div></div>}
      </div>
    </>
  )
}

export const getServerSideProps = withCommonData(async (context: GetServerSidePropsContext) => {
  const { page, keyword, tag, destination } = getRequestParams(context);

  if (destination) {
      return {
          redirect: {
              destination: destination,
              permanent: false,
          },
      }
  }

  const { data: pageable } = await getPosts({ page, keyword, tag });

  return {
      props: {
          pageable
      }
  }
})

function getRequestParams(context: GetServerSidePropsContext) {
  const locale = context.locale ?? 'id';
  const requestParams: RequestParams = { page: 1 };

  if (context.query?.tag && context.query.tag.length > 2) {
      requestParams.tag = context.query.tag as string
  }

  if (context.query?.keyword && context.query?.keyword.length > 2) {
      requestParams.keyword = context.query?.keyword as string
  }

  if (context.query.page && !isValidPage(context.query.page as string)) {
      requestParams.destination = (locale === 'id' ? '' : '/' + locale)
          + (context.resolvedUrl.split("?")[0] + '?page=1')
          + (context.query?.keyword ? '&keyword=' + context.query?.keyword : '');
  }

  requestParams.page = (context.query.page && isValidPage(context.query.page as string)) ? parseInt(context.query.page as string) : 1;
  return requestParams;
}