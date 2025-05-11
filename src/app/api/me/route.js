import { getDataFromToken } from "@/helper/getDataFromToken";
import connectionDB from "@/lib/db";
import User from "@/lib/models/user/userSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectionDB();

        const userId = await getDataFromToken(req);

        console.log("User ID:", userId);

        if (!userId) {
            return NextResponse.json({ message: "User not authenticated!" });
        }


        const data = await User.findOne({ _id: userId }).select("-password");

        return NextResponse.json({ message: "The data is!", data });

    } catch (error) {
        console.log("Error while fetching the data:", error);
        return NextResponse.json({ message: "Error fetching the data!" });
    }
}
