// "use client";
// import useEditor from '@/hooks/useEditor';
// import { useEffect } from 'react';

// const TinyMCEEditor = ({ content, setContent, setRawContent }: { content: string, setContent?: (content: string) => void, setRawContent?: (content: string) => void }) => {
//     const { content: editorContent, TinyMCEComponent, getContentFromEditor, set } = useEditor(content);

//     useEffect(() => {
//         if (setContent) setContent(editorContent);
//         if (setRawContent) setRawContent(rawContent);
//     }, [editorContent]);

//     return (
//         <div>
//             {TinyMCEComponent}
//         </div>
//     );
// };

// export default TinyMCEEditor;