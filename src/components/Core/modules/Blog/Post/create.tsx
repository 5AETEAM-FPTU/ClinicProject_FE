"use client";
import React, { useEffect, useState } from 'react';
import { Input, Upload, Select, Button, message, Tag, SelectProps, Skeleton, Form } from 'antd';
import { ImageUp } from 'lucide-react';
import './style.css'
import TextArea from 'antd/es/input/TextArea';
import EditorTinymce from '@/components/Core/common/EditorTinymce';
import axios from 'axios';
import { useCreatePostMutation, useGetAllActiveCategoriesQuery } from '@/stores/services/blog/blog';

const { Option } = Select;
type TagRender = SelectProps['tagRender'];


export default function BlogPostCreation() {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const editorRef = React.useRef<any>(null);
    const [form] = Form.useForm();
    const [createPost, { isLoading: isCreateLoading }] = useCreatePostMutation();
    const { data: categoriesResult, refetch, isFetching: isTableFetching } = useGetAllActiveCategoriesQuery();
    const [categories, setCategories] = useState<any>([]);

    useEffect(() => {
        if (categoriesResult?.body?.result) {
            setCategories(categoriesResult?.body?.result);
        }
    }, [categoriesResult]);

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
            },
        }
        setLoading(true)
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
                message.success('Tải ảnh thành công!')
            }
            setLoading(false);
        } catch (err) {
            const error = new Error('Upload Failed.')
            onError({ error })
        }
    }

    const handlePublish = async () => {
        if (!imageUrl) {
            message.error('Vui lòng tải ảnh thumbnail');
            return
        } else if (!editorRef.current.getContent()) {
            message.error('Vui lòng nhập nội dung bài viết');
            return
        }
        const values = form.getFieldsValue();
        console.log('Form values:', { ...{ content: editorRef.current.getContent(), image: imageUrl }, ...values });
        try {
            await createPost({ ...{ content: editorRef.current.getContent(), image: imageUrl }, ...values }).unwrap();
            form.resetFields();
            message.success('Tạo mới bài viết thành công!');
        } catch (error) {
            console.log('Error:', error);
            message.error('Có lỗi xảy ra khi tạo bài viết');
            return;
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image', 'code-block'],
        ],
    };

    return (
        <Form form={form} onFinish={handlePublish} className="mx-auto space-y-6">
            <Form.Item name="title" validateTrigger="onBlur" rules={[{ required: true, message: "Tiêu đề không được trống" }]}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tiêu đề:</label>
                    <Input id="title" className='mt-2' />
                </div>
            </Form.Item>

            <Form.Item
                name="short_desc"
                validateTrigger="onBlur"
                rules={[{
                    required: true,
                    message: 'Vui lòng nhập mô tả.',
                }]}
            >
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Mô tả ngắn</label>
                    <TextArea
                        showCount
                        maxLength={200}
                        style={{ height: 120, resize: 'none' }}
                    />
                </div>
            </Form.Item>

            <div className='flex gap-2'>
                <Form.Item
                    className='w-full'
                    name="position"
                    validateTrigger="onBlur"
                    initialValue={0}
                    rules={[{ pattern: new RegExp(/^[0-9]+$/), message: "Vị trí phải là số" }, {
                        required: true,
                        message: 'Vui lòng nhập vị trí.',
                    }]}
                >
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Vị trí</label>
                        <Input type="text" defaultValue={0} />
                    </div>
                </Form.Item>

                <Form.Item
                    className='w-full'
                    name="status"
                    validateTrigger={["onChange", "onBlur"]}
                    initialValue={1}
                    rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
                >
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                        <Select defaultValue={1} onChange={(value) => form.setFieldsValue({ status: value })}>
                            <Option value={1}>Ẩn</Option>
                            <Option value={2}>Hiển thị</Option>
                        </Select>
                    </div>
                </Form.Item>

            </div>


            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Thumbnail:</label>
                <div className='bg-white max-h-fit'>
                    <Upload

                        name="thumbnail"
                        action={
                            'https://api.imgbb.com/1/upload/key=488e7d944b2bedd5020e1ace8585d1df'
                        }
                        headers={{
                            authorization: 'authorization-text',
                        }}
                        customRequest={handleUpload}
                        multiple={false}
                        fileList={[]}
                        className="w-full "
                    >

                        <div className="w-full text-center h-60 flex flex-col items-center justify-center border-2 border-dashed">
                            <ImageUp size={32} />
                            <p>
                                <strong>Nhấn vào để tải ảnh</strong> hoặc thả file vào
                            </p>
                        </div>
                    </Upload>
                    {loading && <div className='mt-2 p-4 mx-auto'>
                        <Skeleton.Button className='w-full h-12' active size={"large"} shape={"square"} />
                    </div>}

                    {!loading && imageUrl && (<img className='object-contain w-auto! h-[200px] md:h-[400px] mt-2 p-4 mx-auto' src={imageUrl} />)}
                </div>
            </div>

            <Form.Item
                name="categories"
                validateTrigger={['onChange', 'onBlur']}
                valuePropName="value"
                rules={[{ required: true, message: "Danh mục không được để trống" }]}
            >
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Danh mục:</label>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Chọn danh mục"
                        tagRender={tagRender}
                        onChange={(value) => form.setFieldsValue({ categories: value })} // kiểm tra giá trị của Select
                    >
                        {categories?.map((category: any) => {
                            return <Option key={category._id} value={category._id}>{category.name}</Option>
                        })}
                    </Select>
                </div>
            </Form.Item>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <EditorTinymce content={""} editorRef={editorRef} />
            </div>

            <Form.Item
                name="meta_title"
            >
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Meta tiêu đề</label>
                    <Input
                        showCount
                        maxLength={100}
                    />
                </div>
            </Form.Item>

            <Form.Item
                name="meta_description"
            >
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Meta mô tả</label>
                    <TextArea
                        showCount
                        maxLength={200}
                        style={{ height: 120, resize: 'none' }}
                    />
                </div>
            </Form.Item>

            <Form.Item
                name="meta_keyword"
            >
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Meta từ khóa</label>
                    <TextArea
                        showCount
                        maxLength={200}
                        style={{ height: 120, resize: 'none' }}
                    />
                </div>
            </Form.Item>

            <Form.Item>
                <Button loading={isCreateLoading} className='float-end' type="primary" htmlType="submit">  {/* Nút submit */}
                    Tạo mới
                </Button>
            </Form.Item>
        </Form>
    );
}

const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color={"green"}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            className='p-1'
        >
            {label}
        </Tag>
    );
};