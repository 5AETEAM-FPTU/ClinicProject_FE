import EditorTinymce, {
    getEditorHtmlContent,
} from '@/components/Core/common/EditorTinymce'
import { useUpdateUserDescriptionMutation } from '@/stores/services/user/userSettings'
import { Button, message } from 'antd'
import { Edit } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { UserSettingProfileComponetProps } from '../UserUpdateGeneral'


export default function UserUpdateDescription({
    isProfileFetching,
    refetch,
    profile,
}: UserSettingProfileComponetProps) {
    const [editInitContent, setEditInitContent] = useState<string| null> (null); 
    const editorRef = useRef<any>(null)
    const [updateUserDescription, {isLoading}] = useUpdateUserDescriptionMutation();
    const [isEdit, setIsEdit] = useState<boolean>(false)

    useEffect(() => {
        setEditInitContent(profile?.description || profile?.description === '' ? profile?.description : null)
    }, [profile])


    const handleUpdate = async () => {
        const content = getEditorHtmlContent(editorRef)
        console.log("edit", content)
        try {
            if(content){
                await updateUserDescription({description: content}).unwrap()
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
                <h3 className="text-[18px] font-semibold">Mô tả về bản thân</h3>
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
                            Không có mô tả, câp nhật ngay!
                        </p>
                    )}
                </div>
                <div>
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
                    <div>
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
