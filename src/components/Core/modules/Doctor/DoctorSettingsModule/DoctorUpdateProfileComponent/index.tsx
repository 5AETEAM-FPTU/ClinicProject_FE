'use client'
import React, { useState } from 'react'
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
    message,
    Upload,
} from 'antd'
import {
    CloudUploadOutlined,
    MessageOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-toolkit'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import { useChangeProfileAvatarMutation } from '@/stores/services/user/userSettings'
import webStorageClient from '@/utils/webStorageClient'
import { constants } from '@/settings'
import { useRouter } from 'next-nprogress-bar'
import { useLocale } from 'next-intl'
import axios from "axios";
import { updateUserAvatar } from '@/stores/features/auth'
import { DefaultImage } from '@/helpers/data/Default'
import ProfileBackground from '@public/landing/images/profile-background.png'

const { Title, Text, Paragraph } = Typography

export const UpdateProfileComponent = () => {
    const [imageUrl, setImageUrl] = useState<string>('')
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [changeProfileAvatar] = useChangeProfileAvatarMutation()
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
        const fmData = new FormData();
        const config = {
          headers: { "content-type": "multipart/form-data" },
          onUploadProgress: (event: any) => {
            onProgress({ percent: (event.loaded / event.total) * 100 });
            setIsUploading(true);
          },
        };
    
        fmData.append("image", file);
        fmData.append("album", "PClinic")
        try {
          const res = await axios.post(
            "https://api.imgbb.com/1/upload?key=488e7d944b2bedd5020e1ace8585d1df",
            fmData,
            config
          );
          onSuccess("Ok");
          setImageUrl(res?.data?.data?.url);
          if (res) {
            const data = {
              avatar: res?.data?.data?.url,
            };
    
            changeProfileAvatar({avatarUrl: res?.data?.data?.url});
            webStorageClient.set(constants.USER_AVATAR, res?.data?.data?.url);
            dispatch(updateUserAvatar(res?.data?.data?.url));
            message.success("Cập nhật ảnh thành công!");
          }
          setIsUploading(false);
        } catch (err) {
          const error = new Error("Upload Failed.");
          onError({ error });
        }
    }

    return (
        <div className="relative mb-[85px] h-[200px]">
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
                        src={user?.avatarUrl ? user.avatarUrl : DefaultImage}
                    />
                    <div className="">
                        <p
                            className="font-bold text-secondarySupperDarker sm:text-lg md:text-2xl"
                            style={{ margin: 0 }}
                        >
                            {user?.fullName}
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
                        type='primary'
                        className="text-md font-semibold sm:text-lg"
                        icon={<MessageOutlined/>}
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
                            loading={isUploading}
                        >
                            Đổi ảnh
                        </Button>
                    </Upload>
                   
                </Space>
            </div>
        </div>
    )
}