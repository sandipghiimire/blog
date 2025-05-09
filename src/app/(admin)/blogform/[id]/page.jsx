"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const params = useParams();
    const id = params.id;
    const [title, setTitle] = useState("");
    const [blog, setBlog] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState('');
    const router = useRouter();
    const [selectcata, setSelectcata] = useState([]);
    const [image, setImage] = useState(null);  // New state for image
    const [preview, setPreview] = useState(null);  // Preview for selected image

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await fetch('/api/category')
                const data = await res.json();
                setSelectcata(data.data);
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
                setTitle(data.blog.title);
                setCategory(data.blog.category);
                setBlog(data.blog.blog);
                setPreview(data.blog.image); // Set image preview if it exists
            } else {
                setMessage(data.message || 'Failed to fetch blog');
            }
        };
        fetchBlog();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        // Set preview for the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = preview; // If image isn't updated, use the existing one

        if (image) {
            // If a new image is selected, upload it to Cloudinary
            const formData = new FormData();
            formData.append("file", image); // from file input
            formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

            const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            imageUrl = data.secure_url;  // Get the image URL after upload
        }

        // Now send all blog data including the updated image
        const response = await fetch(`/api/blog/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, blog, category, image: imageUrl }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage('Blog updated successfully!');
        } else {
            setMessage(data.message || 'Failed to update blog');
        }
    };

    return (
        <main className="h-full w-full bg-slate-200 p-10 text-black">
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>Update Your Blog</h1>
                </div>
                <div className="flex flex-col gap-3">
                    
                    <div className="flex flex-col gap-3">
                        <h1>Image</h1>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="bg-gray-200 px-3 py-2 outline-none ring-2 ring-gray-300"
                            accept="image/*"
                        />
                        
                        {/* Preview image if available */}
                        {preview && <img src={preview} alt="Preview" className="w-64 h-auto rounded-lg shadow mt-2" />}
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <h1>Title of The Blog!</h1>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-gray-200 px-3 py-2 outline-none ring-2 ring-gray-300"
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <h1>Category <span className="text-red-600">*</span></h1>
                        <select
                            name="category"
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
                            onChange={(e) => setBlog(e.target.value)}
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
    );
}
