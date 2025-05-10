import { NextResponse } from "next/server";
import connectionDB from "@/lib/db";
import Blog from "@/lib/models/blog/blogSchema";

export async function DELETE(req, { params }) {
  try {
    await connectionDB();
    const { blogId, commentId } = await params; // Get blog ID and comment ID from the URL params

    console.log("Blog ID:", blogId); // Debug log to verify blogId
    console.log("Comment ID:", commentId); // Debug log to verify commentId

    // Find the blog by ID and pull the comment from the comments array
    const blog = await Blog.findByIdAndUpdate({bl});

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE Comment Error:", error);
    return NextResponse.json({ message: "Server error while deleting comment" }, { status: 500 });
  }
}
