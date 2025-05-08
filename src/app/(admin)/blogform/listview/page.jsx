"use client"
import { Edit2, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

export default function Page() {

    const [blog, setBlog] = useState([])

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch("/api/blog");
                const data = await res.json();
                console.log(data);
                setBlog(data.data);
            } catch (error) {
                console.log("Error!")
            }
        }
        fetchBlog();
    }, [])

    return <main className="h-full bg-slate-200 text-black">
        <table className="w-full text-left">
            <thead>
                <tr className="grid grid-cols-3 font-bold bg-gray-300">
                    <th>Title</th>
                    <th>Blog</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {blog?.map((item, i) => (
                    <tr key={i} className="grid grid-cols-3 border-b border-gray-400 py-2">
                        <td>{item.title}</td>
                        <td>{item.blog}</td>
                        <td>
                            <div className="flex gap-3">
                                <button className="bg-blue-600 px-3 py-2 rounded-lg text-white"><Edit2 /></button>
                                <button className="bg-red-600 px-3 py-2 rounded-lg text-white"><Trash2 /></button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </main>

}