import SearchIcon from '@/icons/SearchIcon';
import { useTranslation } from 'next-i18next';
import { Righteous } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import TagMenu from './TagMenu';
import CloseIcon from '@/icons/CloseIcon';


const logoFont = Righteous({
    weight: "400",
    subsets: ['latin']
});

export default function Navbar() {

    const router = useRouter();

    const [keyword, setKeyword] = useState<string>(typeof router.query?.keyword === "string" ? router.query.keyword : '');

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setKeyword(event.target.value.replace(/\s/g, ''));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (keyword.length > 2) {
            event.currentTarget.submit();
        }
    }

    const handleReset = () => {
        setKeyword('');
        router.push('/post', undefined, { locale: i18n.language });
    }

    const { i18n } = useTranslation('common');

    const { t } = i18n;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 pb-[30px] sm:pb-[20px]"
            style={{ "background": "linear-gradient(to top, transparent, #ffffff)" }}>
            <div className='border-b border-gray-300 bg-gray-100'>
                <div className="h-[90px] sm:h-[50px] px-2 md:px-0 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col sm:flex-row gap-1 items-center justify-center mx-auto bg-gray-100">
                    <div className='w-full flex items-center justify-between'>
                        <Link href={'/'} className={`uppercase leading-none text-2xl text-gray-600 sm:text-3xl ${logoFont.className}`}>MARMEAM.COM</Link>
                        <div className='flex gap-1 items-center justify-center'>
                            <TagMenu />
                            <LanguageSwitcher />
                        </div>
                    </div>
                    <form
                        action='/post'
                        onSubmit={handleSubmit}
                        noValidate
                        autoComplete='off'
                        className={`bg-white w-full sm:p-0 sm:w-[200px] md:w-[300px]`}>
                        <div className="relative flex w-full grow">
                            <input type="text"
                                name="keyword"
                                onChange={handleChange}
                                placeholder={t('keyword')}
                                value={keyword}
                                maxLength={20}
                                className="w-full h-[36px] px-3 border border-gray-400 pr-10 text-sm focus:outline-none focus:ring-2 ring-blue-200" />
                            {keyword && keyword.length > 2 && <button type="button" onClick={() => handleReset()}
                                className="absolute top-0 right-[35px] h-full w-[30px] text-red-500 hover:text-red-700">
                                <CloseIcon className='w-[16px] h-[16px] mx-auto border border-red-500 hover:border-red-700 rounded-full' />
                            </button>}
                            <button type="submit" className="absolute top-0 right-0 h-full w-[35px] text-gray-500 hover:text-gray-700">
                                <SearchIcon className='w-[24px] h-[24px] mx-auto' />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    )


}