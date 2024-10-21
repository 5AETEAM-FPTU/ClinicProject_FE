'use client'
import React, { useEffect, useState } from 'react'
import { Layout, Row, Col, Card, Typography } from 'antd'
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import './style.css'
import 'swiper/css'
import 'swiper/css/pagination'
import {
    useGetNewestPostQuery,
    useGetPostBySlugQuery,
    useGetRelatePostQuery,
} from '@/stores/services/blog/blog'
import { NewsItem } from '@/components/Core/modules/Landing/Blog/BlogList'
import { cn } from '@/lib/utils'
const { Content } = Layout
const { Title, Paragraph } = Typography

const NewsCard: React.FC<NewsItem> = ({
    title,
    description,
    date,
    image,
    vertical,
    slug,
    isNeedShowSubDec,
}) => (
    <Link
    href={`/blog/${slug}?section=news`}
    className={`flex h-full w-full overflow-hidden rounded-lg p-4 shadow-third ${vertical ? 'mt-5 flex-col' : 'flex-row'}`}
>
    <img
        alt={title}
        src={image}
        className={cn(
            'rounded-lg object-cover',
            `${
                vertical
                    ? '!h-[200px] !w-full'
                    : 'max-w-[150px] sm:min-h-[76px] sm:max-w-[240px]'
            } }`,
        )}
    />
    <div
        className={cn('ml-4 w-full pr-5 text-start', `${vertical && 'ml-0 mt-2 p-0'}`)}
    >
        <h3
            className={cn(
                'mb-2 line-clamp-4 text-secondarySupperDarker text-start sm:line-clamp-6 sm:text-[16px]',
                `${vertical && 'line-clamp-4'}`,
            )}
        >
            {title}
        </h3>
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

export default function BlogDetail({ slug }: { slug: string }) {
    const { data: postDetailResult, isFetching } = useGetPostBySlugQuery(slug)
    const [post, setPost] = useState<any>({})
    useEffect(() => {
        if (postDetailResult?.body?.result) {
            setPost(postDetailResult.body.result)
        }
    }, [postDetailResult])

    const { data: newestPostResult } = useGetNewestPostQuery()
    const [newestPosts, setNewestPosts] = useState<any>([])
    useEffect(() => {
        if (newestPostResult?.body?.result) {
            setNewestPosts(newestPostResult.body.result)
        }
    }, [newestPostResult])

    const { data: relatePostResult } = useGetRelatePostQuery(slug)
    const [relatePosts, setRelatePosts] = useState<any>([])
    useEffect(() => {
        if (relatePostResult?.body?.result) {
            setRelatePosts(relatePostResult.body.result)
        }
    }, [relatePostResult])
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <div className="w-full sm:w-[1440px]">
                <Row
                    gutter={24}
                    className="bg-primary-foreground m-0 mt-10 w-full px-5 sm:mt-28 sm:min-h-screen sm:px-[80px]"
                >
                    <Col xs={24} md={15} className="mt-12 px-0 sm:px-3">
                        <div>
                            <h1 className="text-primary text-[16px] font-semibold sm:text-[24px]">
                                {post.title}
                            </h1>
                            <div className="text-primary-foreground mt-2 flex items-center">
                                <Calendar size={16} className="mr-2" />
                                <span className="text-[14px] sm:text-[16px]">
                                    {new Date(
                                        post.createdAt,
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            <div
                                className="mt-3 text-[14px] sm:text-[16px]"
                                dangerouslySetInnerHTML={{
                                    __html: post.content,
                                }}
                            ></div>
                        </div>
                    </Col>
                    <Col xs={24} md={9} className="my-12 px-0 sm:px-3">
                        <div className="w-full">
                            <Title
                                level={3}
                                className="text-primary mb-2 sm:mb-8"
                            >
                                Tin mới nhất
                            </Title>
                            <Row gutter={24}>
                                {newestPosts.map((item: any) => (
                                    <Col
                                        key={item.slug}
                                        xs={24}
                                        xl={24}
                                        className="mt-5 flex flex-col items-center justify-between gap-5"
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
                                            position={item.position}
                                            isNeedShowSubDec={false}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="w-full overflow-clip p-5 sm:w-[1440px] sm:px-[80px]">
                <Title level={3} className="text-primary mb-5 sm:mb-8">
                    Bài viết liên quan
                </Title>
                <Row gutter={24}>
                        {relatePosts.map((item: any, index: number) => (
                            <Col
                                key={index}
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
            </div>
        </div>
    )
}
