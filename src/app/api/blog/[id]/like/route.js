import connectionDB from "@/lib/db";
import Blog from "@/lib/models/blog/blogSchema";

export async function POST(req, { params }) {
  await connectionDB();
  const { id } = await params;
  const { userId } = await req.json();

  if (!userId) {
    return new Response(JSON.stringify({ message: "User ID required" }), { status: 400 });
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    return new Response(JSON.stringify({ message: "Blog not found" }), { status: 404 });
  }

  const hasLiked = blog.likes.users.includes(userId);

  if (hasLiked) {
    blog.likes.users = blog.likes.users.filter((uid) => uid.toString() !== userId.toString());
    blog.likes.count -= 1;
    await blog.save();
    return new Response(JSON.stringify({ message: "Like removed", liked: false, likes: blog.likes }), { status: 200 });
  } else {
    blog.likes.users.push(userId);
    blog.likes.count += 1;
    await blog.save();
    return new Response(JSON.stringify({ message: "Liked", liked: true, likes: blog.likes }), { status: 200 });
  }
}
