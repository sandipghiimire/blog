import connectionDB from "@/lib/db";
import User from "@/lib/models/user/userSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(req) {
    try {
        await connectionDB();
        const reqBody = req.json();
        const { email, password } = await reqBody;
        console.log(reqBody)

        if (!email || !password) {
            return NextResponse.json({ message: "Required all fields!!" })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Invalid Credentials!" })
        }
        
        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return NextResponse.json({ message: "Invalid Credentials!" })
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);

        const response = NextResponse.json(
            { message: "Logged in successfully!" },
            { status: 200 }
        );

        response.cookies.set("token", token ,{
            httpOnly:true
        })


        return response;
        
    } catch (error) {
        return NextResponse.json({ message: "Error while posting the data!" })
    }
}