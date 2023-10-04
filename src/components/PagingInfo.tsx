import SearchIcon from '@/icons/SearchIcon';
import TagIcon from '@/icons/TagIcon';
import { useTranslation } from 'next-i18next';


type Props = {
    tag?: string,
    keyword?: string,
    total: number
}

export default function PagingInfo({ tag, keyword, total }: Props) {

    const { i18n } = useTranslation('common');

    const { t } = i18n;

    return (
        <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex justify-between my-5 px-2 md:px-0'>
            <div className='flex'>
                {tag && <div className='flex justify-center items-center gap-2 py-2 px-4 bg-gray-100 text-sm'>
                    <TagIcon className='w-[15px] h-[15px]' />
                    <span className='font-bold uppercase'>{t('tag')}</span>
                    <span className='font-bold uppercase'>: </span>
                    <span>{tag}</span>
                </div>}
                {keyword && <div className='flex justify-center items-center gap-2 py-2 px-4 bg-gray-100 text-sm'>
                    <SearchIcon className='w-[15px] h-[15px]' />
                    <span className='font-bold uppercase'>{t('keyword')}</span>
                    <span className='font-bold uppercase'>: </span>
                    <span>{keyword}</span>
                </div>}
            </div>

            <div className='flex justify-center items-center gap-2 py-2 px-4 bg-gray-100 text-sm'>
                <span className='font-bold uppercase'>{t('total')}</span>
                <span className='font-bold uppercase'>: </span>
                <span>{total}</span>
            </div>
        </div>
    )
}