import { useCallback, useEffect, useState } from 'react';
import Script from 'next/script';

const TinyMCEComponent = ({ content, handleScriptLoad }: { content: string, handleScriptLoad: () => void }) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true); // Đánh dấu component đã được mount
    }, []);

    return (
        <div>
            {isMounted && (
                <>
                    {/* Tải script jQuery trước */}
                    <Script
                        src="https://code.jquery.com/jquery-3.6.0.min.js"
                        strategy="afterInteractive"
                        onLoad={() => console.log('jQuery script loaded')}
                    />
                    {/* Tải TinyMCE script sau khi jQuery đã tải */}
                    <Script
                        src="/assets/libs/tinymce/tinymce.min.js"
                        strategy="afterInteractive"
                        onLoad={() => handleScriptLoad()}
                    />
                </>
            )}
            {/* Textarea cho TinyMCE */}
            <textarea id={`elm1`} defaultValue={content} />
        </div>
    );
};

const useEditor = (initContent: string) => {
    const [content, setContent] = useState(initContent);
    const [rawContent, setRawContent] = useState(initContent);
    const [isScriptReady, setIsScriptReady] = useState(false);
    console.log("Hi");
    useEffect(() => {
        let windowAny = window as any;

        // Kiểm tra và khởi tạo TinyMCE khi script đã sẵn sàng
        const initTinyMCE = () => {
            if (typeof window !== 'undefined' && windowAny.tinymce && isScriptReady) {
                windowAny.tinymce.init({
                    selector: `textarea#elm1`,
                    height: 300,
                    plugins: [
                        'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
                        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                        'save table contextmenu directionality emoticons template paste textcolor',
                    ],
                    toolbar:
                        'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
                    setup: (editor: any) => {
                        editor.on('change', () => {
                            const updatedContent = editor.getContent();
                            const rawContent = editor.getContent({ format: 'text' });
                            setRawContent(rawContent);
                            setContent(updatedContent);
                        });
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
        };

        // Đợi script sẵn sàng và gọi initTinyMCE
        if (isScriptReady) {
            initTinyMCE();
        }

        // Cleanup khi component unmount
        return () => {
            if (typeof window !== 'undefined' && windowAny.tinymce) {
                windowAny.tinymce.remove('textarea#elm1');
            }
        };
    }, [isScriptReady]);

    // Đặt trạng thái khi script đã tải xong
    const handleScriptLoad = () => {
        setIsScriptReady(true);
    };

    return {
        content,
        setContent,
        TinyMCEComponent: <TinyMCEComponent content={content} handleScriptLoad={handleScriptLoad} />,
        rawContent,
    };
};

export default useEditor;