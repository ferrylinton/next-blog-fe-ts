import ReloadIcon from '@/icons/ReloadIcon'
import SearchIcon from '@/icons/SearchIcon'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

type Props = {
    keyword?: string
}

const SearchBox = (props: Props) => {

    const router = useRouter();

    const [keyword, setKeyword] = useState(props.keyword);

    const handleOnChange = ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(value);
    };

    const handleReload = () => {
        setKeyword('');
        router.push(`${router.pathname}`);
    }

    return (
        <div className='w-full'>
            <div className='mx-auto w-full sm:max-w-lg md:max-w-xl h-[50px] flex items-center px-3 my-6'>
                <form
                    action={router.pathname}
                    method='GET'
                    noValidate
                    autoComplete='off'
                    className='flex w-full '>

                    <div className="relative flex w-full h-10 grow rounded">
                        <input type="text"
                            name="keyword"
                            placeholder="keyword"
                            value={keyword}
                            onChange={handleOnChange}
                            className="w-full px-5  border border-green-600  pr-10 text-sm rounded focus:outline-none focus:ring-4 ring-green-200" />
                        <button type="submit" className="absolute top-0 right-0 h-full px-4 text-green-600 hover:text-slate-600">
                            <SearchIcon className='w-[24px] h-[24px]' />
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default SearchBox