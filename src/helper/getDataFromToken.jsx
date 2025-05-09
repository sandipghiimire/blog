import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export const getDataFromToken = (req) => {
    try {
        const token = req.cookies.get("token")?.value || "";
        console.log("thetoken is" , token)
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("the values is",decode.id)
        return decode.id;
    } catch (error) {
        return NextResponse.json({message:"Error getting the token!"})
    }
}