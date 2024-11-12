import { useEffect, useRef, useState } from 'react';

const TinyMCEComponent = ({ content, editorRef }: { content: string, editorRef: any }) => {
    let windowAny = typeof window !== 'undefined' && window as any;
    const initTinyMCE = () => {
        let windowAny = window as any;
        try {
            console.log("initTinyMCE: " + windowAny.tinymce);
            if (typeof window !== 'undefined' && windowAny.tinymce) {
                console.log("initTinyMCE");
                windowAny.tinymce.init({
                    selector: `#elm1`,
                    height: 300,
                    statusbar: false,
                    plugins: [
                        'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
                        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                        'save table contextmenu directionality emoticons template paste textcolor',
                    ],
                    toolbar:
                        'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
                    setup: (editor: any) => {
                        editorRef.current = editor;
                    },
                    style_formats: [
                        { title: 'Bold text', inline: 'b' },
                        { title: 'Red text', inline: 'span', styles: { color: '#ff0000' } },
                        { title: 'Red header', block: 'h1', styles: { color: '#ff0000' } },
                        { title: 'Example 1', inline: 'span', classes: 'example1' },
                        { title: 'Example 2', inline: 'span', classes: 'example2' },
                        { title: 'Table styles' },
                        { title: 'Table row 1', selector: 'tr', classes: 'tablerow1' },
                    ],
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            let windowAny = window as any;
            if (typeof window !== 'undefined' && windowAny.tinymce) {
                windowAny.tinymce.remove(`textarea#elm1`);
            }
            initTinyMCE();
            return () => {
                if (typeof window !== 'undefined' && windowAny.tinymce) {
                    windowAny.tinymce.remove(`textarea#elm1`);
                }
            }
        }, 0);

    }, [windowAny.tinymce]);
    return (
        <div>
            {/* Textarea cho TinyMCE */}
            <textarea id={`elm1`} defaultValue={content} />
        </div>
    );
};

const useEditor = (initContent: string) => {
    const editorRef = useRef(null);
    const getContentFromEditor = () => {
        if (editorRef.current) {
            return (editorRef.current as any).getContent(); // Lấy nội dung HTML từ editor
        }
        return ""; // Trả về chuỗi rỗng nếu editor chưa được khởi tạo
    };

    const getRawContentFromEditor = () => {
        if (editorRef.current) {
            return (editorRef.current as any).getContent({ format: 'text' }); // Lấy nội dung text từ editor
        }
        return ""; // Trả về chuỗi rỗng nếu editor chưa được khởi tạo
    }

    return {
        content: initContent,
        getContentFromEditor,
        TinyMCEComponent: <TinyMCEComponent content={initContent} editorRef={editorRef} />,
        getRawContentFromEditor,
    };
};

export default useEditor;