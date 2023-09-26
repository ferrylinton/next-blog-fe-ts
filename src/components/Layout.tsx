import React, { PropsWithChildren } from 'react';
import Navbar from './Navbar';
import { fetchTags, TAGS_KEY } from '@/services/tag-service';
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Banner from './Banner';
import { useAppContext } from '@/providers/app-context';
import clsx from 'clsx';


export default function Layout({ children }: PropsWithChildren) {

    const { data } = useQuery(TAGS_KEY, fetchTags);

    return (
        <>
            <Navbar />
            <Banner />
            <div className="w-full mt-[70px] flex flex-col min-w-[350px]">
                <div className='w-full grow'>
                    {children}
                </div>
                <footer className="w-full flex-none">
                    <div className="w-full bg-white border-t border-slate-300">
                        <div className="text-center p-3">&copy; Copyright 2023 marmeam.com</div>
                    </div>
                </footer>
            </div>
        </>
    )
}