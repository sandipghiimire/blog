"use client"
import QuillEditor from "@/app/components/QuillEditor";
import { useEffect, useState } from "react";

export default function Page() {

    const [category, setCategory] = useState("");
    const [blog, setBlog] = useState("");
    const [selectcata, setSelectcata] = useState([]);
    const [title, setTitle] = useState("");

    const handelSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    blog,
                    category: category
                })

            });

            if (!res.ok) {
                throw new Error('Failed to create blog');
            }
            const data = await res.json();
            console.log('Blog created successfully:', data);
        } catch (error) {
            console.log("Error while creating blog:", error);
        }
    }


    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await fetch('/api/category')
                const data = await res.json();
                setSelectcata(data.data);
                console.log(data.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchCategory();
    }, [])

    return <main className="h-full w-full bg-slate-200 p-10 text-black">
        <form onSubmit={handelSubmit}>
            <div>
                <h1>Add your blog</h1>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                    <h1>Title of The Blog!</h1>
                    <input
                        type="text"
                        value={title}
                        onChange={((e) => setTitle(e.target.value))}
                        className="bg-gray-200 px-3 py-2 outline-none ring-2 ring-gray-300"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <h1>Brand <span className="text-red-600">*</span></h1>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-3 py-2 bg-gray-200 outline-none ring-2 ring-gray-300"
                    >
                        <option value="">--Select Category--</option>
                        {selectcata.map((brand) => (
                            <option value={brand._id} key={brand._id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-3">
                    <h1>Description</h1>
                    <textarea
                        type="text"
                        value={blog}
                        onChange={((e) => setBlog(e.target.value))}
                        className="bg-gray-200 px-3 py-2 outline-none ring-2 ring-gray-300 md:h-[400px]"
                    />
                </div>
            </div>
            <div className="pt-5">
                <button className="px-3 py-2 bg-green-800 rounded-lg text-white w-full">Submit</button>
            </div>
        </form>
    </main>
}