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
        <div className='w-full flex justify-center items-center pt-[60px] px-2 md:px-0 mb-3 md:mb-5 bg-[#f5f5f5] border-b border-[#e9e9e9]'>
            <div className='w-full md:px-0 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl h-[100px] md:h-[150px] px-3 sm:px-5 lg:px-8 flex items-center justify-between gap-2'>
                <div className='flex flex-col items-start justify-start gap-1'>
                    <div className={clsx(righteous.className, 'text-2xl sm:text-4xl md:text-5xl', 'bg-gradient-to-b from-[#97d70a] to-[#56701c] bg-clip-text text-transparent', 'drop-shadow-[0_1px_1px_rgba(200,200,200,1)]')}>Simple Code Sample</div>
                    <div className={clsx(greatVibes.className, 'text-base sm:text-lg md:text-xl bg-gradient-to-b from-[#97d70a] to-[#56701c] bg-clip-text text-transparent', 'drop-shadow-[0_1px_1px_rgba(255,255,255,1)]')}>Contoh2 sederhana kode pemrograman, css, html ...   </div>
                </div>
                <div className='bg-[#9ac43d] -rotate-3 border border-[#6a8b23]'>
                    <CodeIcon className='w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[120px] md:h-[120px] p-1 bg-white text-[#333] border border-[#333] rotate-12' />
                </div>

            </div>
        </div>
    )
}