import EditorTinymce, {
    getEditorHtmlContent,
} from '@/components/Core/common/EditorTinymce'
import { useAppDispatch } from '@/hooks/redux-toolkit'
import { useUpdateDoctorAchievementMutation, useUpdateDoctorDescriptionMutation } from '@/stores/services/doctor/doctorSettings'
import { Button, Form, message } from 'antd'
import { Edit } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { DoctorProfileTypes } from '..'
import { DoctorSettingProfileComponetProps } from '../DoctorUpdateGeneral'

export default function DoctorUpdateAchievement({
    isProfileFetching,
    refetch,
    profile,
}: DoctorSettingProfileComponetProps) {
    const [editInitContent, setEditInitContent] = useState<string| null> (null); 
    const editorRef = useRef<any>(null)
    const [updateDoctorAchievement, {isLoading}] = useUpdateDoctorAchievementMutation();
    const [isEdit, setIsEdit] = useState<boolean>(false)

    useEffect(() => {
        setEditInitContent(profile?.achievement || profile?.achievement === '' ? profile?.achievement : null)
    }, [profile])

    const handleUpdate = async () => {
        const content:string = getEditorHtmlContent(editorRef)
        try {
            if(content){
                await updateDoctorAchievement({achievement: content}).unwrap()
                setEditInitContent(content);
                message.success('Cập nhật thành công!')
            }
        } catch (error) {
            message.success('Cập nhật thất bại!')
        }
    }

    return (
        <div className="h-fit w-full rounded-xl bg-white p-5 shadow-third">
            <div className="h-fit w-full text-start">
                <h3 className="text-[18px] font-semibold">Thành tựu</h3>
            </div>
            <div className="mt-5 flex h-fit w-full flex-col gap-5">
                <div>
                    {profile?.description || profile?.description === '' ? (
                        <p
                            dangerouslySetInnerHTML={{
                                __html: editInitContent!,
                            }}
                        ></p>
                    ) : (
                        <p onClick={() => setIsEdit(true)}>
                            Chưa có thành tựu, câp nhật ngay!
                        </p>
                    )}
                </div>
                <div className='w-full flex justify-end'>
                    <Button
                        type="primary"
                        onClick={() => setIsEdit(!isEdit)}
                        icon={<Edit size={18} />}
                    >
                        Chỉnh sửa
                    </Button>
                </div>
                {isEdit && (
                    <div>
                        <EditorTinymce
                            initContent={profile?.description!}
                            editorRef={editorRef}
                        />
                    </div>
                )}
                {isEdit && (
                    <div className='w-full flex justify-end'>
                        <Button
                            type="primary"
                            onClick={() => {
                                handleUpdate()
                            }}
                            loading={isLoading}
                        >
                            Cập nhật
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
