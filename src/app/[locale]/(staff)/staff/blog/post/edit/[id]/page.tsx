import BlogPostEditing from "@/components/Core/modules/Blog/Post/edit";

export default function EditPost({ params: { id } }: { params: { id: string } }) {
    return (
        <BlogPostEditing id={id} />
    )
}