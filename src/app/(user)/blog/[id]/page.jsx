"use client"
import Category from "@/app/components/Categories";
import Contactus from "@/app/components/Contactus";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { Edit3Icon, MessageCircle, Share, ThumbsUpIcon, Trash2Icon } from "lucide-react";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";

export default function Page() {
    const pathname = usePathname();
    const segments = pathname.split("/"); // splits the path into parts
    const id = segments[segments.length - 1]; // assumes id is the last part of the path

    const [data, setData] = useState("");

    const [user, setUser] = useState("");

    useEffect(() => {
        const fetchLoggedinUser = async () => {
            try {
                const res = await fetch('/api/me')
                const data = await res.json();
                setUser(data.data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchLoggedinUser();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/blog/${id}`)
            const data = await res.json();
            setData(data.blog);
            console.log(data.blog);
        }

        fetchData();
    }, [])

    const handelDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/blog/${id}`, {
                method: "DELETE"
            })
            const data = await res.json();
            if (!res.ok) {
                console.log("Dont get the blog!")
            }
            console.log("Blog Deleted Successfully!!", data)
        } catch (error) {
            console.log(error)
            
        }
    }

    return <main className="bg-gray-200 text-black">
        <Header />
        <div className="flex flex-col xl:flex-row">
            <div className="md:p-10 p-5 h-full">
                <div>
                    <div className="h-[350px] p-20 flex justify-center items-center bg-slate-100">Image</div>
                </div>
                <div className="flex flex-col gap-5 mt-20">
                    <div>
                        <div className="flex flex-row justify-between">
                            <h1 className="texxt-white text-2xl font-semibold">{data?.title}</h1>
                            {user?.isAdmin ? (
                                <div className="flex flex-row gap-3 text-green-800">
                                    <button className="ring-2 ring-green-800 px-2 hover:bg-green-800 hover:ring-0 hover:text-white py-1 rounded"><Edit3Icon size={18} /></button>
                                    <button onClick={() => handelDelete(blog?._id)} className="ring-2 ring-green-800 px-2 hover:bg-red-600 hover:ring-0 hover:text-white py-1 rounded"><Trash2Icon /></button>
                                </div>
                            ) : null}
                        </div>
                        <h1 className="text-sm font-extralight text-gray-600">
                            Created {new Date(data?.createdAt).toLocaleDateString()}
                        </h1>
                    </div>
                    <h1 className="texxt-white">{data?.blog}</h1>
                </div>
                <div className="flex flex-col gap-5 mt-5">
                    <div className="flex flex-row gap-3">
                        <ThumbsUpIcon />
                        <MessageCircle />
                        <Share />
                    </div>
                    <textarea
                        className="w-full rounded px-3 py-2 outline-none bg-slate-300"
                        placeholder="Comment...."
                        name="comment" id="comment"></textarea>
                </div>
            </div>
            <div>
                <div>
                    <div className="hidden md:block">
                        <Category />
                    </div>
                    <Contactus />
                </div>
            </div>
        </div>
        <div className="text-white">
            <Footer />
        </div>
    </main>
} 