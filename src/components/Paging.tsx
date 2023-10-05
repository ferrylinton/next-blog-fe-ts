import NextIcon from '@/icons/NextIcon';
import PreviousIcon from '@/icons/PreviousIcon';
import { Pagination } from '@/types/common-type';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';


type Props = {
    pagination?: Pagination
}

export default function Paging({ pagination }: Props) {

    const { i18n } = useTranslation('common');

    const { t } = i18n;

    const router = useRouter();

    const { pathname, query } = router;

    if (!pagination) {
        return null;
    } else {

        let PreviousButton = (pagination.page && pagination.page > 1) ?
            <Link
                href={{ pathname, query: { ...query, page: pagination.page - 1 } }}
                className='w-[100px] h-[40px] border border-slate-300 flex items-center justify-center'>
                <PreviousIcon className='w-[30px] h-[30px]' />
            </Link> :
            <div className='w-[100px] h-[40px] border border-slate-300 bg-gray-100 text-gray-400 cursor-not-allowed flex items-center justify-center'>
                <PreviousIcon className='w-[30px] h-[30px]' />
            </div>

        let NextButton = (pagination.page && pagination.page < pagination.totalPage) ?
            <Link
                href={{
                    pathname,
                    query: { ...query, page: pagination.page + 1 }
                }}
                className='w-[100px] h-[40px] border border-slate-300 flex items-center justify-center'>
                <NextIcon className='w-[30px] h-[30px]' />
            </Link> :
            <div className='w-[100px] h-[40px] border border-slate-300 bg-gray-100 text-gray-400 cursor-not-allowed flex items-center justify-center'>
                <NextIcon className='w-[30px] h-[30px]' />
            </div>

        return (
            <div className='flex justify-center align-middle gap-1 flex-wrap px-2 mb-5'>
                <div className='h-[40px] px-4 border border-slate-300 flex items-center justify-center'>
                    {t('pageOf', { page: pagination.page, totalPage: pagination.totalPage })}
                </div>
                {PreviousButton}{NextButton}
            </div>
        )
    }
}