import { NextResponse } from "next/server";
import connectionDB from "@/lib/db";
import Blog from "@/lib/models/blog/blogSchema";
import mongoose from "mongoose";

export async function DELETE(req, { params }) {
  try {
    await connectionDB();
    const { id, commentId } = await params;

    if (!id || !commentId) {
      return NextResponse.json(
        { message: "Missing blog ID or comment ID" },
        { status: 400 }
      );
    }

    const commentObjectId = new mongoose.Types.ObjectId(commentId);

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $pull: { comments: { _id: commentObjectId } } },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Comment Error:", error);
    return NextResponse.json(
      { message: "Server error while deleting comment" },
      { status: 500 }
    );
  }
}