import HomeIcon from '@/icons/HomeIcon';
import NoServiceIcon from '@/icons/NoServiceIcon';
import { GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';


export default function ServiceUnavailablePage() {

    const { t } = useTranslation('common');

    return (
        <div className='w-full h-full grow flex justify-center items-center pt-[50px] pb-5'>
            <div className='w-full flex flex-col gap-4 justify-center items-center text-stone-600'>
                <NoServiceIcon className='w-[100px] h-[100px]' />
                <div className='text-xl font-bold leading-none'>503</div>
                <div>{t("serviceUnavailable")}</div>
                <Link
                    href='/'
                    className='h-[40px] btn btn-link mt-5'>
                    <HomeIcon className='w-[20px] h-[20px]' />
                    <span className='leading-none text-xl font-sans'>{t('home')}</span>
                </Link>
            </div>
        </div>
    )
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const props = await serverSideTranslations(context.locale ?? 'id', ['common']);

    return {
        props: {
            ...props
        },
    };
}