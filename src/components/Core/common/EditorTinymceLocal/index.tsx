"use client";
import useEditor from '@/hooks/useEditor';
import Script from 'next/script';
import { useEffect } from 'react';

const TinyMCEEditor = ({ content, setContent, setRawContent }: { content: string, setContent?: (content: string) => void, setRawContent?: (content: string) => void }) => {
    const { content: editorContent, TinyMCEComponent } = useEditor(content);

    useEffect(() => {
        if (setContent) setContent(editorContent);
        if (setRawContent) setRawContent(editorContent);
    }, [editorContent]);

    return (
        <div>
            {TinyMCEComponent}
        </div>
    );
};

export default TinyMCEEditor;