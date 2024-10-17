import BlogDetailPage from '@/components/Core/modules/Landing/Blog/BlogDetail'
export default function BlogDetail({ params: { slug } }: { params: { slug: string } }) {
    return (
        <BlogDetailPage slug={slug} />
    )
}