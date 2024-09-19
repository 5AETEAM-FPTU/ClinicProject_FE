'use client'
import StyledComponentsRegistry from '@/services/base/styledComponentsRegistry'
import ProviderI18n from '@/services/i18n/ProviderI18n'
import { constants } from '@/settings'
import { store } from '@/stores/index'
import { themes } from '@/style/themes'
import webStorageClient from '@/utils/webStorageClient'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App, ConfigProvider } from 'antd'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { SessionProvider } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

function Providers({ children }: { children: React.ReactNode }) {
    const _role = webStorageClient.get(constants.ROLE)
    const router = useRouter()
    if (_role == 'admin') {
        webStorageClient.removeAll()
        router.push('/home')
    }
    
    return (
        <ProviderI18n>
            <StyledComponentsRegistry>
                <ThemeProvider theme={themes.default}>
                    <AntdRegistry>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Button: {
                                        colorPrimary:
                                            themes.default.colors.primary,
                                        algorithm: true,
                                    },
                                    Input: {
                                        paddingBlock: 8,
                                    },
                                    Typography: {
                                        titleMarginBottom: 0,
                                        titleMarginTop: 0,
                                    },
                                    Table: {
                                        headerBg: themes.default.colors.primary,
                                        headerColor:
                                            themes.default.colors.textWhite,
                                        headerBorderRadius: 0,
                                    },
                                    Select: {
                                        controlHeight: 40,
                                        fontSizeLG: 14,
                                    },
                                },
                                token: {
                                    colorPrimary: themes.default.colors.primary,
                                },
                            }}
                        >
                            <App>
                                <Provider store={store}>
                                    <SessionProvider>
                                        {children}
                                    </SessionProvider>
                                </Provider>
                            </App>
                        </ConfigProvider>
                    </AntdRegistry>
                </ThemeProvider>
            </StyledComponentsRegistry>
        </ProviderI18n>
    )
}

export default Providers
