import connectionDB from "@/lib/db";
import Blog from "@/lib/models/blog/blogSchema";

export async function POST(req, { params }) {
  await connectionDB();

  const { cid } = await params; 
  console.log("The idd is ", cid);   
  const body = await req.json(); 
  const { userId, comment } = body;

  if (!comment || !userId) {
    return new Response(JSON.stringify({ error: "Missing data" }), { status: 400 });
  }

  const blog = await Blog.findById(cid);
  if (!blog) {
    return new Response(JSON.stringify({ error: "Blog not found" }), { status: 404 });
  }

  blog.comments.push({ userId, comment });
  await blog.save();

  return new Response(JSON.stringify({ message: "Comment added", comments: blog.comments }), { status: 200 });
}
