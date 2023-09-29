'use client';

import { useTags } from '@/hooks/tag-hook';
import AngelDownIcon from '@/icons/AngelDownIcon';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';


const TagMenu = () => {

    const { data: tags } = useTags();

    const [open, setOpen] = useState(false);

    const router = useRouter();

    const selected = typeof router.query?.tag === "string" ? router.query.tag : '/tag/all';

    const { i18n } = useTranslation('common');

    const { t } = i18n;

    const handleSelectTag = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setOpen(false);
        router.push(event.currentTarget.pathname, undefined, { locale: i18n.language });
    }

    return (
        <>
            <div className='relative'>
                <button className={`h-[36px] px-3 relative flex gap-1 sm:gap-2 items-center justify-center text-sm border border-gray-400 ${open ? 'ring-2 ring-blue-200' : ''}`} onClick={() => setOpen(!open)}>
                    <span className='uppercase'>{selected == '/tag/all' ? t('allTag') : selected.replace('/tag/', '')}</span>
                    <AngelDownIcon className='w-[10px] h-[10px] cursor-pointer' />
                </button>
                <div className={`absolute top-[calc(100%+2px)] z-[52] right-0 w-48 bg-white ${open ? 'animate-slideDownAndFade' : 'hidden'}`}>
                    <div className='flex flex-col items-center justify-center p-2 border border-gray-300 shadow-[0px_5px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_5px_20px_-15px_rgba(22,_23,_24,_0.2)]'>
                        <Link key='allTag'
                            className='w-full py-1 px-4 rounded uppercase border border-white hover:bg-gray-200 hover:text-gray-700 hover:border-gray-300'
                            onClick={handleSelectTag}
                            href='/post'>{t('allTag')}</Link>
                        {
                            tags && tags.map((tag) => {
                                return (
                                    <Link
                                        key={tag.name}
                                        className='w-full py-1 px-4 rounded uppercase border border-white hover:bg-gray-200 hover:text-gray-700 hover:border-gray-300'
                                        onClick={handleSelectTag}
                                        href={`/tag/${tag.name}`}>{tag.name}</Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div onClick={() => setOpen(false)} className={clsx('bg-transparent fixed inset-0 z-[51]', !open && 'hidden')} />
        </>
    );
};

export default TagMenu;