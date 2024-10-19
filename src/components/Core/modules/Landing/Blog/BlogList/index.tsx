'use client'
import React, { use, useEffect, useState } from 'react'
import { Layout, Row, Col, Card, Typography } from 'antd'
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import Paginate from '@/components/Core/common/Paginate'
import {
    useGetAllActivePostsQuery,
    useGetAllPostsQuery,
    useGetNewestPostQuery,
} from '@/stores/services/blog/blog'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const { Content } = Layout
const { Title, Paragraph } = Typography

export interface NewsItem {
    title: string
    description: string
    date: string
    image: string
    vertical?: boolean | false
    slug: string
    position: number
    isNeedShowSubDec? : boolean | true
}

const NewsCard: React.FC<NewsItem> = ({
    title,
    description,
    date,
    image,
    vertical,
    slug,
    isNeedShowSubDec
}) => (
    <Link
        href={`/blog/${slug}`}
        className={`w-full rounded-lg overflow-hidden p-4 flex h-full  shadow-third ${vertical ? 'flex-col mt-5' : 'flex-row'}`}
    >
        <img
            alt={title}
            src={image}
            className={cn("object-cover rounded-lg", `${
                vertical ? '!h-[200px] !w-full' : 'min-h-[76px] max-w-[240px]'}
            }`)}
        />
        <div className={cn("ml-4 w-full pr-5", `${vertical && "ml-0 p-0 mt-2"}`)}>
            <Title level={5} className={cn("text-primary mb-2 line-clamp-6", `${vertical && 'line-clamp-4'}`)}>
                {title}
            </Title>
            {description && isNeedShowSubDec! && (
                <Paragraph className="text-primary-foreground mb-2 line-clamp-2">
                    {description}
                </Paragraph>
            )}
            <div className="text-primary-foreground flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{date}</span>
            </div>
        </div>
    </Link>
)

export default function BlogList() {
    const { data: newestPostResult } = useGetNewestPostQuery()
    const [newestPosts, setNewestPosts] = useState<any>([])
    useEffect(() => {
        if (newestPostResult?.body?.result) {
            setNewestPosts(newestPostResult.body.result)
        }
    }, [newestPostResult])

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(1)
    const [search, setSearch] = useState('')
    const [totalPage, setTotalPage] = useState(1)
    const { data: allPostResult, refetch } = useGetAllActivePostsQuery({
        page,
        limit,
        search: '',
    })
    const [allPosts, setAllPosts] = useState<any>([])
    useEffect(() => {
        if (allPostResult?.body?.result) {
            setAllPosts(allPostResult.body.result)
            setTotalPage(allPostResult.body.totalPage)
        }
    }, [allPostResult])
    useEffect(() => {
        refetch()
    }, [page, limit])
    useEffect(() => {
        setPage(1)
    }, [search])

    return (
        <div className='w-full flex justify-center min-h-screen'>

            <Layout className="mt-28 min-h-screen flex items-center !bg-white">
                <Content className="mt-12 w-[1440px] px-[80px]">
                    <Title level={2} className="text-primary mb-8">
                        Tin tức mới nhất
                    </Title>
                    <Row gutter={24}>
                        {newestPosts[0] && (
                            <Col xl={24} xxl={14} className="h-full!">
                                <Link
                                    href={`/blog/${newestPosts[0].slug}`}
                                    className="border2 flex h-full flex-col shadow-third rounded-lg overflow-hidden p-4"
                                >
                                    <img
                                        alt={newestPosts[0].title}
                                        src={newestPosts[0].image}
                                        className="h-auto w-full object-cover rounded-lg "
                                    />
                                    <div className="mt-4 h-full  pb-5">
                                        <Title
                                            level={3}
                                            className="text-primary mb-4"
                                        >
                                            {newestPosts[0].title}
                                        </Title>
                                        <Paragraph className="text-primary-foreground mb-4 line-clamp-3">
                                            {newestPosts[0].short_desc}
                                        </Paragraph>
                                        <div className="text-primary-foreground flex items-center">
                                            <Calendar
                                                size={16}
                                                className="mr-2"
                                            />
                                            <span>
                                                {new Date(
                                                    newestPosts[0].createdAt,
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                        )}

                        <Col
                            xl={24}
                            xxl={10}
                            className="flex flex-col items-center justify-between gap-5"
                        >
                            {newestPosts
                                .slice(1, 4)
                                .map((item: any, index: number) => (
                                    <NewsCard
                                        key={item.slug}
                                        slug={item.slug}
                                        description={item.short_desc}
                                        date={new Date(
                                            item.createdAt,
                                        ).toLocaleDateString()}
                                        image={item.image}
                                        title={item.title}
                                        position={item.position}
                                        isNeedShowSubDec={false}
                                    />
                                ))}
                        </Col>
                    </Row>
                </Content>
                <Content className="my-12 px-[80px] w-[1440px]">
                    <Title level={2} className="text-primary mb-4">
                        Tin tức bệnh viện
                    </Title>
                    <Row gutter={24}>
                        {allPosts.map((item: any, index: number) => (
                            <Col
                                xl={8}
                                className="flex flex-col items-center justify-between gap-5"
                            >
                                <NewsCard
                                    key={item.slug}
                                    slug={item.slug}
                                    description={item.short_desc}
                                    date={new Date(
                                        item.createdAt,
                                    ).toLocaleDateString()}
                                    image={item.image}
                                    title={item.title}
                                    vertical={true}
                                    position={item.position}
                                />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        totalPages={totalPage}
                        page={1}
                        onPageChange={(page) => {
                            setPage(page)
                        }}
                    />
                </Content>
            </Layout>
        </div>
    )
}
