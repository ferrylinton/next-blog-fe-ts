import AuthorIcon from '@/icons/AuthorIcon';
import HomeIcon from '@/icons/HomeIcon';
import TagIcon from '@/icons/TagIcon';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import { Righteous } from 'next/font/google';
import Link from 'next/link';
import { MouseEvent, useEffect, useState } from 'react';
import LocaleMenu from './LocaleMenu';
import TagMenu from './TagMenu';
import SearchIcon from '@/icons/SearchIcon';
import MenuIcon from '@/icons/MenuIcon';
import CloseIcon from '@/icons/CloseIcon';
import LanguageSwitcher from './LanguageSwitcher';


const righteous = Righteous({
    weight: "400",
    subsets: ['latin']
});

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const onClickHandler = (): void => {
        setIsOpen(false);
    }

    const { i18n } = useTranslation('common');
    const { t } = i18n;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-gray-200 dark:bg-gray-900 shadow-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                <Link href={'/'} className='uppercase px-2 text-2xl'>MARMEAM.COM</Link>
                <div className='flex'>
                    <LanguageSwitcher/>
                    <button className='flex items-center justify-center w-[50px] h-[50px] hover:bg-slate-200'>
                        <SearchIcon className='w-[24px] h-[24px] cursor-pointer' />
                    </button>
                    <button className='flex items-center justify-center w-[50px] h-[50px] hover:bg-slate-200'>
                        <MenuIcon className='w-[36px] h-[36px] cursor-pointer' />
                    </button>
                </div>
            </div>
        </nav>
    )


}