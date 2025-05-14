import connectionDB from "@/lib/db";
import { NextResponse } from "next/server";
import Contact from "@/lib/models/contact/contactSchema";

export async function DELETE(req, {params}) {
    try {
        await connectionDB();
        const {id} = await params;
        const deleteContact = await Contact.findByIdAndDelete(id);
        
        return NextResponse.json({message:"Deleted Successfully!!", deleteContact})
        
    } catch (error) {
        return NextResponse.json({message:"Error deleting the message or not found ID", error})
    }
}