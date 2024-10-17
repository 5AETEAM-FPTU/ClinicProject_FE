import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useRef, useState } from 'react'

export type EditorTinymceProps = {
    initContent?: string | null
    editorRef: React.MutableRefObject<any>
    content?: string | null,
    onChange?: (content: string) => void
}

export default function EditorTinymce({
    initContent,
    editorRef,
    content,
    onChange,
}: EditorTinymceProps) {
    const [isInited, setIsInited] = useState(false)
    const getEditorContent = () => {
        if (editorRef.current) {
            return editorRef.current.getContent()
        }
        return ''
    }

    useEffect(() => {
        if (isInited && editorRef.current && content) {
            editorRef.current.setContent(content)
        }
    }, [isInited])



    return (
        <>
            <Editor
                onChange={(event) => {
                    const value = event.target.getContent();
                    if (onChange && value) {
                        onChange(value)
                    }
                }}
                onInit={(_, editor) => {
                    editorRef.current = editor;
                    setIsInited(true);
                }}
                ref={editorRef}
                apiKey="kf6v30dw6u6pqnzquj9slxf6eb3a3o1fauu1it6whe4zy9l6"
                init={{
                    content: initContent,
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

                    ],
                    menubar: false,
                    toolbar:
                        'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
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
                    ai_request: (request: any, respondWith: any) =>
                        respondWith.string(() =>
                            Promise.reject(
                                'See docs to implement AI Assistant',
                            ),
                        ),
                }}
            ></Editor>
        </>
    )
}

export const getEditorHtmlContent = (
    editorRef: React.MutableRefObject<any>,
) => {
    if (editorRef.current) {
        return editorRef.current.getContent()
    }
    return ''
}

export const getRawContent = (
    editorRef: React.MutableRefObject<any>,
) => {
    if (editorRef.current) {
        return editorRef.current.getContent({ format: 'text' })
    }
    return ''
}

export const setEditorContent = (editorRef: React.MutableRefObject<any>, content: string) => {
    if (editorRef.current) {
        return editorRef.current.setContent(content)
    }
    return ''
}
