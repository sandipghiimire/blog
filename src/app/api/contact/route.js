import connectionDB from "@/lib/db";
import contactSchema from "@/lib/models/contact/contactSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectionDB();
        const { email, number, message } = await req.json();
        if (!email || !number || !message) {
            return NextResponse.json({ message: "All fields are required!" })
        }
        const data = await contactSchema.create({ email, number, message });

        return NextResponse.json({ message: "Successfully Created!!", data })

    } catch (error) {
        return NextResponse.json({ message: "Error while posting from backend!!", error })
    }
}

export async function GET(){
    try {
        await connectionDB();
        const data = await contactSchema.find();
        // const res = await data.json();
        return NextResponse.json({messsage:"Successfully created!!", data})
    } catch (error) {
        return NextResponse.json({message:"Error fetching the data!!"})
    }
}