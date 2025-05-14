"use client"
import { Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Page() {

    const [blog, setBlog] = useState([])

    useEffect(() => {
        fetchBlog();
    }, [])
    
    const fetchBlog = async () => {
        try {
            const res = await fetch("/api/contact");
            const data = await res.json();
            console.log(data);
            setBlog(data.data);
        } catch (error) {
            console.log("Error!")
        }
    }

    const deleteContent = async (id) => {
        try {
            const res = await fetch(`/api/contact/${id}`,{
                method:"DELETE", 
                headers : {
                    "Content-Type" : "application/json"
                },

            })
            if(res.ok){
                console.log("Deleted Contact");
                fetchBlog();
            } else {
            console.error("Failed to delete contact");
        }
        } catch (error) {
            console.log(error);
        }
    }

    return <main className="h-screen p-10 bg-slate-200 text-black">
        <div className="flex flex-row justify-between">
            <h1 className="text-xl font-semibold">List view of Blog</h1>
            <div className="flex flex-row gap-3">
                <h1 className="bg-slate-300 px-3 py-1 rounded-lg"><Link href={'/admin/blogform'}>Create Blog</Link></h1>
                <h1 className="bg-slate-300 px-3 py-1 rounded-lg"><Link href={'/admin/contact'}>Contact Messages</Link></h1>
            </div>
        </div>
        <table className="w-full text-left mt-5">
            <thead>
                <tr className="grid grid-cols-4 font-bold bg-gray-300">
                    <th>Email</th>
                    <th>Number</th>
                    <th>Message</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {blog?.map((item, i) => (
                    <tr key={i} className="grid grid-cols-4 border-b border-gray-400 py-2">
                        <td>{item.email}</td>
                        <td className="line-clamp-2">{item.number}</td>
                        <td className="line-clamp-2">{item.message}</td>
                        <td>
                            <div className="flex gap-3">
                                <button onClick={()=>deleteContent(item?._id)} className="bg-red-600 px-3 py-2 rounded-lg text-white"><Trash2 /></button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </main>

}