"use client"
import QuillEditor from "@/app/components/QuillEditor";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const params = useParams();
    const id = params.id; 
    const [blog, setBlog] = useState({ title: '', blog: '', category: '' });
    const [message, setMessage] = useState('');
    const router = useRouter();
    const [selectcata, setSelectcata] = useState([]);

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

    useEffect(() => {
        // Fetch existing blog data when the component mounts
        const fetchBlog = async () => {
            const response = await fetch(`/api/blog/${id}`);
            const data = await response.json();
            if (response.ok) {
                setBlog(data.blog);
            } else {
                setMessage(data.message || 'Failed to fetch blog');
            }
        };
        fetchBlog();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`/api/blog/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage('Blog updated successfully!');
            router.push(`/blogform/listview`);
        } else {
            setMessage(data.message || 'Failed to update blog');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog(prev => ({ ...prev, [name]: value }));
    };


    return <main className="h-full w-full bg-slate-200 p-10 text-black">
        <form onSubmit={handleSubmit}>
            <div>
                <h1>Add your blog</h1>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                    <h1>Title of The Blog!</h1>
                    <input
                        type="text"
                        value={blog.title}
                        onChange={handleChange}
                        className="bg-gray-200 px-3 py-2 outline-none ring-2 ring-gray-300"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <h1>Category <span className="text-red-600">*</span></h1>
                    <select
                        name="category"
                        value={blog.category}
                        onChange={handleChange}
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
                        value={blog.blog}
                        onChange={handleChange}
                        className="bg-gray-200 px-3 py-2 outline-none ring-2 ring-gray-300 md:h-[400px]"
                    />
                </div>
            </div>
            <div className="pt-5">
                <button className="px-3 py-2 bg-green-800 rounded-lg text-white w-full">Update Blog</button>
            </div>
        </form>
        {message && <p className="text-red-500 mt-3">{message}</p>}
    </main>
}