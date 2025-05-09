import Blog from "../../../lib/models/blog/blogSchema";
import connectionDB from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const connect = await connectionDB();
        if (!connect) {
            return NextResponse.json({ message: "Database not connected!" });
        }

        const { title, blog, category, image } = await req.json();

        if (!title || !blog || !category || !image) {
            return NextResponse.json({ message: "All fields including image are required!" });
        }

        const data = await Blog.create({ title, blog, category, image });

        return NextResponse.json({ message: "Successfully created!!", data });

    } catch (error) {
        console.error("Error creating blog:", error);
        return NextResponse.json({ message: "Error while creating the data!" });
    }
}



export async function GET() {
    try {
        await connectionDB();

        const blogs = await Blog.find();

        return NextResponse.json({ message: "Blogs fetched!", data: blogs }, { status: 200 });
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ message: "Error while fetching blogs!" }, { status: 500 });
    }
}


