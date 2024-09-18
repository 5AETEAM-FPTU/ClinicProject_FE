'use client'
import React from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from 'react-redux';
import { store } from "@/stores/index";
import ProviderI18n from '@/services/i18n/ProviderI18n';
import StyledComponentsRegistry from '@/services/base/styledComponentsRegistry';
import { ThemeProvider } from 'styled-components';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { themes } from '@/style/themes';
import { App, ConfigProvider } from "antd";

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ProviderI18n>
            <StyledComponentsRegistry>
                <ThemeProvider theme={themes.default}>
                    <AntdRegistry>
                        <ConfigProvider
                            theme={
                                {
                                    components: {
                                        Button: {
                                            colorPrimary: themes.default.colors.primary,
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
                                            headerColor: themes.default.colors.textWhite,
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
                                }
                            }
                        >
                            <App>
                                <Provider store={store}> {children}</Provider>
                            </App>
                        </ConfigProvider>
                    </AntdRegistry>
                </ThemeProvider>
            </StyledComponentsRegistry>
        </ProviderI18n>
    )
}

export default Providers
