"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";




export default function Page() {

    const route = useRouter();

    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [blog, setBlog] = useState("");
    const [selectcata, setSelectcata] = useState([]);
    const [title, setTitle] = useState("");

    const handelSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = "";

            if (image) {
                const formData = new FormData();
                formData.append("file", image); 

                formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

                const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: "POST",
                    body: formData
                });

                const data = await res.json();
                imageUrl = data.secure_url;
            }

            const res = await fetch("/api/blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    blog,
                    category,
                    image: imageUrl
                })
            });

            if (!res.ok) {
                throw new Error('Failed to create blog');
            }

            const result = await res.json();
            console.log('Blog created successfully:', result);
            route.push('/admin/blogform/listview')

        } catch (error) {
            console.log("Error while creating blog:", error);
        }
    };




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

    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }
    };

    return <main className="h-full w-full bg-slate-200 p-10 text-black">
        <form onSubmit={handelSubmit}>
            <div className="flex flex-row justify-between pb-5">
                <h1>Add your blog</h1>
                <Link href={'/admin/blogform/listview'}><h1 className="bg-gray-300 px-3 py-1 rounded-lg">View Blogs</h1></Link>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                    <h1>Image</h1>
                    <input
                        required
                        onChange={handleImageChange}
                        className="bg-gray-200 px-3 py-2 outline-none ring-2 ring-gray-300"
                        type="file"
                        accept="image/*"
                    />

                    {preview && (
                        <img src={preview} alt="Preview" className="w-64 h-auto rounded-lg shadow" />
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <h1>Title of The Blog!</h1>
                    <input
                        required
                        type="text"
                        value={title}
                        onChange={((e) => setTitle(e.target.value))}
                        className="bg-gray-200 px-3 py-2 outline-none ring-2 ring-gray-300"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <h1>Brand <span className="text-red-600">*</span></h1>
                    <select
                        required
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
                        required
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