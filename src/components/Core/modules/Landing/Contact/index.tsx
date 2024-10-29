'use client'
import { useEffect, useState } from 'react'

import CommonSection from '@/components/Core/common/CommonSection'

import { useTranslation } from '@/app/i18n/client'
import { constants } from '@/settings'
import { useCreateNewContactMutation } from '@/stores/services/contact'
import { api } from '@convex/_generated/api'
import FacebookIcon from '@public/landing/icons/Facebook.svg'
import ZaloIcon from '@public/landing/icons/Zalo.svg'
import { Button, Col, Form, FormProps, Input, message, Row, Select } from 'antd'
import { useMutation } from 'convex/react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import useEditor from '@/hooks/useEditor'

function Contact() {
    const [createAContact, { isLoading }] = useCreateNewContactMutation()
    const [isClient, setIsClient] = useState<boolean>(false)
    useEffect(() => {
        setIsClient(true)
    }, [])
    const params = useParams()
    const { t } = useTranslation(params?.locale as string, 'Landing')
    const [myForm] = Form.useForm()

    const { content, getContentFromEditor, TinyMCEComponent } = useEditor(""); 

    const sendContactToAdmin = useMutation(
        api._user_notifications.functions.sendUserNotification,
    )

    const handleSendContactToAdmin = async (
        fullName: string,
        description: string,
    ) => {
        try {
            await sendContactToAdmin({
                receiverId: '1a6c3e77-4097-40e2-b447-f00d1f82cf78', // admin
                message: 'Liên hệ từ người dùng',
                type: constants.NOTIFICATION_TYPES.INFO,
                description: `Bạn đã nhận được liên hệ từ ${fullName} vào lúc ${dayjs(new Date()).format('HH:mm A')} với nội dung:
                            ${description} , `,
                senderAvatarUrl: ``,
                senderId: '',
                senderName: `Người dùng: ${fullName}`,
                topic: 'Liên hệ',
                href: '',
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onFinish: FormProps<any>['onFinish'] = async (values) => {
        try {
            if (!content) {
                message.error(
                    'Vui lòng nhập nội dung yêu cầu hoặc thắc mắc của bạn',
                )
                return
            }
            await createAContact({ ...values, content: getContentFromEditor() })
            console.log('onFinishForm')
            handleSendContactToAdmin(values.fullName, getContentFromEditor())
            message.success('Gửi thông tin thành công')
            myForm.resetFields()
        } catch (error) {
            message.error(t('updateError'))
        }
    }

    return (
        <div id="contact">
            <CommonSection
                title={t('contact_title')}
                subtile={t('contact_sub')}
                tailCustomStyle="bg-gradient-to-b from-white to-secondaryLight"
            >
                <div className="flex flex-col gap-[40px]">
                    <div className="flex flex-col gap-[30px] sm:flex-row">
                        <div className="flex h-fit w-full flex-col gap-[10px] sm:w-1/2">
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
                        <div className="flex h-fit w-full flex-col gap-[10px] sm:w-1/2">
                            {' '}
                            <p className="text-end text-secondaryDark">
                                {t('work_title')}
                            </p>
                            <div className="flex h-fit w-full flex-col gap-[15px] rounded-xl border-2 border-dashed border-secondaryDark bg-white p-[20px] sm:h-[348px]">
                                <div>
                                    <h3 className="text-end text-[20px] font-bold">
                                        {t('work_name')}{' '}
                                        <span className="text-secondaryDark">
                                            P-Clinic
                                        </span>
                                    </h3>
                                    <p className="text-end font-semibold text-secondaryDark">
                                        {t('work_start')}
                                    </p>
                                    <div className="flex h-fit w-full flex-row items-end justify-end gap-1">
                                        <div className="rounded-xl bg-secondaryDark px-[15px] py-[10px] text-[14px] font-semibold text-white sm:px-[20px] sm:py-[16px] sm:text-[20px]">
                                            <p>{t('work_2_7')}</p>
                                        </div>
                                        <div className="rounded-xl bg-secondaryDark px-[15px] py-[10px] text-[14px] font-semibold text-white sm:px-[20px] sm:py-[16px] sm:text-[20px]">
                                            <p>7:00 AM - 6:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-end font-semibold text-secondaryDark">
                                        {t('work_end')}
                                    </p>
                                    <div className="flex h-fit w-full flex-row items-end justify-end gap-1">
                                        <div className="ms:px-[20px] rounded-xl bg-red-600 px-[15px] py-[10px] text-[14px] font-semibold text-white sm:py-[16px] sm:text-[20px]">
                                            <p>{t('work_rest')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full flex-row justify-end gap-[10px]">
                                    <div className="flex h-fit flex-row items-end justify-end gap-1">
                                        <button className="flex flex-row items-center gap-2 rounded-[20px] border-2 border-secondaryDark bg-white px-[15px] py-[10px] text-[14px] font-semibold text-secondaryDark sm:px-[20px] sm:py-[16px] sm:text-[20px]">
                                            <Image
                                                src={FacebookIcon}
                                                alt="fbi"
                                                className="h-[28px] w-[28px] sm:h-[32px] sm:w-[32px]"
                                            ></Image>
                                            <p>Facebook</p>
                                        </button>
                                    </div>
                                    <div className="flex h-fit flex-row items-end justify-end gap-1">
                                        <button className="flex flex-row items-center gap-2 rounded-[20px] border-2 border-secondaryDark bg-white px-[15px] py-[10px] text-[14px] font-semibold text-secondaryDark sm:px-[20px] sm:py-[16px] sm:text-[20px]">
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
                                {t('form_title')}
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
                                        {t('form_contact')}
                                    </h3>
                                    <Row gutter={24}>
                                        <Col
                                            xs={24}
                                            lg={6}
                                            className="gutter-row"
                                        >
                                            <Form.Item
                                                name={'fullName'}
                                                label={t('form_name')}
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
                                                    placeholder={t('form_name')}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col
                                            xs={24}
                                            lg={6}
                                            className="gutter-row"
                                        >
                                            <Form.Item
                                                name={'emailOrPhone'}
                                                label={t('form_email')}
                                                wrapperCol={{ span: 24 }}
                                                validateTrigger="onBlur"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Vui lòng nhập email hoặc số điện thoại',
                                                    },
                                                    {
                                                        validator(_, value) {
                                                            if (!value) {
                                                                return Promise.resolve() // If empty, handled by 'required'
                                                            }

                                                            // Email regex
                                                            const emailRegex =
                                                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/

                                                            // Vietnamese phone number regex (starts with +84 or 0 and has 9 or 10 digits)
                                                            const phoneRegex =
                                                                /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/

                                                            if (
                                                                emailRegex.test(
                                                                    value,
                                                                ) ||
                                                                phoneRegex.test(
                                                                    value,
                                                                )
                                                            ) {
                                                                return Promise.resolve()
                                                            }

                                                            return Promise.reject(
                                                                new Error(
                                                                    'Vui lòng nhập email hoặc số điện thoại hợp lệ',
                                                                ),
                                                            )
                                                        },
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder={t(
                                                        'form_email',
                                                    )}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col
                                            xs={24}
                                            lg={6}
                                            className="gutter-row"
                                        >
                                            <Form.Item
                                                name={'gender'}
                                                label={t('form_gender')}
                                                wrapperCol={{ span: 24 }}
                                            >
                                                <Select
                                                    size="large"
                                                    placeholder={t(
                                                        'form_gender',
                                                    )}
                                                >
                                                    <Select.Option value="1">
                                                        Nam
                                                    </Select.Option>
                                                    <Select.Option value="2">
                                                        Nữ
                                                    </Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col
                                            xs={24}
                                            lg={6}
                                            className="gutter-row"
                                        >
                                            <Form.Item
                                                name={'age'}
                                                label={t('form_age')}
                                                wrapperCol={{ span: 24 }}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Vui lòng nhập tuổi',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    type="number"
                                                    placeholder={t('form_age')}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="">
                                    <p className="text-[16px] font-bold">
                                        {t('form_message')}
                                    </p>
                                    <Row gutter={24}>
                                        <Col span={24}>
                                            {TinyMCEComponent}
                                        </Col>
                                    </Row>
                                </div>
                                <Form.Item className="!mb-0 mt-5">
                                    <Button
                                        className="float-end bg-secondaryDark"
                                        loading={isLoading}
                                        htmlType="submit"
                                        type="primary"
                                    >
                                        {t('form_sending')}
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
