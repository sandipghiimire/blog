import Blog from "../../../lib/models/blog/blogSchema";
import connectionDB from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const connect = await connectionDB();
        if (!connect) {
            return NextResponse.json({ message: "databse x!" })
        }
        const { title, blog, category } = await req.json();
        if (!title || !blog || !category) {
            return NextResponse.json({ message: "All fields are required!" })
        }

        const data = await Blog.create({ title, blog, category });

        return NextResponse.json({ message: "Successfully created!!" })

    } catch (error) {
        return NextResponse.json({ message: "Error while creatig the data!" })
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


