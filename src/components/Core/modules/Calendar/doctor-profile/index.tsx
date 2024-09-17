'use client'
import React from 'react';
import { Layout, Card, Avatar, Button, Typography, List, Divider, Row, Col, Space } from 'antd';
import { MessageOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import ProfileBackground from '@public/landing/images/profile-background.png';

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

export default function DoctorProfile() {
    return (
        <Layout style={{ minHeight: '100vh', background: '#e6f7ff' }}>
            <Content style={{ padding: '24px' }}>
                <div className='relative h-[300px] mb-20'>
                    <Image className='rounded-2xl z-1 h-[100%]' src={ProfileBackground} alt="background" />
                    <div className='absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] mb-0 z-2 flex justify-between items-center w-[90%] bg-opacity-80 bg-white p-5 rounded-2xl' style={{ marginBottom: '24px' }}>
                        <Space size="large" align="center">
                            <Avatar className='size-16 sm:size-20' icon={<UserOutlined />} />
                            <div>
                                <p className='font-bold md:text-2xl sm:text-lg' style={{ margin: 0 }}>Nguyễn Minh Hoàng Quốc</p>
                                <Text className='md:text-lg sm:text-md' type="secondary">Bác sĩ thần kinh</Text>
                                <br />
                                <Text className='md:text-md sm:text-sm' type="secondary">Chuyên khoa thần kinh</Text>
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
                        <Card className="h-full" title={<div className='text-xl'>Lịch sử khám gần đây</div>}>
                            <List
                                itemLayout="horizontal"
                                dataSource={appointments}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar icon={<UserOutlined />} />}
                                            title={<div className='font-semibold text-lg'>{item.name}</div>}
                                            description={item.time}
                                        />
                                        <div className='font-semibold text-lg'>{item.price}</div>
                                    </List.Item>
                                )}
                            />
                            <Link className="text-center block w-full" href="#">Xem thêm</Link>
                        </Card>
                    </Col>
                    <Col xs={24} xl={8}>
                        <Card className="h-full" title={<div className='text-xl'>Thông tin cá nhân</div>}>
                            <Paragraph className='text-lg'>
                                Hi, I'm Alec Thompson. Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).
                            </Paragraph>
                            <Divider />
                            <p className='text-lg my-2'><span className='font-bold'>Họ và tên:</span> Nguyễn Minh Hoàng Quốc</p>
                            <p className='text-lg my-2'><span className='font-bold'>Số điện thoại:</span> (84) 775771047</p>
                            <p className='text-lg my-2'><span className='font-bold'>Email:</span> hoangquoc.work@gmail.com</p>
                            <p className='text-lg my-2'><span className='font-bold'>Chức vụ:</span> Bác sĩ tâm thần</p>
                            <p className='text-lg my-2'><span className='font-bold'>Ngày sinh:</span> 01/01/2004</p>
                        </Card>
                    </Col>
                    <Col xs={24} xl={8}>
                        <Card className="h-full" title={<div className='text-xl'>Tin nhắn</div>}>
                            <List
                                itemLayout="horizontal"
                                dataSource={messages}
                                renderItem={(item) => (
                                    <List.Item actions={[<a className='font-bold text-base' key="list-loadmore-edit">TRẢ LỜI</a>]}>
                                        <List.Item.Meta
                                            avatar={<Avatar icon={<UserOutlined />} />}
                                            title={<div className='font-semibold text-lg'>{item.name}</div>}
                                            description={<div className="text-md">{item.message}</div>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>

                <Card title={<div className='text-xl'>Thành tựu</div>} style={{ marginTop: '24px' }}>
                    <Title level={4}>Tiểu sử</Title>
                    <ul>
                        <li>Tốt nghiệp chuyên ngành Bác sĩ đa khoa tại Đại học Y Hà Nội năm 2001-</li>
                        <li>Tốt nghiệp BSCKI chuyên ngành Nội Tim mạch tại Đại học Y Hà Nội năm 2008</li>
                        <li>Tốt nghiệp BSCKII chuyên ngành Nội Tim mạch tại Đại học Y Dược Huế năm 2016</li>
                        <li>Chứng chỉ siêu âm tim tại Đại học Y Dược Huế năm 2017</li>
                        <li>Chứng chỉ tiêm Nội khớp tại Đại học Y Dược TP Hồ Chí Minh năm 2018</li>
                    </ul>
                    <Title level={4}>Kinh nghiệm</Title>
                    <ul>
                        <li>There are many variations of passages of Lorem Ipsum available</li>
                        <li>But the majority have suffered alteration in some form, by injected humour</li>
                        <li>Randomised words which don't look even slightly believable.</li>
                        <li>If you are going to use a passage of Lorem Ipsum</li>
                        <li>You need to be sure there isn't anything embarrassing hidden in the middle of text.</li>
                    </ul>
                </Card>
            </Content>
        </Layout>
    );
}