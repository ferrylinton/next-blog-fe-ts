import { COOKIE_NEXT_LOCALE } from '@/configs/constant';
import * as Switch from '@radix-ui/react-switch';
import { getCookie, setCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const option: OptionsType = {
    sameSite: 'strict',
    path: "/",
    maxAge: 60 * 60 * 24 * 30
};

export default function LanguageSwitcher() {

    const router = useRouter();

    const { pathname, asPath, query } = router;

    const { i18n } = useTranslation('common');

    useEffect(() => {
        const locale = getCookie(COOKIE_NEXT_LOCALE);

        if (!locale) {
            setCookie(COOKIE_NEXT_LOCALE, i18n.language, option);
        } else if (locale !== i18n.language) {
            router.push({ pathname, query }, asPath, { locale });
        }
    })

    const handleOnCheckedChange = (checked: boolean) => {
        const { pathname, asPath, query } = router;
        const locale = checked ? 'en' : 'id';
        setCookie(COOKIE_NEXT_LOCALE, locale, option);
        router.push({ pathname, query }, asPath, { locale });
    }

    return (
        <div className="relative w-[74px] h-[36px] flex items-center justify-center text-sm border border-stone-300 order-1 sm:order-2">
            <div className='w-full absolute text-gray-500 flex items-center justify-center text-center'>
                <div className='w-[30px]'>ID</div>
                <div className='w-[30px]'>EN</div>
            </div>
            <Switch.Root
                checked={i18n.language === 'en'} onCheckedChange={handleOnCheckedChange}
                className="language-switcher w-full h-full bg-transparent relative outline-none cursor-default"
                id="language-switcher" >
                <Switch.Thumb className="flex items-center justify-center w-1/2 h-full border border-stone-100 bg-gradient-to-b from-lime-400 via-lime-600 to-lime-600 text-white  transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[100%]">
                    {i18n.language === 'id' ? 'ID' : 'EN'}
                </Switch.Thumb>
            </Switch.Root>
        </div>
    )
}