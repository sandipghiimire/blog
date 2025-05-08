import mongoose from "mongoose";
import { NextResponse } from "next/server";

export default async function connectionDB() {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        if (!connect) {
            return NextResponse.json({ message: "Please provide the correct database data!" })
        }
        console.log("Database Connected!")
        return NextResponse.json({ message: "Database Connected!" })
    } catch (error) {
        return NextResponse.json({ message: "Error while connecting with the database!" })
    }
}