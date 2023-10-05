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
        <div className='w-full flex justify-center items-center pt-[90px]  sm:pt-[60px] ps-2 pe-5 mb-3 md:mb-5 bg-[#f5f5f5] border-b border-[#e9e9e9]'>
            <div className='w-full md:px-0 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl h-[130px] md:h-[150px] px-3 sm:px-5 lg:px-8 flex items-center justify-between gap-2'>
                <div className='w-full flex flex-col justify-center text-center sm:text-start items-center gap-1'>
                    <div className={clsx(righteous.className, 'w-full text-4xl sm:text-4xl md:text-5xl', 'bg-gradient-to-b from-lime-400 to-lime-800 bg-clip-text text-transparent', 'drop-shadow-[0_1px_1px_rgba(0,0,0,1)]')}>Simple Code Sample</div>
                    <div className={clsx(greatVibes.className, 'w-full text-xl text-lime-800')}>Contoh2 sederhana kode pemrograman, css, html</div>
                </div>
                <div className='hidden sm:inline-block bg-lime-600 -rotate-3 border border-lime-700'>
                    <CodeIcon className='w-[90px] h-[90px] md:w-[120px] md:h-[120px] p-1 bg-white text-lime-800 border border-lime-800 rotate-12' />
                </div>

            </div>
        </div>
    )
}