import { Post } from '@/types/post-type'
import { format } from 'date-fns'
import Link from 'next/link'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import CalendarIcon from '@/icons/CalendarIcon';
import TagIcon from '@/icons/TagIcon';

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
        router.push(`/tag/${tag}`, undefined, { locale: i18n.language });
    }

    const getDate = ({ createdAt, updatedAt }: Post) => {
        if (updatedAt && updatedAt > createdAt) {
            return format(new Date(updatedAt), 'MM/dd/yyyy');
        } else {
            return format(new Date(createdAt), 'MM/dd/yyyy');
        }
    }

    return (
        <article className="w-full mb-4 bg-white flex flex-col justify-start p-2 border border-gray-200 transition-colors  hover:bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50">
            <div className='flex flex-col p-2'>
                <div className='group flex flex-col'>
                    <Link href={`/post/${post.slug}`} className='mb-3 text-lg md:text-xl font-semibold cursor-pointer'>
                        {post.title[i18n.language as keyof typeof post.description]}{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </Link>
                    <p className='cursor-pointer' onClick={() => handleSelectPost('/post/${post.slug}')}>{post.description[i18n.language as keyof typeof post.description]}</p>
                    <div className='flex gap-3 text-sm uppercase mt-2'>
                        <div className="flex justify-center items-center gap-1 leading-none py-1 border-b border-gray-400 ">
                            <CalendarIcon className='w-[15px] h-[15px]' />
                            <span>{getDate(post)}</span>
                        </div>
                        <div className='flex gap-3'>
                            {
                                post.tags.map(tag => {
                                    return (<div key={tag} onClick={() => handleSelectTag(tag)} className='flex justify-center items-center gap-1 leading-none py-1 border-b border-gray-400 cursor-pointer'>
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
