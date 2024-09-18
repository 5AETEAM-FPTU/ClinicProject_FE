'use client'
import React from 'react'

import CommonSection from '@/components/Core/common/CommonSection'

import { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

import ZaloIcon from '@public/landing/icons/Zalo.svg'
import FacebookIcon from '@public/landing/icons/Facebook.svg'
import Image from 'next/image'
import { Button, Col, Form, FormProps, Input, message, Row, Select } from 'antd'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'

function Contact() {
    const params = useParams()
    const { t } = useTranslation(params?.locale as string, 'Landing')
    const [myForm] = Form.useForm()

    const editorRef = useRef<any>(null)
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent())
        }
    }

    const onFinish: FormProps<any>['onFinish'] = async (values) => {
        try {
            console.log('onFinishForm')
        } catch (error) {
            message.error(t('updateError'))
        }
    }

    return (
        <div>
            <CommonSection
                title={'địa chỉ - thông tin - liên hệ'}
                subtile={'Khu đô thị FPT City, Ngũ Hành Sơn, Đà Nẵng, Việt Nam'}
                tailCustomStyle="bg-gradient-to-b from-white to-secondaryLight"
            >
                <div className="flex flex-col gap-[40px]">
                    <div className="flex flex-row gap-[30px]">
                        <div className="flex h-fit w-1/2 flex-col gap-[10px]">
                            <p className="text-secondaryDark">Google Map</p>
                            <div className="h-[348px] w-full rounded-xl border-2 border-secondaryDark bg-white">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7758.582575832668!2d108.26293834401795!3d15.969150793416244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142116949840599%3A0x365b35580f52e8d5!2sFPT%20University%20Danang!5e1!3m2!1sen!2s!4v1726468311414!5m2!1sen!2s"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="h-full w-full rounded-lg"
                                ></iframe>
                            </div>
                        </div>
                        <div className="flex h-fit w-1/2 flex-col gap-[10px]">
                            {' '}
                            <p className="text-end text-secondaryDark">
                                Thời gian hoạt động
                            </p>
                            <div className="flex h-[348px] w-full flex-col gap-[15px] rounded-xl border-2 border-dashed border-secondaryDark bg-white p-[20px]">
                                <div>
                                    <h3 className="text-end text-[20px] font-bold">
                                        Phòng khám{' '}
                                        <span className="text-secondaryDark">
                                            P-Clinic
                                        </span>
                                    </h3>
                                    <p className="text-end font-semibold text-secondaryDark">
                                        Thời gian mở cửa:
                                    </p>
                                    <div className="flex h-fit w-full flex-row items-end justify-end gap-1">
                                        <div className="rounded-xl bg-secondaryDark px-[20px] py-[16px] text-[20px] font-semibold text-white">
                                            <p>Từ thứ 2 đến thứ 7</p>
                                        </div>
                                        <div className="rounded-xl bg-secondaryDark px-[20px] py-[16px] text-[20px] font-semibold text-white">
                                            <p>Từ thứ 2 đến thứ 7</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-end font-semibold text-secondaryDark">
                                        Thời gian nghỉ trong tuần
                                    </p>
                                    <div className="flex h-fit w-full flex-row items-end justify-end gap-1">
                                        <div className="rounded-xl bg-red-600 px-[20px] py-[16px] text-[20px] font-semibold text-white">
                                            <p>Chủ nhật Đóng của</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full flex-row justify-end gap-[10px]">
                                    <div className="flex h-fit flex-row items-end justify-end gap-1">
                                        <button className="flex flex-row gap-2 rounded-[20px] border-2 border-secondaryDark bg-white px-[20px] py-[16px] text-[20px] font-semibold text-secondaryDark">
                                            <Image
                                                src={FacebookIcon}
                                                alt="fbi"
                                            ></Image>
                                            <p>Facebook</p>
                                        </button>
                                    </div>
                                    <div className="flex h-fit flex-row items-end justify-end gap-1">
                                        <button className="flex flex-row gap-2 rounded-[20px] border-2 border-secondaryDark bg-white px-[20px] py-[16px] text-[20px] font-semibold text-secondaryDark">
                                            <Image
                                                src={ZaloIcon}
                                                alt="fbi"
                                            ></Image>
                                            <p>Zalo</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-fit w-full flex-col gap-2">
                        <div>
                            <p className="flex text-secondaryDark">
                                Gữi biễu mẫu trực tiếp đến hệ thống
                            </p>
                        </div>
                        <div className="h-full w-full rounded-xl bg-white p-5 shadow-secondary">
                            <Form
                                form={myForm}
                                onFinish={onFinish}
                                layout="vertical"
                            >
                                <div>
                                    <h3 className="mb-2 text-[16px] font-bold">
                                        Thông tin liên hệ của bạn
                                    </h3>
                                    <Row gutter={16}>
                                        <Col span={6} className="gutter-row">
                                            <Form.Item
                                                name={"Fullname"}
                                                label="Họ và Tên"
                                                wrapperCol={{ span: 24 }}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Vui lòng nhập họ và tên',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Họ và tên" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className="gutter-row">
                                            <Form.Item
                                                name={"Email"}
                                                label="Email hoặc số điện thoại"
                                                wrapperCol={{ span: 24 }}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Vui lòng nhập email hoặc số điện thoại',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Email hoặc số điện thoại" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className="gutter-row">
                                            <Form.Item
                                                name={"gender"}
                                                label="Giới tính"
                                                wrapperCol={{ span: 24 }}
                                            >
                                                <Select
                                                    size="large"
                                                    placeholder="Chọn giới tính của bạn"
                                                >
                                                    <Select.Option value="Nam">
                                                        Nam
                                                    </Select.Option>
                                                    <Select.Option value="Nữ">
                                                        Nữ
                                                    </Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className="gutter-row">
                                            <Form.Item
                                                name={"birthday"}
                                                label="Tuổi"
                                                wrapperCol={{ span: 24 }}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Vui lòng nhập họ và tên',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    type="number"
                                                    placeholder="Nhập tuổi của bạn"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="">
                                    <p className="text-[16px] font-bold">
                                        Nhập yêu cầu hoặc thắc mắc của bạn với
                                        chúng tôi
                                    </p>
                                    <Row gutter={24}>
                                        <Col span={24}>
                                            <Form.Item
                                                name={"content"}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Vui lòng nhập nội dung',
                                                    },
                                                ]}
                                            >
                                                <Editor
                                                    onInit={(_, editor) => {
                                                        editorRef.current =
                                                            editor
                                                    }}
                                                    ref={editorRef}
                                                    apiKey="kf6v30dw6u6pqnzquj9slxf6eb3a3o1fauu1it6whe4zy9l6"
                                                    init={{
                                                        height: 200,
                                                        statusbar: false,
                                                        plugins: [
                                                            // Core editing features
                                                            'anchor',
                                                            'autolink',
                                                            'charmap',
                                                            'codesample',
                                                            'emoticons',
                                                            'image',
                                                            'link',
                                                            'lists',
                                                            'media',
                                                            'searchreplace',
                                                            'table',
                                                            'visualblocks',
                                                            'wordcount',
                                                            // Your account includes a free trial of TinyMCE premium features
                                                            // Try the most popular premium features until Sep 30, 2024:
                                                            'checklist',
                                                            'mediaembed',
                                                            'casechange',
                                                            'export',
                                                            'formatpainter',
                                                            'pageembed',
                                                            'a11ychecker',
                                                            'tinymcespellchecker',
                                                            'permanentpen',
                                                            'powerpaste',
                                                            'advtable',
                                                            'advcode',
                                                            'editimage',
                                                            'advtemplate',
                                                            'ai',
                                                            'mentions',
                                                            'tinycomments',
                                                            'tableofcontents',
                                                            'footnotes',
                                                            'mergetags',
                                                            'autocorrect',
                                                            'typography',
                                                            'inlinecss',
                                                            'markdown',
                                                        ],
                                                        menubar: false,
                                                        toolbar:
                                                            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                                        tinycomments_mode:
                                                            'embedded',
                                                        tinycomments_author:
                                                            'Author name',
                                                        mergetags_list: [
                                                            {
                                                                value: 'First.Name',
                                                                title: 'First Name',
                                                            },
                                                            {
                                                                value: 'Email',
                                                                title: 'Email',
                                                            },
                                                        ],
                                                        ai_request: (
                                                            request: any,
                                                            respondWith: any,
                                                        ) =>
                                                            respondWith.string(
                                                                () =>
                                                                    Promise.reject(
                                                                        'See docs to implement AI Assistant',
                                                                    ),
                                                            ),
                                                    }}
                                                ></Editor>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                                <Form.Item className='!mb-0'>
                                    <Button htmlType="submit" type="primary" onClick={log}>
                                        Xác nhận gửi
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </CommonSection>
        </div>
    )
}

export default Contact
