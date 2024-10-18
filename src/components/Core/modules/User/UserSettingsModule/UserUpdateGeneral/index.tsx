import React, { useEffect } from 'react'
import { Button, DatePicker, Form, Input, message, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ChevronDown, Save } from 'lucide-react'
import themeColors from '@/style/themes/default/colors'
import CommonSelect from '@/components/Core/common/CommonSelect'
import { FormProps } from 'antd/lib'
import { useUpdateDoctorPrivateInformationMutation } from '@/stores/services/doctor/doctorSettings'
import webStorageClient from '@/utils/webStorageClient'
import { constants } from '@/settings'
import { useAppDispatch } from '@/hooks/redux-toolkit'
import { updateUserFullName } from '@/stores/features/auth'
import dayjs from 'dayjs'
import { UserProfileTypes } from '../..'
import { useUpdateUserPrivateInformationMutation } from '@/stores/services/user/userSettings'
import { useGetAllGenderQuery } from '@/stores/services/enum/enum'
import { GenderEnumType } from '../../../Doctor/DoctorSettingsModule/DoctorUpdateGeneral'

export type UserSettingProfileComponetProps = {
    isProfileFetching: boolean
    profile: UserProfileTypes
    refetch?: () => void
}

export default function UserUpdateGeneral({
    isProfileFetching,
    refetch,
    profile,
}: UserSettingProfileComponetProps) {
    const [myForm] = Form.useForm()
    const dispatch = useAppDispatch();
    const [updateUserPrivateInformation, {isLoading}] = useUpdateUserPrivateInformationMutation();

    const { gender } = useGetAllGenderQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                gender: data?.body?.genders ?? [],
            }
        },
    })
    
    const onFinish: FormProps<UserProfileTypes>['onFinish'] = async (
        values,
    ) => { 
        try {
            await updateUserPrivateInformation(values).unwrap();
            webStorageClient.set(constants.USER_FULLNAME, values?.fullName)
            dispatch(updateUserFullName(values?.fullName!))
            message.success('Cập nhật thành công!')
            refetch && refetch()
        } catch (error) {
            console.log(error)
            refetch && refetch()
            message.error('Cập nhật thất bại!')
        }
    }

    useEffect(() => {
        myForm.setFieldsValue({
            fullName: profile?.fullName,
            phoneNumber: profile?.phoneNumber,
            address: profile?.address,
            genderId: profile?.gender?.id,
            description: profile?.description,
            username: profile?.username,
            dob: profile?.dob !== null ? dayjs(profile?.dob): undefined
        })
    }, [profile])
    return (
        <div className="h-fit w-full rounded-xl bg-white p-5 shadow-third">
            <div className="h-fit w-full text-start">
                <h3 className="text-[18px] font-semibold">Thông tin cá nhân</h3>
            </div>
            <div className="h-fit w-full mt-5">
                <Form
                    name="generalUpdateDoctorInformation"
                    onFinish={onFinish}
                    layout="vertical"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    form={myForm}
                >
                    <div className="flex h-fit w-full flex-row gap-5">
                        <div className="h-fit w-full">
                            <Form.Item
                                label="Họ và tên"
                                name="fullName"
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập họ và tên của bạn"></Input>
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phoneNumber"
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập họ và tên của bạn"></Input>
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập họ và tên của bạn"></Input>
                            </Form.Item>
                            
                        </div>
                        <div className="h-fit w-full">
                            <Form.Item
                                label="Giới tính"
                                name="genderId"
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Select
                                    className="border-secondarySupperDarker border-opacity-60 placeholder:text-secondarySupperDarker placeholder:!text-opacity-60 focus:hover:!border-secondarySupperDarker"
                                    placeholder="Chọn giới tính"
                                    suffixIcon={
                                        <ChevronDown
                                            size={16}
                                            color={themeColors.primaryDarker}
                                        />
                                    }
                                >
                                   {gender?.map((item: GenderEnumType) => (
                                        <Select.Option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.genderName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Ngày sinh"
                                name="dob"
                                wrapperCol={{ span: 24 }}
                               
                            >
                                <DatePicker
                                    format={'DD/MM/YYYY'}
                                    size="large"
                                    className='!w-full'
                                    placeholder="Nhập ngày sinh"
                                ></DatePicker>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="flex w-full justify-end">
                        <Button
                            htmlType="submit"
                            className="1p-5"
                            type="primary"
                            loading={isLoading}
                        >
                            Cập nhật
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}
