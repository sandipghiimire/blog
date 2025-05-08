import connectionDB from "../../../lib/db";
import { NextResponse } from "next/server";
import Categories from "@/lib/models/category/blogCategory";

export async function POST(req) {
    try {
        const connect = await connectionDB();
        if (!connect) {
            return NextResponse.json({ message: "databse x!" })
        }
        const { name } = await req.json();
        if (!name) {
            return NextResponse.json({ message: "All fields are required!" })
        }

        const data = await Categories.create({ name });

        return NextResponse.json({ message: "Successfully created!!" })

    } catch (error) {
        return NextResponse.json({ message: "Error while creatig the data!" })
    }
}


export async function GET() {
    try {
        await connectionDB();

        const blogs = await Categories.find();

        return NextResponse.json({ message: "Category fetched!", data: blogs }, { status: 200 });
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ message: "Error while fetching blogs!" }, { status: 500 });
    }
}


