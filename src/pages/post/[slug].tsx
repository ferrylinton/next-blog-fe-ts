import NotFound from '@/components/NotFound';
import PostMetaInfo from '@/components/PostMetaInfo';
import { markdownToHtml } from '@/libs/markdown';
import { getPostBySlug } from '@/services/post-service';
import { withCommonData } from '@/services/wrapper-service';
import { Post } from '@/types/post-type';
import { MessageError } from '@/types/response-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';


type Props = {
    post?: Post,
    messageError?: MessageError
}

export default function PostBySlug({ post, messageError }: Props) {

    const router = useRouter();

    const { i18n } = useTranslation('common');

    return (
        <>
            <Head>
                <title>{post?.title[i18n.language as keyof typeof post.title]}</title>
                <meta name="description" content={post?.description[i18n.language as keyof typeof post.description]} />
                <meta name="author" content={post?.createdBy} />
            </Head>
            <div className='w-full h-full grow flex justify-center items-start px-2 pt-[70px] pb-5'>
                <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col'>
                    {post &&
                        <div>
                            <div className='my-4'>
                                <PostMetaInfo post={post} />
                            </div>
                            <div
                                className="markdown"
                                dangerouslySetInnerHTML={{ __html: post.content[i18n.language as keyof typeof post.content] }} />
                        </div>
                    }
                    {!post && !messageError && <NotFound slug={router.query.slug} />}
                    {messageError && <div className="w-full bg-red-700 px-4 py-3 mb-8 text-sm flex flex-col text-white capitalize">{messageError.message}</div>}
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = withCommonData(async (context: GetServerSidePropsContext) => {
    const slug = context.params?.slug as string;
    const { data: post } = await getPostBySlug(slug);

    if (post) {
        post.content.en = markdownToHtml(post.content.en);
        post.content.id = markdownToHtml(post.content.id);

        return {
            props: {
                post
            },
        };
    } else {
        return {
            props: {}
        };
    }

})

