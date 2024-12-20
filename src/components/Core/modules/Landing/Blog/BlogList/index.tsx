'use client'
import React, { use, useEffect, useState } from 'react'
import { Layout, Row, Col, Card, Typography, Pagination, Skeleton, Select } from 'antd'
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import Search from 'antd/es/input/Search'
import DataSVG from '@public/landing/images/NoDataSVG.svg';
import {
    useGetAllActiveCategoriesQuery,
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
    isNeedShowSubDec?: boolean | true
}

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
                `${vertical
                    ? '!h-[200px] !w-full'
                    : 'max-w-[150px] sm:min-h-[76px] sm:max-w-[240px]'
                } }`,
            )}
        />
        <div
            className={cn('ml-4 w-full pr-5', `${vertical && 'ml-0 mt-2 p-0'}`)}
        >
            <h3
                className={cn(
                    'mb-2 line-clamp-4 text-secondarySupperDarker sm:line-clamp-6 sm:text-[16px]',
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

export default function BlogList() {
    const { data: newestPostResult } = useGetNewestPostQuery()
    const [newestPosts, setNewestPosts] = useState<any>([])
    const { data: categoriesResult } = useGetAllActiveCategoriesQuery();
    const [categories, setCategories] = useState<any>([]);
    const [cateogiesSelected, setCategoriesSelected] = useState<string[]>([])
    useEffect(() => {
        if (newestPostResult?.body?.result) {
            setNewestPosts(newestPostResult.body.result)
        }
    }, [newestPostResult])
    useEffect(() => {
        if (categoriesResult?.body?.result) {
            setCategories(categoriesResult.body.result);
            console.log(categoriesResult?.body?.result);
        }
    }, [categoriesResult])

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(9)
    const [search, setSearch] = useState('')
    const [totalPage, setTotalPage] = useState(1)
    const { data: allPostResult, refetch, isFetching } = useGetAllActivePostsQuery({
        page,
        limit,
        search,
        categories: cateogiesSelected.join(',')
    })

    const handleSelectChangeChange = (value: string[]) => {
        setCategoriesSelected(value)
    }
    const [allPosts, setAllPosts] = useState<any>([])
    useEffect(() => {
        if (allPostResult?.body?.result) {
            setAllPosts(allPostResult.body.result)
            setTotalPage(allPostResult.body.totalPage)
        }
    }, [allPostResult])
    useEffect(() => {
        refetch()
    }, [page, limit, cateogiesSelected])
    useEffect(() => {
        setPage(1)
    }, [search, cateogiesSelected])

    return (
        <div className="flex min-h-screen w-full justify-center">
            <Layout className="mt-[60px] flex min-h-screen items-center !bg-white sm:mt-28">
                <Content className="mt-5 w-full px-5 sm:mt-12 sm:w-[1440px] sm:px-[80px]">
                    <p className="text-primary mb-5 font-semibold text-[16p] text-secondarySupperDarker sm:mb-8 sm:text-[24px]">
                        Tin tức mới nhất
                    </p>
                    <Row gutter={24}>
                        {newestPosts[0] && (
                            <Col xs={24} xl={24} xxl={14} className="h-full!">
                                <Link
                                    href={`/blog/${newestPosts[0].slug}?section=news`}
                                    className="border2 flex h-full w-full flex-col overflow-hidden rounded-lg p-4 shadow-third"
                                >
                                    <div className="w-full">
                                        <img
                                            alt={newestPosts[0].title}
                                            src={newestPosts[0].image}
                                            className="h-auto w-full rounded-lg object-cover sm:h-full sm:w-full"
                                        />
                                    </div>
                                    <div className="mt-4 h-full pb-5">
                                        <h1 className="text-primary mb-4 text-[16px] font-semibold text-secondarySupperDarker sm:text-[24px]">
                                            {newestPosts[0].title}
                                        </h1>
                                        <Paragraph className="text-primary-foreground mb-4 line-clamp-3 text-[16p] sm:text-[18px]">
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
                            xs={24}
                            xl={24}
                            xxl={10}
                            className="mt-5 flex flex-col items-center justify-between gap-5 sm:mt-0"
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
                <Content className="my-12 w-full px-5 sm:w-[1440px] sm:px-[80px]">
                    <Title level={2} className="text-primary mb-4">
                        Tin tức bệnh viện
                    </Title>
                    <div className="flex justify-end w-full text-center">
                        <Select className='min-w-[200px] w-fit max-w-[300px] mr-3' mode='multiple' allowClear onChange={handleSelectChangeChange}
                            options={categories.map((category: any) => ({
                                label: category.name,
                                value: category._id,
                            }))}
                            placeholder="Chọn danh mục"
                        />
                        <Search
                            className="m-0 max-w-[400px]"
                            placeholder="Tìm kiếm"
                            size="large"
                            onSearch={(value) => setSearch(value)}
                        />
                    </div>
                    <Row gutter={24}>
                        {isFetching && Array.from({ length: 3 }).map((_, index) => (
                            <Col
                                key={index}
                                xl={8}
                                className="flex flex-col items-center justify-between gap-5 mt-5"
                            >
                                <Skeleton.Button
                                    key={index}
                                    active className='w-[400px] h-[300px]' />
                            </Col>
                        ))}
                        {!isFetching && allPosts.map((item: any, index: number) => (
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
                        {!isFetching && allPosts.length === 0 &&
                            <div className='mx-auto mt-5'>
                                <Title level={3} className='text-primary mt-5 text-center'>Không tìm thấy</Title>
                                <Image width={600} height={400} alt='No data' src={DataSVG} />
                            </div>
                        }
                    </Row>
                    {/* <Paginate
                        totalPages={totalPage}
                        page={1}
                        onPageChange={(page) => {
                            setPage(page)
                        }}
                    /> */}
                    {totalPage > 1 && <div className='mt-5 w-full flex justify-center'>
                        <Pagination
                            total={totalPage * limit}
                            current={page}
                            pageSize={limit}
                            onChange={(page) => {
                                setPage(page)
                            }}
                        />
                    </div>}
                </Content>
            </Layout>
        </div>
    )
}
