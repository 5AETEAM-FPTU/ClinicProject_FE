'use client'
import React from 'react';
import { Layout, Card, Avatar, Button, Typography, List, Divider, Row, Col, Space } from 'antd';
import { MessageOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import ProfileBackground from '@public/landing/images/profile-background.png';
import {motion} from 'framer-motion';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const appointments = [
    { name: 'Mai Sương', time: '7:00 - 8:00 29/9/2024', price: '200.000 VND' },
    { name: 'Phương', time: '8:30 - 9:00 28/9/2024', price: '150.000 VND' },
    { name: 'Bích Ly', time: '7:00 - 8:00 27/9/2024', price: '200.000 VND' },
];

const messages = [
    { name: 'Mai Sương', message: 'Hi! I need more information...' },
    { name: 'Phương', message: 'Awesome work, can you...' },
    { name: 'Bích Ly', message: 'About files I can...' },
    { name: 'Anh Tuấn', message: 'Have a great afternoon...' },
    { name: 'Nguyễn Văn Bầu', message: 'Hi! I need more information...' },
];

export default function UserProfileModule() {
    return (
        <motion.div initial={{ opacity: 0, translateY: 10 }} animate={{ opacity: 1, translateY: 0 }} exit={{ opacity: 0 }}>
            <Layout style={{ minHeight: '100vh'}} className='bg-dashboardBackground'>
            <Content style={{ padding: '0px' }}>
                <div className='relative h-[300px] mb-[85px]'>
                    <Image className='w-full rounded-2xl z-1 h-[100%]' src={ProfileBackground} alt="background" />
                    <div className='absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] mb-0 z-2 flex justify-between items-center w-[90%] bg-opacity-85 bg-white p-5 rounded-2xl' style={{ marginBottom: '24px' }}>
                        <Space size="large" align="center">
                            <Avatar shape='square' className='size-16 sm:size-20 rounded-xl' icon={<UserOutlined />} />
                            <div className=''>
                                <p className='font-bold text-secondarySupperDarker md:text-2xl sm:text-lg' style={{ margin: 0 }}>Nguyễn Minh Hoàng Quốc</p>
                                <Text className='md:text-lg sm:text-md font-medium text-secondarySupperDarker' type="secondary">Bác sĩ thần kinh</Text>
                                <br />
                                <Text className='md:text-md sm:text-sm font-medium text-secondarySupperDarker' type="secondary">Chuyên khoa thần kinh</Text>
                            </div>
                        </Space>
                        <Space className='h-full flex flex-col sm:flex-row' style={{ marginLeft: 'auto' }}>
                            <Button className='font-semibold text-md sm:text-lg' type="text" icon={<MessageOutlined />}>Tin nhắn</Button>
                            <Button className='font-semibold text-md sm:text-lg' type="text" icon={<SettingOutlined />}>Cài đặt</Button>
                        </Space>
                    </div>
                </div>

                <Row gutter={[24, 16]} justify="space-between">
                    <Col xs={24} xl={8}>
                        <Card bordered={false} headStyle={{ borderBottom: 'none' }} className="h-full !border-none !shadow-third " title={<div className='text-xl text-secondarySupperDarker font-bold'
                            
                        >Lịch sử khám gần đây</div>}>
                            <List
                                itemLayout="horizontal"
                                dataSource={appointments}
                                bordered={false}
                                renderItem={(item) => (
                                    <List.Item className='!border-b-0'>
                                        <List.Item.Meta
                                            avatar={<Avatar shape='square' size={48} icon={<UserOutlined />} />}
                                            title={<div className='text-secondarySupperDarker font-semibold text-lg'>{item.name}</div>}
                                            description={<div className='text-secondarySupperDarker'>{item.time}</div>}
                                        />
                                        <Button type='primary' className='bg-secondaryDark !p-5 rounded-xl font-medium'>
                                            Chi tiết 
                                        </Button>
                                    </List.Item>
                                )}
                            />
                            {/* <Link className="text-center block w-full text-secondarySupperDarker" href="#">Xem thêm</Link> */}
                        </Card>
                    </Col>
                    <Col xs={24} xl={8}>
                        <Card className="h-full !border-none !shadow-third" headStyle={{borderBottom: 'none'}} bordered={false} title={<div className='text-xl text-secondarySupperDarker font-bold'>Thông tin cá nhân</div>}>
                            <Paragraph className='text-lg text-secondarySupperDarker'>
                                Hi, I'm Alec Thompson. Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).
                            </Paragraph>
                            <Divider />
                            <p className='text-lg my-2 text-secondarySupperDarker font-semibold'><span className='font-bold text-secondarySupperDarker'>Họ và tên:</span> Nguyễn Minh Hoàng Quốc</p>
                            <p className='text-lg my-2 text-secondarySupperDarker font-semibold'><span className='font-bold text-secondarySupperDarker'>Số điện thoại:</span> (84) 775771047</p>
                            <p className='text-lg my-2 text-secondarySupperDarker font-semibold'><span className='font-bold text-secondarySupperDarker'>Email:</span> hoangquoc.work@gmail.com</p>
                            <p className='text-lg my-2 text-secondarySupperDarker font-semibold'><span className='font-bold text-secondarySupperDarker'>Chức vụ:</span> Bác sĩ tâm thần</p>
                            <p className='text-lg my-2 text-secondarySupperDarker font-semibold'><span className='font-bold text-secondarySupperDarker'>Ngày sinh:</span> 01/01/2004</p>
                        </Card>
                    </Col>
                    <Col xs={24} xl={8}>
                        <Card className="h-full !border-none !shadow-third" headStyle={{borderBottom: 'none'}} bordered={false} title={<div className='text-xl text-secondarySupperDarker font-bold'>Tin nhắn</div>}>
                            <List
                                itemLayout="horizontal"
                                dataSource={messages}
                                renderItem={(item) => (
                                    <List.Item className='!border-none' actions={[<a className='font-bold text-base' key="list-loadmore-edit !text-secondarySupperDarker">TRẢ LỜI</a>]}>
                                        <List.Item.Meta
                                            avatar={<Avatar shape='square' size={48} icon={<UserOutlined />} />}
                                            title={<div className='font-semibold text-lg text-secondarySupperDarker'>{item.name}</div>}
                                            description={<div className="text-md text-secondarySupperDarker">{item.message}</div>}
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
    );
}