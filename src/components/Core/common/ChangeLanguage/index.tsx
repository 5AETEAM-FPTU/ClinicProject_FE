'use client'
import { Dropdown, MenuProps } from 'antd'
import Image from 'next/image'
import React, { useTransition } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

import UKFlag from '@public/landing/flags/USFlag.svg'
import VietNamFlag from '@public/landing/flags/VietNameseFlag.png'
import { useTranslation } from '@/app/i18n/client'
import { getPathname } from '@/utils/getPathname'
import Arrow from '@public/landing/icons/Arrow.svg'
import { cn } from '@/lib/utils'
function ChangeLanguages() {
    const router = useRouter()
    const pathname = usePathname()
    const localActive = useLocale()
    const params = useParams()
    const [_, startTransition] = useTransition()

    const { t } = useTranslation(params?.locale as string, 'Landing')

    const handleClick: MenuProps['onClick'] = (e) => {
        startTransition(() => {
            router.replace(`/${e?.key}/${getPathname(pathname)}`)
        })
    }

    const languagesItems: MenuProps['items'] = [
        {
            key: 'vi',
            label: (
                <div className="flex flex-row gap-4">
                    <div className="h-[26px] w-[40px]">
                        <Image
                            src={VietNamFlag}
                            alt="vn_flag"
                            width={400}
                            height={26}
                            className={
                                'h-[26px] w-[40px] rounded-md object-cover'
                            }
                        />
                    </div>
                    <div>{t("header_vietnamese")}</div>
                </div>
            ),
        },
        {
            key: 'en',
            label: (
                <div className="flex flex-row gap-4">
                    <div className="h-[26px] w-[40px]">
                        <Image
                            src={UKFlag}
                            alt="us_flag"
                            width={400}
                            height={26}
                            className={
                                'h-[26px] w-[40px] rounded-md object-cover'
                            }
                        />
                    </div>
                    <div>{t("header_english")}</div>
                </div>
            ),
        },
    ]
    const [isTriger, setIsTriger] = React.useState<boolean>(false)

    return (
        <Dropdown
            menu={{ items: languagesItems, 
                onClick: handleClick
             }}
            placement="bottom"
            trigger={['click']}
        >
            <div
                className="flex items-center justify-center gap-2 hover:cursor-pointer"
                onClick={(e) => {
                    e.preventDefault()
                    setIsTriger(!isTriger)
                }}
            >
                <div>
                    <Image
                        src={localActive == 'vi' ? VietNamFlag : UKFlag}
                        alt="flag"
                        width={400}
                        className="h-[26px] w-[40px] rounded-md object-cover"
                    />
                </div>
                <div>
                    <Image
                        src={Arrow}
                        alt="arrow"
                        width={12}
                        className={cn(`${isTriger ? 'rotate-180' : ''}`)}
                    />
                </div>
            </div>
        </Dropdown>
    )
}

export default ChangeLanguages
