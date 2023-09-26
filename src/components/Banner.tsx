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
        <div className='w-full mt-[100px] sm:mt-[70px] px-2 lg:px-0'>
            <div className='h-[150px] my-5 px-5 border border-slate-300 rounded mx-auto w-full md:max-w-3xl lg:max-w-4xl xl:max-w-6x flex items-center justify-between gap-2'>
                <div className='flex flex-col items-start justify-start gap-2'>
                    <div className={clsx(righteous.className, 'text-lg sm:text-5xl', 'bg-gradient-to-b from-slate-800 to-green-600 bg-clip-text text-transparent', 'drop-shadow-[0_1px_1px_rgba(200,200,200,1)]')}>Simple Code Sample</div>
                    <div className={clsx(greatVibes.className, 'sm:text-xl bg-gradient-to-t from-slate-800 to-green-600 bg-clip-text text-transparent', 'drop-shadow-[0_1px_1px_rgba(255,255,255,1)]')}>Contoh2 sederhana kode pemrograman, css, html ...   </div>
                </div>
                <div className='bg-slate-300 border border-slate-400 rounded -rotate-3'>
                    <CodeIcon className='w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] p-1 bg-white text-slate-600 border border-slate-400 rotate-12 rounded' />
                </div>

            </div>
        </div>
    )
}