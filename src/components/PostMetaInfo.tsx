import CalendarIcon from '@/icons/CalendarIcon';
import TagIcon from '@/icons/TagIcon';
import ViewedIcon from '@/icons/ViewedIcon';
import { Post } from '@/types/post-type';
import { getPostDate } from '@/utils/date-util';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

type Props = {
    post: Post
}

export default function PostMetaInfo({ post }: Props) {

    const router = useRouter();

    const { i18n } = useTranslation('common');

    const handleSelectTag = (tag: string) => {
        router.push(`/post?tag=${tag}`, undefined, { locale: i18n.language });
    }

    return (
        <div className='flex font-light text-[0.8rem] text-stone-500 uppercase'>
            <div className="flex flex-wrap justify-start items-center gap-4 leading-none py-1">
                <div className='flex items-end gap-1'>
                    <CalendarIcon className='w-[15px] h-[15px]' />
                    <span>{getPostDate(post)}</span>
                </div>
                {
                    post.tags.map(tag => {
                        return (<div key={tag} onClick={() => handleSelectTag(tag)} className='flex items-end gap-1 cursor-pointer'>
                            <TagIcon className='w-[15px] h-[15px]' />
                            <span>{tag}</span>
                        </div>)
                    })
                }
                {post.viewed && <div className='flex items-end gap-1'>
                    <ViewedIcon className='w-[15px] h-[15px]' />
                    <span>{post.viewed}</span>
                </div>}
            </div>
        </div>
    )
}
