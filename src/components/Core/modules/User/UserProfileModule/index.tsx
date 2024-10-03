'use client'
import React from 'react'
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
} from 'antd'
import {
    MessageOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons'
import Image from 'next/image'
import ProfileBackground from '@public/landing/images/profile-background.png'
import { motion } from 'framer-motion'
import { useRouter } from 'next-nprogress-bar'
import { useLocale } from 'next-intl'
import { Settings } from 'lucide-react'
import { useGetUserProfileQuery } from '@/stores/services/user/userSettings'
import { DefaultImage, UserRole } from '@/helpers/data/Default'
import { UserProfileTypes } from '..'
import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode'
import { JwtPayloadUpdated } from '../../Auth/SignIn'
import webStorageClient from '@/utils/webStorageClient'
import _ from 'lodash'

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

export default function UserProfileModule() {
    const router = useRouter()
    const locale = useLocale()

    const _accessToken = webStorageClient.getToken()

    const { result, isFetching, refetch } = useGetUserProfileQuery(undefined, {
        selectFromResult: ({ data, isFetching }) => {
            return {
                result: (data?.body?.user as UserProfileTypes) ?? {},
                isFetching: isFetching,
            }
        },
    })
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
                    <div className="relative mb-[85px] h-[250px]">
                        <Image
                            className="z-1 h-[100%] w-full rounded-2xl object-cover"
                            src={ProfileBackground}
                            alt="background"
                        />
                        <div
                            className="z-2 absolute bottom-0 left-[50%] mb-0 flex w-[90%] translate-x-[-50%] translate-y-[50%] items-center justify-between rounded-2xl bg-white bg-opacity-85 p-5"
                            style={{ marginBottom: '24px' }}
                        >
                            <Space size="large" align="center">
                                <Avatar
                                    shape="square"
                                    className="size-16 rounded-xl sm:size-20"
                                    icon={<UserOutlined />}
                                    src={
                                        result?.avatarUrl
                                            ? result?.avatarUrl
                                            : DefaultImage
                                    }
                                />
                                <div className="">
                                    <p
                                        className="font-bold text-secondarySupperDarker sm:text-lg md:text-2xl"
                                        style={{ margin: 0 }}
                                    >
                                        {result?.fullName
                                            ? result?.fullName
                                            : 'Ẩn danh'}
                                    </p>
                                    <Text
                                        className="sm:text-md font-medium text-secondarySupperDarker md:text-lg"
                                        type="secondary"
                                    >
                                        {result?.gender?.genderName
                                            ? result?.gender?.genderName
                                            : 'Ẩn giới tính'}
                                    </Text>
                                    <br />
                                    <Text
                                        className="md:text-md font-medium text-secondarySupperDarker sm:text-sm"
                                        type="secondary"
                                    >
                                        {result?.dob
                                            ? dayjs(result?.dob).format(
                                                  'DD/MM/YYYY',
                                              )
                                            : 'Ẩn ngày sinh'}
                                    </Text>
                                </div>
                            </Space>
                            <Space
                                className="flex h-full flex-col sm:flex-row"
                                style={{ marginLeft: 'auto' }}
                            >
                                <Button
                                    type="primary"
                                    className=""
                                    icon={<MessageOutlined />}
                                    onClick={() =>
                                        router.push(
                                            `/${locale}/${jwtDecode<JwtPayloadUpdated>(_accessToken!).role}/consultation/pending-room`,
                                        )
                                    }
                                >
                                    Tin nhắn
                                </Button>
                                <Button
                                    type="primary"
                                    className=""
                                    icon={<Settings size={18} />}
                                    onClick={() =>
                                        router.push(
                                            `/${locale}/${jwtDecode<JwtPayloadUpdated>(_accessToken!).role}/account/settings`,
                                        )
                                    }
                                >
                                    Cài đặt
                                </Button>
                            </Space>
                        </div>
                    </div>

                    <Row gutter={[24, 16]} justify="space-between">
                        <Col xs={24} xl={8}>
                            <Card
                                bordered={false}
                                headStyle={{ borderBottom: 'none' }}
                                className="h-full !border-none !shadow-third"
                                title={
                                    <div className="text-xl font-bold text-secondarySupperDarker">
                                        Lịch sử khám gần đây
                                    </div>
                                }
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={appointments}
                                    bordered={false}
                                    renderItem={(item) => (
                                        <List.Item className="!border-b-0">
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar
                                                        shape="square"
                                                        size={48}
                                                        icon={<UserOutlined />}
                                                    />
                                                }
                                                title={
                                                    <div className="text-lg font-semibold text-secondarySupperDarker">
                                                        {item.name}
                                                    </div>
                                                }
                                                description={
                                                    <div className="text-secondarySupperDarker">
                                                        {item.time}
                                                    </div>
                                                }
                                            />
                                            <Button
                                                type="primary"
                                                className="rounded-xl bg-secondaryDark !p-5 font-medium"
                                            >
                                                Chi tiết
                                            </Button>
                                        </List.Item>
                                    )}
                                />
                                {/* <Link className="text-center block w-full text-secondarySupperDarker" href="#">Xem thêm</Link> */}
                            </Card>
                        </Col>
                        <Col xs={24} xl={8}>
                            <Card
                                className="h-full !border-none !shadow-third"
                                headStyle={{ borderBottom: 'none' }}
                                bordered={false}
                                title={
                                    <div className="text-xl font-bold text-secondarySupperDarker">
                                        Thông tin cá nhân
                                    </div>
                                }
                            >
                                {' '}
                                {result?.description ? (
                                    <p
                                        className="text-lg text-secondarySupperDarker"
                                        dangerouslySetInnerHTML={{
                                            __html: result?.description,
                                        }}
                                    ></p>
                                ) : (
                                    <div className="flex h-fit w-full items-center justify-center">
                                        Ẩn mô tả cá nhân
                                    </div>
                                )}
                                <Divider />
                                <p className="my-2 text-lg font-semibold text-secondarySupperDarker">
                                    <span className="font-bold text-secondarySupperDarker">
                                        Họ và tên:
                                    </span>{' '}
                                    {result?.fullName
                                        ? result?.fullName
                                        : 'Ẩn danh'}
                                </p>
                                <p className="my-2 text-lg font-semibold text-secondarySupperDarker">
                                    <span className="font-bold text-secondarySupperDarker">
                                        Số điện thoại:
                                    </span>{' '}
                                    (84){' '}
                                    {result?.phoneNumber
                                        ? result?.phoneNumber
                                        : 'Ẩn số điện thoại'}
                                </p>
                                <p className="my-2 text-lg font-semibold text-secondarySupperDarker">
                                    <span className="font-bold text-secondarySupperDarker">
                                        Email:
                                    </span>{' '}
                                    {result?.username
                                        ? result?.username
                                        : 'Ẩn email'}
                                </p>
                                <p className="my-2 text-lg font-semibold text-secondarySupperDarker">
                                    <span className="font-bold text-secondarySupperDarker">
                                        Địa chỉ:
                                    </span>{' '}
                                    {result?.address
                                        ? result?.address
                                        : 'Ẩn địa chỉ'}
                                </p>
                                <p className="my-2 text-lg font-semibold text-secondarySupperDarker">
                                    <span className="font-bold text-secondarySupperDarker">
                                        Loại tài khoản:
                                    </span>{' '}
                                    {jwtDecode<JwtPayloadUpdated>(_accessToken!)
                                        .role === UserRole.DOCTOR
                                        ? 'Bác sĩ'
                                        : jwtDecode<JwtPayloadUpdated>(
                                                _accessToken!,
                                            ).role === UserRole.STAFF
                                          ? 'Nhân viên y tế'
                                          : 'Bệnh nhân'}
                                </p>
                            </Card>
                        </Col>
                        <Col xs={24} xl={8}>
                            <Card
                                className="h-full !border-none !shadow-third"
                                headStyle={{ borderBottom: 'none' }}
                                bordered={false}
                                title={
                                    <div className="text-xl font-bold text-secondarySupperDarker">
                                        Tin nhắn
                                    </div>
                                }
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={messages}
                                    renderItem={(item) => (
                                        <List.Item
                                            className="!border-none"
                                            actions={[
                                                <a
                                                    className="text-base font-bold"
                                                    key="list-loadmore-edit !text-secondarySupperDarker"
                                                >
                                                    TRẢ LỜI
                                                </a>,
                                            ]}
                                        >
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar
                                                        shape="square"
                                                        size={48}
                                                        icon={<UserOutlined />}
                                                    />
                                                }
                                                title={
                                                    <div className="text-lg font-semibold text-secondarySupperDarker">
                                                        {item.name}
                                                    </div>
                                                }
                                                description={
                                                    <div className="text-md text-secondarySupperDarker">
                                                        {item.message}
                                                    </div>
                                                }
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </motion.div>
    )
}
