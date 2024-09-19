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

export default function DoctorProfileModule() {
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
                    <div className="relative mb-[85px] h-[300px]">
                        <Image
                            className="z-1 h-[100%] w-full rounded-2xl"
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
                                />
                                <div className="">
                                    <p
                                        className="font-bold text-secondarySupperDarker sm:text-lg md:text-2xl"
                                        style={{ margin: 0 }}
                                    >
                                        Nguyễn Minh Hoàng Quốc
                                    </p>
                                    <Text
                                        className="sm:text-md font-medium text-secondarySupperDarker md:text-lg"
                                        type="secondary"
                                    >
                                        Bác sĩ thần kinh
                                    </Text>
                                    <br />
                                    <Text
                                        className="md:text-md font-medium text-secondarySupperDarker sm:text-sm"
                                        type="secondary"
                                    >
                                        Chuyên khoa thần kinh
                                    </Text>
                                </div>
                            </Space>
                            <Space
                                className="flex h-full flex-col sm:flex-row"
                                style={{ marginLeft: 'auto' }}
                            >
                                <Button
                                    className="text-md font-semibold sm:text-lg"
                                    type="text"
                                    icon={<MessageOutlined />}
                                >
                                    Tin nhắn
                                </Button>
                                <Button
                                    className="text-md font-semibold sm:text-lg"
                                    type="text"
                                    icon={<SettingOutlined />}
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
                                            <div className="text-lg font-semibold text-secondarySupperDarker">
                                                {item.price}
                                            </div>
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
                                <Paragraph className="text-lg text-secondarySupperDarker">
                                    Hi, I'm Alec Thompson. Decisions: If you
                                    can't decide, the answer is no. If two
                                    equally difficult paths, choose the one more
                                    painful in the short term (pain avoidance is
                                    creating an illusion of equality).
                                </Paragraph>
                                <Divider />
                                <p className="my-2 text-lg font-semibold text-secondarySupperDarker">
                                    <span className="font-bold text-secondarySupperDarker">
                                        Họ và tên:
                                    </span>{' '}
                                    Nguyễn Minh Hoàng Quốc
                                </p>
                                <p className="my-2 text-lg font-semibold text-secondarySupperDarker">
                                    <span className="font-bold text-secondarySupperDarker">
                                        Số điện thoại:
                                    </span>{' '}
                                    (84) 775771047
                                </p>
                                <p className="my-2 text-lg font-semibold text-secondarySupperDarker">
                                    <span className="font-bold text-secondarySupperDarker">
                                        Email:
                                    </span>{' '}
                                    hoangquoc.work@gmail.com
                                </p>
                                <p className="my-2 text-lg font-semibold text-secondarySupperDarker">
                                    <span className="font-bold text-secondarySupperDarker">
                                        Chức vụ:
                                    </span>{' '}
                                    Bác sĩ tâm thần
                                </p>
                                <p className="my-2 text-lg font-semibold text-secondarySupperDarker">
                                    <span className="font-bold text-secondarySupperDarker">
                                        Ngày sinh:
                                    </span>{' '}
                                    01/01/2004
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

                    <Card
                        bordered={false}
                        headStyle={{ borderBottom: 'none' }}
                        className="h-full !shadow-third"
                        title={
                            <div className="text-xl font-bold text-secondarySupperDarker">
                                Thành tựu
                            </div>
                        }
                        style={{ marginTop: '24px' }}
                    >
                        <Title level={4}>Tiểu sử</Title>
                        <ul>
                            <li>
                                Tốt nghiệp chuyên ngành Bác sĩ đa khoa tại Đại
                                học Y Hà Nội năm 2001-
                            </li>
                            <li>
                                Tốt nghiệp BSCKI chuyên ngành Nội Tim mạch tại
                                Đại học Y Hà Nội năm 2008
                            </li>
                            <li>
                                Tốt nghiệp BSCKII chuyên ngành Nội Tim mạch tại
                                Đại học Y Dược Huế năm 2016
                            </li>
                            <li>
                                Chứng chỉ siêu âm tim tại Đại học Y Dược Huế năm
                                2017
                            </li>
                            <li>
                                Chứng chỉ tiêm Nội khớp tại Đại học Y Dược TP Hồ
                                Chí Minh năm 2018
                            </li>
                        </ul>
                        <Title level={4}>Kinh nghiệm</Title>
                        <ul>
                            <li>
                                There are many variations of passages of Lorem
                                Ipsum available
                            </li>
                            <li>
                                But the majority have suffered alteration in
                                some form, by injected humour
                            </li>
                            <li>
                                Randomised words which don't look even slightly
                                believable.
                            </li>
                            <li>
                                If you are going to use a passage of Lorem Ipsum
                            </li>
                            <li>
                                You need to be sure there isn't anything
                                embarrassing hidden in the middle of text.
                            </li>
                        </ul>
                    </Card>
                </Content>
            </Layout>
        </motion.div>
    )
}
