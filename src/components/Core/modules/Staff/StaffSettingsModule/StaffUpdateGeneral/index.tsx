'use client'
import { useAppDispatch } from '@/hooks/redux-toolkit'
import { constants } from '@/settings'
import { updateUserFullName } from '@/stores/features/auth'
import { useUpdateStaffPrivateInformationMutation } from '@/stores/services/staff/staffSettings'
import themeColors from '@/style/themes/default/colors'
import webStorageClient from '@/utils/webStorageClient'
import { Button, DatePicker, Form, Input, message, Select } from 'antd'
import { FormProps } from 'antd/lib'
import dayjs from 'dayjs'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { StaffProfileTypes } from '../..'
import { useGetAllGenderQuery, useGetAllPositionQuery, useGetAllSpecicaltiesQuery } from '@/stores/services/enum/enum'
import { GenderEnumType, MultipleSelectionType, PositionEnumType, SpecialtyEnumType } from '../../../Doctor/DoctorSettingsModule/DoctorUpdateGeneral'

export type StaffSettingProfileComponetProps = {
    isProfileFetching: boolean
    profile: StaffProfileTypes
    refetch?: () => void
}

export default function StaffUpdateGeneral({
    isProfileFetching,
    refetch,
    profile,
}: StaffSettingProfileComponetProps) {
    const [myForm] = Form.useForm()
    const dispatch = useAppDispatch();
    const [updateStaffPrivateInformation, {isLoading}] = useUpdateStaffPrivateInformationMutation()

    
    const { positions } = useGetAllPositionQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                positions: data?.body?.positions ?? [],
            }
        },
    })

    const { gender } = useGetAllGenderQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                gender: data?.body?.genders ?? [],
            }
        },
    })

    const { specialties } = useGetAllSpecicaltiesQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                specialties: data?.body?.specialties ?? [],
            }
        },
    })
    const [specialtyList, setSpecialtyList] = useState<MultipleSelectionType[]>([])
    useEffect(() => {
        let newSpecialtyList: MultipleSelectionType[] = specialties.map((item: SpecialtyEnumType) => {
            return {
                label: item.specialtyName,
                value: item.id,
                emoji: '',
                desc: '',
            }
        })
        setSpecialtyList(newSpecialtyList);
    }, [specialties])

    const onFinish: FormProps<StaffProfileTypes>['onFinish'] = async (
        values,
    ) => {
        try {
            await updateStaffPrivateInformation(values).unwrap();
            webStorageClient.set(constants.USER_FULLNAME, values?.fullName)
            dispatch(updateUserFullName(values?.fullName!))
            message.success('Cập nhật thành công!')
            refetch && refetch()
        } catch (error) {
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
            positionId: profile?.position?.id,
            SpecialtiesId: profile?.specialties?.map((item) => item.id),
            achievement: profile?.achievement,
            description: profile?.description,
            username: profile?.username,
            dob: profile?.dob !== null ? dayjs(profile?.dob) : undefined,
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
                                <Input placeholder="Nhập số điện thoại"></Input>
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
                                <Input placeholder="Nhập địa chỉ"></Input>
                            </Form.Item>
                            <Form.Item
                                label="Chuyên khoa"
                                name="SpecialtiesId"
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
                                    placeholder="Chọn chuyên khoa"
                                    suffixIcon={
                                        <ChevronDown
                                            size={16}
                                            color={themeColors.primaryDarker}
                                        />
                                    }
                                    mode="multiple"
                                    allowClear
                                    options={specialtyList}
                                ></Select>
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
                                    placeholder="Nhập họ và tên của bạn"
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
                            <Form.Item
                                label="Chức vụ"
                                name="positionId"
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
                                    placeholder="Chọn chức vụ"
                                    suffixIcon={
                                        <ChevronDown
                                            size={16}
                                            color={themeColors.primaryDarker}
                                        />
                                    }
                                >
                                    {positions.map(
                                        (position: PositionEnumType) => {
                                            return (
                                                <Select.Option
                                                    key={position.id}
                                                    value={position.id}
                                                >
                                                    {position.positionName}
                                                </Select.Option>
                                            )
                                        },
                                    )}
                                </Select>
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
