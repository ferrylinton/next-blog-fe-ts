import { PropsWithChildren } from 'react';
import Navbar from './Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })


export default function Layout({ children }: PropsWithChildren) {

    return (
        <>
            <Navbar />
            <div className={`w-full min-h-screen pt-[110px] sm:pt-[70px] flex flex-col min-w-[350px] ${inter.className}`}>
                {children}
                <footer className="w-full flex-none">
                    <div className="w-full bg-white border-t border-slate-300">
                        <div className="text-center p-3">&copy; Copyright 2023 marmeam.com</div>
                    </div>
                </footer>
            </div>
        </>
    )
}