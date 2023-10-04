import PagingInfo from '@/components/PagingInfo';
import PostList from '@/components/PostList';
import { getPostsServerSideProps } from '@/services/post-server-side-service';
import { fetchPosts } from '@/services/post-service';
import { useQuery } from "@tanstack/react-query";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';



export default function PostPage() {

  const router = useRouter();

  const [showLoader, setShowLoader] = useState(false);

  const page = parseInt(typeof router.query?.page === "string" ? router.query.page : '1');

  const keyword = router.query?.keyword as string;

  const tag = router.query?.tag as string;

  const queryKey = ['posts', page || 1, keyword || '', tag || ''];

  const { data: pageable, isLoading } = useQuery(queryKey,
    () => fetchPosts({ page, keyword, tag }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false
    });

  useEffect(() => {

    console.log('useEffect...');
    if (isLoading) {
      setShowLoader(true);
    } else {
      setTimeout(() => {
        setShowLoader(false);
      }, 200);
    }

  }, [isLoading]);

  return (
    <>
      {
        showLoader && <div className="z-[53] fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <div className="bg-gray-500 opacity-70 p-1 rounded-full shadow shadow-gray-900/50 border border-gray-600">
            <div style={{ "borderTopColor": "transparent" }}
              className="w-12 h-12 border-4 border-gray-50 border-dashed rounded-full animate-spin"></div>
          </div>
        </div>
      }
      <div className='w-full h-full grow flex flex-col justify-start items-center pt-[70px]'>
        <PagingInfo tag={tag} keyword={keyword} total={pageable?.pagination.total || 0} />
        <PostList tag={tag} keyword={keyword} pageable={pageable} />
      </div>
    </>
  )
}

export const getServerSideProps = getPostsServerSideProps;