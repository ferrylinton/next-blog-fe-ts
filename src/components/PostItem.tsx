import CalendarIcon from '@/icons/CalendarIcon';
import TagIcon from '@/icons/TagIcon';
import { Post } from '@/types/post-type';
import { getPostDate } from '@/utils/date-util';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
    post: Post
}

export default function PostItem({ post }: Props) {

    const router = useRouter();

    const { i18n } = useTranslation('common');

    const handleSelectPost = (url: string) => {
        router.push(url, undefined, { locale: i18n.language });
    }

    const handleSelectTag = (tag: string) => {
        router.push(`/post?tag=${tag}`, undefined, { locale: i18n.language });
    }

    return (
        <article className="w-full mb-2 bg-white flex flex-col justify-start p-2 border border-stone-200 transition-colors hover:text-lime-900 hover:bg-gradient-to-b from-lime-50 via-lime-100 to-lime-200">
            <div className='flex flex-col p-2'>
                <div className='group flex flex-col'>
                    <Link href={`/post/${post.slug}`} className='mb-3 text-lg md:text-xl font-semibold cursor-pointer'>
                        {post.title[i18n.language as keyof typeof post.description]}{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </Link>
                    <p className='cursor-pointer' onClick={() => handleSelectPost(`/post/${post.slug}`)}>{post.description[i18n.language as keyof typeof post.description]}</p>
                    <div className='flex gap-3 text-sm uppercase mt-2'>
                        <div className="flex justify-center items-center gap-1 leading-none py-1 border-b border-stone-400 ">
                            <CalendarIcon className='w-[15px] h-[15px]' />
                            <span>{getPostDate(post)}</span>
                        </div>
                        <div className='flex gap-3'>
                            {
                                post.tags.map(tag => {
                                    return (<div key={tag} onClick={() => handleSelectTag(tag)} className='flex justify-center items-center gap-1 leading-none py-1 border-b border-stone-400 cursor-pointer'>
                                        <TagIcon className='w-[15px] h-[15px]' />
                                        <span>{tag}</span>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        </article>
    )
}
