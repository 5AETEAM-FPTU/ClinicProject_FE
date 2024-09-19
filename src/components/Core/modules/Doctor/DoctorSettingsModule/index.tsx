'use client'
import React, { useState } from 'react'
import {
    Layout,
    Card,
    Avatar,
    Button,
    Typography,
    List,
    Divider,
    Row,
    Col,
    Space,
    message,
    Upload,
} from 'antd'
import {
    CloudUploadOutlined,
    MessageOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-toolkit'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import { useChangeProfileAvatarMutation } from '@/stores/services/user/userSettings'
import webStorageClient from '@/utils/webStorageClient'
import { constants } from '@/settings'
import { useRouter } from 'next-nprogress-bar'
import { useLocale } from 'next-intl'
import axios from "axios";
import { updateUserAvatar } from '@/stores/features/auth'
import { DefaultImage } from '@/helpers/data/Default'
import { UpdateProfileComponent } from './DoctorUpdateProfileComponent'

const { Header, Content } = Layout
const { Title, Text, Paragraph } = Typography

const appointments = [
    { name: 'Mai Sương', time: '7:00 - 8:00 29/9/2024', price: '200.000 VND' },
    { name: 'Phương', time: '8:30 - 9:00 28/9/2024', price: '150.000 VND' },
    { name: 'Bích Ly', time: '7:00 - 8:00 27/9/2024', price: '200.000 VND' },
]

const messages = [
    { name: 'Mai Sương', message: 'Hi! I need more information...' },
    { name: 'Phương', message: 'Awesome work, can you...' },
    { name: 'Bích Ly', message: 'About files I can...' },
    { name: 'Anh Tuấn', message: 'Have a great afternoon...' },
    { name: 'Nguyễn Văn Bầu', message: 'Hi! I need more information...' },
]

export default function DoctorSettingsModule() {
    return (
        <motion.div
            initial={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0 }}
        >
            <Layout
                style={{ minHeight: '100vh' }}
                className="bg-dashboardBackground"
            >
                <Content style={{ padding: '0px' }}>
                    <UpdateProfileComponent />
                </Content>
            </Layout>
        </motion.div>
    )
}


