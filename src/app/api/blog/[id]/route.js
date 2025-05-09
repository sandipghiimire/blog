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

export async function PUT(req, { params }) {
  try {
    await connectionDB();

    const { id } = await params;

    const { title, blog, category } = await req.json();

    // Check if the blog exists
    const blogContent = await Blog.findById(id);
    if (!blogContent) {
      return NextResponse.json({ message: "Blog not found!" }, { status: 404 });
    }

    // Update the blog
    blogContent.title = title || blogContent.title;
    blogContent.blog = blog || blogContent.blog;
    blogContent.author = category || blogContent.category;

    await blogContent.save();

    return NextResponse.json({ message: "Blog updated successfully!" }, { status: 200 });

  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json("Error", error)
  }
}

export async function GET(req, { params }) {
  try {
    await connectionDB();

    const { id } = await params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error("GET Blog Error:", error);
    return NextResponse.json({ message: "Server error while fetching blog" }, { status: 500 });
  }
}