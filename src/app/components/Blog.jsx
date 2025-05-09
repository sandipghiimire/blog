"use client"
import { ChevronLeft, ChevronRight, Edit3Icon, MessageCircleMore, Share2, ThumbsUp, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Blogpost() {
    const [blog, setBlog] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(2);

    // Pagination calculations
    const totalPages = Math.ceil(blog.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentblogs = blog.slice(startIndex, endIndex);

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    };

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch('/api/blog')
                const data = await res.json();
                setBlog(data.data);
            } catch (error) {
                console.log(error)
            }
        }

        fetchBlog();
    }, [])

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

    return <main>
        <div className="grid lg:grid-cols-1 md:grid-cols-2 grid-cols-1 ">
            {/* <div className="flex-1 flex-col"> */}
            {currentblogs?.map((blog, index) => {
                return (
                    <div key={index}>
                        <div className="grid 2xl:grid-cols-2 grid-cols-1 pt-15 justify-center items-center md:justify-start md:items-start">
                            <div className="min-h-[350px] w-full md:w-[350px] bg-green-100 flex justify-center items-center">
                                {blog.image ? (
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-500">Image placeholder</span>
                                )}
                            </div>
                            <div className="pt-10">
                                <h1 className="text-xl font-bold">
                                    <Link href={`/blog/${blog?._id}`}>{blog?.title}</Link>
                                </h1>
                                <h1 className="text-sm font-extralight text-gray-600">
                                    Created {new Date(blog?.createdAt).toLocaleDateString()}
                                </h1>
                                <h1 className="pt-5 w-full md:w-[350px] line-clamp-6">{blog?.blog}</h1>
                                <div className="flex flex-row gap-3 pt-5 justify-start items-center">
                                    <h1><MessageCircleMore /></h1>
                                    <h1><ThumbsUp /></h1>
                                    <h1><Share2 /></h1>
                                    {user?.isAdmin ? (
                                        <div className="flex flex-row gap-3 text-green-800">
                                            <button className="ring-2 ring-green-800 px-2 hover:bg-green-800 hover:ring-0 hover:text-white py-1 rounded">
                                                <Link href={`/blogform/${blog?._id}`}><Edit3Icon size={18} /></Link>
                                            </button>
                                            <button onClick={() => handelDelete(blog?._id)} className="ring-2 ring-green-800 px-2 hover:bg-red-600 hover:ring-0 hover:text-white py-1 rounded"><Trash2Icon /></button>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className="flex justify-between items-center mt-4 px-4">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="bg-gray-200 px-3 py-2 rounded-lg flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                </button>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <select
                        name="perpage"
                        id="perpage"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                    >
                        <option value="2">2 per page</option>
                        <option value="14">14 per page</option>
                        <option value="50">50 per page</option>
                        <option value="100">100 per page</option>
                        <option value="500">500 per page</option>
                    </select>
                </div>

                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-200 px-3 py-2 rounded-lg flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    </main>
}