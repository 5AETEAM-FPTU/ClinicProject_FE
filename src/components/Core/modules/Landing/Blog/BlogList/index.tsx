"use client"
import React, { use, useEffect, useState } from 'react'
import { Layout, Row, Col, Card, Typography } from 'antd'
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import Paginate from '@/components/Core/common/Paginate'
import { useGetAllActivePostsQuery, useGetAllPostsQuery, useGetNewestPostQuery } from '@/stores/services/blog/blog'

const { Content } = Layout
const { Title, Paragraph } = Typography

export interface NewsItem {
    title: string
    description: string
    date: string
    image: string,
    vertical?: boolean
    slug: string,
}


const NewsCard: React.FC<NewsItem> = ({ title, description, date, image, vertical, slug }) => (
    <Link href={`/blog/${slug}`}
        className={`flex border border-[#CCE0F4] border-2 h-full mb-5 ${vertical ? 'flex-col' : 'flex-row'}`}
    >
        <img alt={title} src={image} className="object-cover min-w-[180px] min-h-[120px]" />
        <div className='ml-4 py-5 pr-5'>
            <Title level={5} className="text-primary mb-2">{title}</Title>
            {description && <Paragraph className="text-primary-foreground mb-2 line-clamp-2">{description}</Paragraph>}
            <div className="flex items-center text-primary-foreground">
                <Calendar size={16} className="mr-2" />
                <span>{date}</span>
            </div>
        </div>
    </Link>
)

export default function BlogList() {
    const { data: newestPostResult } = useGetNewestPostQuery();
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
    const { data: allPostResult, refetch } = useGetAllActivePostsQuery({ page, limit, search: '' })
    const [allPosts, setAllPosts] = useState<any>([])
    useEffect(() => {
        if (allPostResult?.body?.result) {
            setAllPosts(allPostResult.body.result)
            setTotalPage(allPostResult.body.totalPage)
        }
    }, [allPostResult])
    useEffect(() => {
        refetch();
    }, [page, limit])
    useEffect(() => {
        setPage(1);
    }, [search])


    return (
        <Layout className="min-h-screen bg-primary-foreground mt-28">
            <Content className="px-[120px] mt-12">
                <Title level={2} className="text-primary mb-8">Tin tức mới nhất</Title>
                <Row gutter={24}>
                    {newestPosts[0] && (
                        <Col xl={24} xxl={14} className='h-full! mb-4'>
                            <Link href={`/blog/${newestPosts[0].slug}`}
                                className="flex-col flex border2 border-[#CCE0F4] border-2 h-full"
                            >
                                <img alt={newestPosts[0].title} src={newestPosts[0].image} className="object-cover w-full h-auto" />
                                <div className='mt-4 px-6 pb-5 h-full'>
                                    <Title level={3} className="text-primary mb-4">{newestPosts[0].title}</Title>
                                    <Paragraph className="text-primary-foreground mb-4 line-clamp-3">{newestPosts[0].short_desc}</Paragraph>
                                    <div className="flex items-center text-primary-foreground">
                                        <Calendar size={16} className="mr-2" />
                                        <span>{new Date(newestPosts[0].createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                            </Link>
                        </Col>
                    )}

                    <Col xl={24} xxl={10} className='flex flex-col items-center justify-between gap-5'>
                        {newestPosts.slice(1, 4).map((item: any, index: number) => (
                            <NewsCard key={item.slug}
                                slug={item.slug}
                                description={item.short_desc}
                                date={new Date(item.createdAt).toLocaleDateString()}
                                image={item.image}
                                title={item.title}
                            />
                        ))}
                    </Col>
                </Row>
            </Content>
            <Content className="px-[120px] my-12">
                <Title level={2} className="text-primary mb-8">Tin tức bệnh viện</Title>
                <Row gutter={24}>
                    {allPosts.map((item: any, index: number) => (
                        <Col xl={8} className='flex flex-col items-center justify-between gap-5'>
                            <NewsCard key={item.slug}
                                slug={item.slug}
                                description={item.short_desc}
                                date={new Date(item.createdAt).toLocaleDateString()}
                                image={item.image}
                                title={item.title}
                                vertical={true}
                            />
                        </Col>
                    ))}
                </Row>
                <Paginate totalPages={totalPage} page={1} onPageChange={(page) => { setPage(page) }} />
            </Content>
        </Layout>
    )
}