import { Post } from '@/types/post-type'
import { format } from 'date-fns'
import Link from 'next/link'
import { useTranslation } from 'next-i18next';

type Props = {
    post: Post
}

export default function PostItem({ post }: Props) {

    const { i18n } = useTranslation('common');

    const getDate = ({ createdAt, updatedAt }: Post) => {
        if (updatedAt && updatedAt > createdAt) {
            return format(new Date(updatedAt), 'MM/dd/yyyy');
        } else {
            return format(new Date(createdAt), 'MM/dd/yyyy');
        }
    }

    return (
        <article className="w-full shadow mb-4 bg-white flex flex-col justify-start p-2 rounded">
            <div className='flex flex-col p-2'>
                <div className='grow flex flex-col'>
                    <div className='flex text-xs uppercase'>
                        {
                            post.tags.map(tag => {
                                return <Link key={tag} href={`/tag/${tag}`} className="text-slate-600 hover:text-slate-800 hover:font-bold pe-2">{tag}</Link>
                            })
                        }
                    </div>
                    <Link href={`/post/${post.slug}`} className="text-lg font-bold hover:text-gray-700 py-4">{post.title[i18n.language as keyof typeof post.description]}</Link>
                    <div className="text-sm pb-3">{getDate(post)}</div>
                    <div className="pb-6">{post.description[i18n.language as keyof typeof post.description]}</div>
                </div>
                <Link href={`/post/${post.slug}`} className="flex-none uppercase text-gray-800 hover:text-black">Continue Reading <i className="fas fa-arrow-right"></i></Link>
            </div>
        </article>
    )
}
