import CloseIcon from '@/icons/CloseIcon';
import SearchIcon from '@/icons/SearchIcon';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';



export default function SearchForm() {

    const router = useRouter();

    const [keyword, setKeyword] = useState<string>(typeof router.query?.keyword === "string" ? router.query.keyword : '');

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setKeyword(event.target.value.replace(/\s/g, ''));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.currentTarget.submit();
    }

    const handleReset = () => {
        setKeyword('');
        router.push('/post', undefined, { locale: i18n.language });
    }

    const { i18n } = useTranslation('common');

    const { t } = i18n;

    return (
        <form
            action='/post'
            onSubmit={handleSubmit}
            noValidate
            autoComplete='off'
            className={`bg-white w-full sm:p-0 sm:w-[200px] md:w-[300px]`}>
            <div className="relative flex w-full grow">
                <button type="submit" className="absolute top-0 left-0 h-full w-[35px] text-stone-400 hover:text-stone-500">
                    <SearchIcon className='w-[20px] h-[20px] mx-auto' />
                </button>
                <input type="text"
                    name="keyword"
                    onChange={handleChange}
                    placeholder={t('keyword')}
                    value={keyword}
                    maxLength={20}
                    className="w-full h-[36px] border border-stone-300 px-[35px] text-sm focus:outline-none focus:ring-2 ring-lime-200" />
                {keyword && keyword.length > 0 &&
                    <button type="button" onClick={() => handleReset()}
                        className="absolute top-0 right-0 h-full w-[35px] text-stone-400 hover:text-stone-500">
                        <CloseIcon className='w-[20px] h-[20px]  mx-auto' />
                    </button>}

            </div>
        </form>
    )


}