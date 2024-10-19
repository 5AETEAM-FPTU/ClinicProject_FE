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
const { Content } = Layout
const { Title, Paragraph } = Typography

const NewsCard: React.FC<NewsItem> = ({
    title,
    description,
    date,
    image,
    vertical,
    slug,
}) => (
    <Link
        href={`/blog/${slug}`}
        className={`my-1 flex h-full border-2 border-[#CCE0F4] ${vertical ? 'flex-col' : 'flex-row'}`}
    >
        <img
            alt={title}
            src={image}
            className={`object-cover ${vertical ? 'h-full! w-full' : 'min-h-[76px] max-w-[180px]'} `}
        />
        <div className="ml-4 py-5 pr-5">
            <Title
                level={5}
                className="text-primary mb-2 line-clamp-2 text-start"
            >
                {title}
            </Title>
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
        <div className="flex w-full flex-col justify-center items-center">
            <div className="w-[1440px]">
                <Row
                    gutter={24}
                    className="bg-primary-foreground mt-28 min-h-screen w-[1440px] px-[80px]"
                >
                    <Col md={16} className="mt-12">
                        <Title level={2} className="text-primary">
                            {post.title}
                        </Title>
                        <div className="text-primary-foreground mt-2 flex items-center">
                            <Calendar size={16} className="mr-2" />
                            <span>
                                {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div
                            className="mt-3"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        ></div>
                    </Col>
                    <Col md={8} className="my-12 hidden md:block">
                        <Title level={3} className="text-primary mb-8">
                            Tin mới nhất
                        </Title>
                        <Row gutter={24}>
                            {newestPosts.map((item: any) => (
                                <Col
                                    xl={24}
                                    className="flex flex-col items-center justify-between gap-5"
                                >
                                    <NewsCard
                                        slug={item.slug}
                                        vertical={false}
                                        key={item.slug}
                                        description={item.short_desc}
                                        date={new Date(
                                            item.createdAt,
                                        ).toLocaleDateString()}
                                        image={item.image}
                                        title={item.title}
                                        position={item.position}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </div>

            <div className="overflow-clip w-[1440px] px-[80px]">
                <Title level={3} className="text-primary mb-8">
                    Bài viết liên quan
                </Title>
                <Swiper
                    className="mySwiper mb-12"
                    spaceBetween={20}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                >
                    {relatePosts.map((item: any) => (
                        <SwiperSlide key={slug}>
                            <NewsCard
                                slug={item.slug}
                                vertical={true}
                                key={item.slug}
                                description={item.short_desc}
                                date={new Date(
                                    item.createdAt,
                                ).toLocaleDateString()}
                                image={item.image}
                                title={item.title}
                                position={item.position}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}
