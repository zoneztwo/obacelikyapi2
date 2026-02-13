import BlogPostClient from "@/components/BlogPostClient";

// Since we are no longer static exporting, we remove generateStaticParams
// or we can keep it if we want hybrid, but dynamic ID is better for instant updates.
// We just pass the ID to the client component.

export default async function BlogPostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BlogPostClient id={id} />;
}
