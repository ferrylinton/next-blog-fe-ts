import HomeIcon from '@/icons/HomeIcon';
import NotFoundIcon from '@/icons/NotFoundIcon';
import { GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function NotFoundPage() {

    const router = useRouter();

    const { t } = useTranslation('common');

    return (
        <div className='w-full h-full grow flex justify-center items-center pt-[50px] pb-5'>
            <div className='w-full flex flex-col gap-4 justify-center items-center text-stone-600'>
                <NotFoundIcon className='w-[100px] h-[100px]' />
                <div>{t("pageNotFound")}</div>
                <div className='leading-none text-stone-700 text-sm bg-stone-200 px-5 py-2 rounded-full'>URL : {router.asPath}</div>
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