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
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { SessionProvider } from 'next-auth/react'
import { useAppDispatch } from '@/hooks/redux-toolkit'
import { IUserInfo, updateUserInfo } from '@/stores/features/auth'
import { jwtDecode } from 'jwt-decode'
import { JwtPayloadUpdated } from '@/components/Core/modules/Auth/SignIn'
import UserProvider from '@/providers/UserProvider'
import { ConvexClientProvider } from '@/providers/ConvexClientProvider'

function Providers({ children }: { children: React.ReactNode }) {
    const _accessToken = webStorageClient.getToken()
    if (_accessToken) {
        const _role = jwtDecode<JwtPayloadUpdated>(_accessToken!).role
        const router = useRouter()
        if (_role == 'admin') {
            webStorageClient.removeAll()
            router.push('/home')
        }
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
                                        headerBg: "#fff",
                                        headerColor: "#000",
                                        headerBorderRadius: 8,
                                        footerBg: "#fff",
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
                                        <UserProvider>
                                            <ConvexClientProvider>
                                                {children}
                                            </ConvexClientProvider>
                                        </UserProvider>
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
