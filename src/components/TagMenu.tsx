'use client';

import { useTags } from '@/hooks/tag-hook';
import AngelDownIcon from '@/icons/AngelDownIcon';
import CheckIcon from '@/icons/CheckIcon';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';


const TagMenu = () => {

    const { data: tags } = useTags();

    const router = useRouter();

    const { i18n } = useTranslation('common');

    const handleSelectLocale = (tag: string) => {
        router.push(`/tag/${tag}`);
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className='nav-with-icon' asChild>
                <button aria-label="Customise options" >
                    {'aaaaaaa'} <AngelDownIcon className='w-[10px] h-[10px]' />
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content className="nav-dropdown-content" side='bottom' sideOffset={5} align='end' alignOffset={5}>
                    <DropdownMenu.RadioGroup value={i18n.language} onValueChange={handleSelectLocale}>
                        <DropdownMenu.RadioItem className="nav-dropdown-item" value={'all'} >
                            <DropdownMenu.ItemIndicator className="nav-dropdown-indicator">
                                <CheckIcon className='nav-dropdown-indicator-icon' />
                            </DropdownMenu.ItemIndicator>
                            <div className='flex justify-center items-center gap-2'>
                                {i18n.t('allTag')}
                            </div>
                        </DropdownMenu.RadioItem>
                        {
                            tags && tags.map((tag) => {
                                return (
                                    <DropdownMenu.RadioItem key={tag.name} className="nav-dropdown-item" value={tag.name} >
                                        <DropdownMenu.ItemIndicator className="nav-dropdown-indicator">
                                            <CheckIcon className='nav-dropdown-indicator-icon' />
                                        </DropdownMenu.ItemIndicator>
                                        <div className='flex justify-center items-center gap-2'>
                                            {tag.name}
                                        </div>
                                    </DropdownMenu.RadioItem>
                                )
                            })
                        }
                    </DropdownMenu.RadioGroup>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default TagMenu;