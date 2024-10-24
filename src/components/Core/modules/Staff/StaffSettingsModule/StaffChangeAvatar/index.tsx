'use client'
import { DefaultImage } from '@/helpers/data/Default'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-toolkit'
import { constants } from '@/settings'
import { updateUserAvatar } from '@/stores/features/auth'
import { useChangeProfileAvatarMutation } from '@/stores/services/user/userSettings'
import webStorageClient from '@/utils/webStorageClient'
import { CloudUploadOutlined, MessageOutlined } from '@ant-design/icons'
import ProfileBackground from '@public/landing/images/profile-background.png'
import { Avatar, Button, message, Space, Typography, Upload } from 'antd'
import axios from 'axios'
import { useLocale } from 'next-intl'
import { useRouter } from 'next-nprogress-bar'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { StaffProfileTypes } from '../../StaffProfileModule'

type StaffUpdateProfileProps = {
    isProfileFetching: boolean
    profile: StaffProfileTypes
}

const { Title, Text, Paragraph } = Typography

export const StaffChangeAvatar = ({
    isProfileFetching,
    profile,
}: StaffUpdateProfileProps) => {
    const [imageUrl, setImageUrl] = useState<string>('')
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [changeProfileAvatar, { isLoading }] =
        useChangeProfileAvatarMutation()
    const dispatch = useAppDispatch()
    const params = useParams()

    const { user } = useAppSelector((state) => state.auth)

    const router = useRouter()
    const locale = useLocale()

    const handleUpload = async ({
        onSuccess,
        onError,
        file,
        onProgress,
    }: any) => {
        const fmData = new FormData()
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: (event: any) => {
                onProgress({ percent: (event.loaded / event.total) * 100 })
                setIsUploading(true)
            },
        }

        fmData.append('image', file)
        fmData.append('album', 'PClinic')
        try {
            const res = await axios.post(
                'https://api.imgbb.com/1/upload?key=488e7d944b2bedd5020e1ace8585d1df',
                fmData,
                config,
            )
            onSuccess('Ok')
            setImageUrl(res?.data?.data?.url)
            if (res) {
                const data = {
                    avatar: res?.data?.data?.url,
                }

                changeProfileAvatar({ avatarUrl: res?.data?.data?.url })
                webStorageClient.set(
                    constants.USER_AVATAR,
                    res?.data?.data?.url,
                )
                dispatch(updateUserAvatar(res?.data?.data?.url))
                message.success('Cập nhật ảnh thành công!')
            }
            setIsUploading(false)
        } catch (err) {
            const error = new Error('Upload Failed.')
            onError({ error })
        }
    }

    return (
        <div className="relative mb-[85px] h-[200px]">
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
                        src={user?.avatarUrl ? user?.avatarUrl : DefaultImage}
                    />
                    <div className="">
                        <p
                            className="font-bold text-secondarySupperDarker sm:text-lg md:text-2xl"
                            style={{ margin: 0 }}
                        >
                            {user?.fullName
                                ? user?.fullName
                                : 'Chưa cài đặt tên '}
                        </p>
                        <Text
                            className="sm:text-md font-medium text-secondarySupperDarker md:text-lg"
                            type="secondary"
                        >
                            {profile?.position?.positionName
                                ? profile?.position?.positionName
                                : 'Chưa có ví trí làm việc'}
                        </Text>
                        <br />
                        <Text
                            className="md:text-md font-medium text-secondarySupperDarker sm:text-sm"
                            type="secondary"
                        >
                            {profile.specialties
                                ? profile.specialties.map(
                                      (item) => item.specialtyName + ' ',
                                  )
                                : 'Chưa có chuyên khoa'}
                        </Text>
                    </div>
                </Space>
                <Space
                    className="flex h-full flex-col sm:flex-row"
                    style={{ marginLeft: 'auto' }}
                >
                    <Button
                        type="primary"
                        icon={<MessageOutlined />}
                        onClick={() => {
                            router.push(
                                `/${locale}/doctor/consultation/conversation`,
                            )
                        }}
                    >
                        Tư vấn
                    </Button>
                    <Upload
                        name="file"
                        action={
                            'https://api.imgbb.com/1/upload/key=488e7d944b2bedd5020e1ace8585d1df'
                        }
                        headers={{
                            authorization: 'authorization-text',
                        }}
                        customRequest={handleUpload}
                        multiple={false}
                        fileList={[]}
                    >
                        <Button
                            type="primary"
                            icon={<CloudUploadOutlined />}
                            loading={isLoading}
                        >
                            Đổi ảnh
                        </Button>
                    </Upload>
                </Space>
            </div>
        </div>
    )
}
