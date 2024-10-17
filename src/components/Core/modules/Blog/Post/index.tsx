"use client"
import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Tag, Popconfirm, message } from 'antd';
import { PlusCircle, Edit, Trash2, Eye, Search as SearchIcon } from 'lucide-react';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';
import { useDeletePostMutation, useGetAllPostsQuery } from '@/stores/services/blog/blog';
import Paginate from '@/components/Core/common/Paginate';
import { useAppDispatch } from '@/hooks/redux-toolkit';
import { setLoaded, setLoading as setLoadingState } from '@/stores/features/loading';


const { Search } = Input;

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(1);
    const router = useRouter();
    const { data: postResult, isFetching, refetch } = useGetAllPostsQuery({ page, limit, search: searchText });
    const [deletePostResult] = useDeletePostMutation();
    useEffect(() => {
        if (postResult?.body?.result) {
            setPosts(postResult?.body?.result);
        }
    }, [postResult]);

    useEffect(() => {
        refetch();
    }, [page, limit]);

    useEffect(() => {
        setPage(1);
    }, [searchText]);

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    const handleDelete = async (id: string) => {
        // In a real application, you would call an API to delete the post
        try {
            dispatch(setLoadingState());
            await deletePostResult(id);
            await refetch();
            dispatch(setLoaded());
            message.success('Post deleted successfully');
        } catch (error) {
            message.error('Failed to delete the post');
        }

    };

    const columns: ColumnsType = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            width: '30%',
        },
        {
            title: 'Danh mục',
            dataIndex: 'categories',
            key: 'categories',
            render: (categories: string[]) => (
                <>
                    {categories.map((category: any) => (
                        <Tag key={category._id}>{category.name}</Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Lượt xem',
            dataIndex: 'view',
            key: 'view',
            sorter: (a, b) => a.view - b.view,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: number) => {
                let color = status === 2 ? 'green' : status === 1 ? 'gold' : 'red';
                let text = status === 2 ? 'Active' : status === 1 ? 'Inactive' : 'Deleted';
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleDateString(),
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <div className='space-x-1'>
                    <Button icon={<Eye className="w-4 h-4" />} />
                    <Button onClick={() => {
                        router.push(`post/edit/${record._id}`);
                    }} icon={<Edit className="w-4 h-4" />} />
                    <Popconfirm
                        title="Bạn có muốn xóa bài viết này không ?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button icon={<Trash2 className="w-4 h-4" />} danger />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-secondarySupperDarker">Danh sách</h2>
                <Button onClick={() => router.push('post/create')} type="primary" icon={<PlusCircle className="w-4 h-4 mr-2" />}>
                    Tạo bài viết
                </Button>
            </div>
            <div className="mb-4">
                <Search
                    className='w-60 float-end mb-2'
                    placeholder="Tìm kiếm"
                    allowClear
                    enterButton={<SearchIcon className="w-4 h-4" />}
                    size="large"
                    onSearch={handleSearch}
                />
            </div>
            <Table
                columns={columns}
                dataSource={posts}
                rowKey="_id"
                loading={isFetching}
                pagination={false}
            />
            {postResult?.body && <Paginate page={postResult?.body.currentPage} totalPages={postResult?.body.totalPage} onPageChange={(page) => { setPage(page) }} />}
        </div>
    );
}