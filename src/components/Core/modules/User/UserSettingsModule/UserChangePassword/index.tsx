'use client'
import { useRequestUpdatePasswordMutation } from '@/stores/services/auth'
import { Button, Form, Input, message } from 'antd'
import { FormProps } from 'antd/lib'
import { UserSettingProfileComponetProps } from '../UserUpdateGeneral'

export type ChangePasswordTypes = {
    currentPassword: string
    newPassword: string
}

export default function UserChangePassword({
    isProfileFetching,
    refetch,
    profile,
}: UserSettingProfileComponetProps ) {
    const [requestUpdatePassword, { isLoading }] =
        useRequestUpdatePasswordMutation()
    const onFinish: FormProps<ChangePasswordTypes>['onFinish'] = async (
        values,
    ) => {
        try {
            await requestUpdatePassword({
                newPassword: values.newPassword,
                currentPassword: values.currentPassword,
            }).unwrap()
            message.success('Thay đổi mật khẩu thành công')
        } catch (error) {
            message.error('Thay đổi mật khẩu thất bại')
        }
    }

    return (
        <div className="h-fit w-full rounded-xl bg-white p-5 shadow-third">
            <div className="h-fit w-full text-start">
                <h3 className="text-[18px] font-semibold">Thay đổi mật khẩu</h3>
            </div>
            <div className="mt-5 flex h-fit w-full flex-col gap-5">
                <Form
                    name="doctor-change-password"
                    onFinish={onFinish}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    layout="vertical"
                >
                    <div className="flex w-full flex-col gap-0">
                        <Form.Item
                            hasFeedback
                            label="Mật khẩu hiện tại"
                            name="currentPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống',
                                },
                                {
                                    pattern:
                                        /^(?=.*[a-z])(?=.*[!@#?])[A-Za-z!@#?.0-9]{8,100}$/,
                                    message: 'Mật khẩu không hợp lệ!',
                                },
                            ]}
                            validateDebounce={500}
                        >
                            <Input.Password placeholder="Nhập mật khẩu hiện tại" />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label="Mật khẩu mới"
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống',
                                },
                                {
                                    pattern:
                                        /^(?=.*[a-z])(?=.*[!@#?])[A-Za-z!@#?.0-9]{8,100}$/,
                                    message: 'Mật khẩu không hợp lệ!',
                                },
                            ]}
                            validateDebounce={500}
                        >
                            <Input.Password placeholder="Nhập mật khẩu mới" />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label="Xác nhận mật khẩu mới"
                            name="confirmNewPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('newPassword') ===
                                                value
                                        ) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(
                                            new Error('Mật khẩu không khớp'),
                                        )
                                    },
                                }),
                            ]}
                            validateDebounce={500}
                        >
                            <Input.Password placeholder="Xác nhận mật khẩu mới" />
                        </Form.Item>
                        <div>
                            <Form.Item className='!mb-0 mt-5 flex justify-end'>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isLoading}
                                >
                                    Cập nhật
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}
