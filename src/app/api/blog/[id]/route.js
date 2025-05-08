import connectionDB from "@/lib/db";
import Blog from "@/lib/models/blog/blogSchema";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectionDB();

    const { id } = await params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ message: "Blog not found!" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ message: "Error while deleting blog!" }, { status: 500 });
  }
}