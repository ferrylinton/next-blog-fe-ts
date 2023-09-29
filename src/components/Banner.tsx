import CodeIcon from '@/icons/CodeIcon';
import clsx from 'clsx';
import { Great_Vibes, Righteous, Roboto, Satisfy, Shadows_Into_Light } from 'next/font/google';
import Image from 'next/image';

const greatVibes = Satisfy({
    weight: '400',
    subsets: ['latin']
});

const righteous = Righteous({
    weight: "400",
    subsets: ['latin']
});

export default function Banner() {
    return (
        <div className='w-full flex justify-center items-center px-2 md:px-0 mb-3 md:mb-5'>
            <div className='w-full h-[100px] md:h-[150px] px-3 sm:px-5 lg:px-8 border border-slate-300 flex items-center justify-between gap-2'>
                <div className='flex flex-col items-start justify-start gap-1'>
                    <div className={clsx(righteous.className, 'text-4xl md:text-5xl', 'bg-gradient-to-b from-slate-800 to-green-600 bg-clip-text text-transparent', 'drop-shadow-[0_1px_1px_rgba(200,200,200,1)]')}>Simple Code Sample</div>
                    <div className={clsx(greatVibes.className, 'text-lg md:text-xl bg-gradient-to-t from-slate-800 to-green-600 bg-clip-text text-transparent', 'drop-shadow-[0_1px_1px_rgba(255,255,255,1)]')}>Contoh2 sederhana kode pemrograman, css, html ...   </div>
                </div>
                <div className='bg-slate-300 border border-slate-400 -rotate-3'>
                    <CodeIcon className='w-[70px] h-[70px] md:w-[120px] md:h-[120px] p-1 bg-white text-slate-600 border border-slate-400 rotate-12' />
                </div>

            </div>
        </div>
    )
}