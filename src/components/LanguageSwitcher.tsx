import * as Switch from '@radix-ui/react-switch';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';


export default function LanguageSwitcher() {

    const router = useRouter();

    const { i18n } = useTranslation('common');

    const handleOnCheckedChange = (checked: boolean) => {
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: checked ? 'en' : 'id' });
    }

    return (
        <div className="relative flex items-center text-base">
            <div className='w-[68px] h-[34px] absolute bg-slate-400 text-slate-100 rounded-full flex items-center justify-center text-center'>
                <div className='w-[30px] '>ID</div>
                <div className='w-[30px] '>EN</div>
            </div>
            <Switch.Root
                checked={i18n.language === 'en'} onCheckedChange={handleOnCheckedChange}
                className="language-switcher w-[68px] h-[34px] bg-transparent rounded-full relative outline-none cursor-default"
                id="language-switcher" >
                <Switch.Thumb className="flex items-center justify-center w-[30px] h-[30px] bg-white rounded-full transition-transform duration-100 translate-x-[2px] will-change-transform data-[state=checked]:translate-x-[36px]">
                    {i18n.language === 'id' ? 'ID' : 'EN'}
                </Switch.Thumb>
            </Switch.Root>
        </div>
    )
}