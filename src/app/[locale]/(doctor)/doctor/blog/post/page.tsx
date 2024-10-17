import BlogPostList from "@/components/Core/modules/Blog/Post";

export default function PostPage({
    params: { slug },
}: {
    params: { slug: string };
}) {
    return (
        <BlogPostList />
    )
}