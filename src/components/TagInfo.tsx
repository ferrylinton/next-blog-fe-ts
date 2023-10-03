import SearchIcon from '@/icons/SearchIcon';
import { useTranslation } from 'next-i18next';


type Props = {
    tag?: string,
    total: number
}

export default function TagInfo({ tag, total }: Props) {

    const { i18n } = useTranslation('common');

    const { t } = i18n;

    if (!tag || tag.length < 3)
        return null;

    return (
        <div className='w-full flex justify-between my-5 px-2 md:px-0'>
            <div className='flex justify-center items-center gap-2 py-2 px-4 bg-gray-100 text-sm'>
                <SearchIcon className='w-[15px] h-[15px]' />
                <span className='font-bold uppercase'>{t('keyword')}</span>
                <span className='font-bold uppercase'>: </span>
                <span>{tag}</span>
            </div>
            <div className='flex justify-center items-center gap-2 py-2 px-4 bg-gray-100 text-sm'>
                <span className='font-bold uppercase'>{t('total')}</span>
                <span className='font-bold uppercase'>: </span>
                <span>{total}</span>
            </div>
        </div>
    )
}