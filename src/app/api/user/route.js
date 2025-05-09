import connectionDB from "@/lib/db";
import User from "@/lib/models/user/userSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import { cookies } from "next/headers";

export async function POST(req) {
    try {
        await connectionDB();

        const { name, email, number, password } = await req.json();

        if (!email || !number || !password || !name) {
            return NextResponse.json({ message: "All fields are required!" })
        }

        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return NextResponse.json({ message: "Email already exists!" })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ email, name, number, password: hashPassword })

        return NextResponse.json({ message: "User Created Successfully!!", data: newUser._id }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: "Error while creating the user !!" })
    }
}

export async function GET(req) {
    try {
        await connectionDB();

        // available token get gareko
        const token = req.cookies.get("token").value || "";

        if (!token) {
            return NextResponse.json({ message: "Unauthorized: No token" }, { status: 401 });
        }

        //verifying the token and JWTSecret bata .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Admin ho ki nai check garne
        if (!decoded.isAdmin) {
            return NextResponse.json({ message: "Forbidden: Admins only" }, { status: 403 });
        }

        const users = await User.find().select("-password");
        
        // const blogs = await User.find();

        return NextResponse.json({ message: "Users fetched!", data: users }, { status: 200 });
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ message: "Error while fetching User!" }, { status: 500 });
    }
}
