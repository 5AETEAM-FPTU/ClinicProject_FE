'use client'
import React, { useState, useEffect } from 'react'
import { Table, Input, Button, Space, Tag, Popconfirm, message } from 'antd'
import {
    PlusCircle,
    Edit,
    Trash2,
    Eye,
    Search as SearchIcon,
} from 'lucide-react'
import type { ColumnsType } from 'antd/es/table'
import { useRouter, useSearchParams } from 'next/navigation'
import {
    useDeletePostMutation,
    useGetAllPostsQuery,
} from '@/stores/services/blog/blog'
import Paginate from '@/components/Core/common/Paginate'
import { useAppDispatch } from '@/hooks/redux-toolkit'
import {
    setLoaded,
    setLoading as setLoadingState,
} from '@/stores/features/loading'
import { motion } from 'framer-motion'


const { Search } = Input

export default function PostList() {
    const [posts, setPosts] = useState([])
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams()

    const searchText = searchParams.get('search') || ''
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 10

    let total: number = 0
    const router = useRouter()
    const {
        data: postResult,
        isFetching,
        refetch,
    } = useGetAllPostsQuery({ page, limit, search: searchText })
    const [deletePostResult] = useDeletePostMutation()
    useEffect(() => {
        if (postResult?.body?.result) {
            setPosts(postResult?.body?.result)
            total = postResult?.body?.totalPage + 10 || 50
            console.log(total)
        }
    }, [postResult])

    const changeRoute = (
        pagination: { page: string; limit: string },
        filters: { search?: string },
    ) => {
        const { search } = filters
        const query = {
            page: pagination.page,
            pageSize: pagination.limit,
            ...(search && { search }),
        }
        const queryString = new URLSearchParams(query).toString()
        router.push(`?${queryString}`)
    }
    const handleTableChange = (pagination: any) => {
        changeRoute(pagination, {})
        refetch()
    }

    const handleDelete = async (id: string) => {
        // In a real application, you would call an API to delete the post
        try {
            dispatch(setLoadingState())
            await deletePostResult(id)
            await refetch()
            dispatch(setLoaded())
            message.success('Post deleted successfully')
        } catch (error) {
            message.error('Failed to delete the post')
        }
    }

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
                let color =
                    status === 2 ? 'green' : status === 1 ? 'gold' : 'red'
                let text =
                    status === 2
                        ? 'Active'
                        : status === 1
                          ? 'Inactive'
                          : 'Deleted'
                return <Tag color={color}>{text}</Tag>
            },
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleDateString(),
            sorter: (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <div className="space-x-1">
                    <Button type="text" icon={<Eye className="h-4 w-4" />} />
                    <Button
                        type="text"
                        onClick={() => {
                            router.push(`post/edit/${record._id}`)
                        }}
                        icon={<Edit className="h-4 w-4" />}
                    />
                    <Popconfirm
                        title="Bạn có muốn xóa bài viết này không ?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button
                            type="text"
                            icon={<Trash2 className="h-4 w-4" />}
                            danger
                        />
                    </Popconfirm>
                </div>
            ),
        },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
            className=""
        >
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-secondarySupperDarker">
                    Danh sách
                </h2>
                <Button
                    className="bg-secondaryDark"
                    onClick={() => router.push('post/create')}
                    type="primary"
                    icon={<PlusCircle className="mr-2 h-4 w-4" />}
                >
                    Tạo bài viết
                </Button>
            </div>
            <div className="mb-4">
                <Input
                    className="float-end mb-2 w-60"
                    placeholder="Tìm kiếm"
                    allowClear
                    size="middle"
                    prefix={
                        <SearchIcon size={18} className="text-secondaryDark" />
                    }
                />
            </div>
            <Table
                className="overflow-hidden rounded-lg shadow-third"
                columns={columns}
                dataSource={posts}
                rowKey="_id"
                loading={isFetching}
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: total!,
                }}
                onChange={handleTableChange}
            />
            {/* {postResult?.body && <Paginate page={postResult?.body.currentPage} totalPages={postResult?.body.totalPage} onPageChange={(page) => { setPage(page) }} />} */}
        </motion.div>
    )
}
