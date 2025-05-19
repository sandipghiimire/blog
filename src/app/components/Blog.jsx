"use client"
import { ChevronLeft, ChevronRight, Edit3Icon, MessageCircleMore, Share2, ThumbsUp, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import LikeButton from "./LikeButton";

export default function Blogpost() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    const totalPages = Math.ceil(blogs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBlogs = blogs.slice(startIndex, endIndex);

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    };

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch('/api/blog');
                const data = await res.json();
                setBlogs(data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, []);

    useEffect(() => {
        const fetchLoggedinUser = async () => {
            try {
                const res = await fetch('/api/me');
                const data = await res.json();
                setUser(data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLoggedinUser();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/blog/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (res.ok) {
                setBlogs(blogs.filter((blog) => blog._id !== id));
            } else {
                console.log("Couldn't delete the blog!");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main>
            <div className="grid lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-8">
                {loading
                    ? [...Array(itemsPerPage)].map((_, index) => (
                        <div
                            key={index}
                            className="grid 2xl:grid-cols-2 grid-cols-1 pt-15 animate-pulse gap-4"
                        >
                            <div className="min-h-[350px] w-full md:w-[350px] bg-gray-200 rounded" />
                            <div className="pt-10 space-y-4">
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="space-y-2 pt-5">
                                    <div className="h-4 bg-gray-200 rounded w-full md:w-[350px]"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full md:w-[350px]"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6 md:w-[300px]"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/6 md:w-[250px]"></div>
                                </div>
                                <div className="flex flex-row gap-3 pt-5">
                                    <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                                    <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                                    <div className="flex flex-row gap-3">
                                        <div className="h-8 w-8 bg-gray-200 rounded"></div>
                                        <div className="h-8 w-8 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    : currentBlogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="grid 2xl:grid-cols-2 grid-cols-1 pt-15 justify-center items-center md:justify-start md:items-start"
                        >
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
                                    <Link href={`/blog/${blog._id}`}>{blog.title}</Link>
                                </h1>
                                <h1 className="text-sm font-extralight text-gray-600">
                                    Created {new Date(blog.createdAt).toLocaleDateString()}
                                </h1>
                                <h1 className="pt-5 w-full md:w-[350px] line-clamp-6">{blog.blog}</h1>
                                <div className="flex flex-row gap-3 pt-5 justify-start items-center">
                                    {user && (
                                        <LikeButton
                                            blogId={blog._id}
                                            userId={user._id}
                                            initialLikes={blog.likes?.count || 0}
                                            isLiked={blog.likes?.users?.includes(user._id)}
                                        />
                                    )}
                                    <div>
                                        <Link href={`/blog/${blog._id}`}>
                                            <MessageCircleMore />
                                        </Link>
                                    </div>
                                    <h1>
                                        <Share2 />
                                    </h1>
                                    {user?.isAdmin && (
                                        <div className="flex flex-row gap-3 text-slate-800">
                                            <button className="ring-2 ring-slate-800 px-2 hover:bg-slate-800 hover:ring-0 hover:text-white py-1 rounded">
                                                <Link href={`/blogform/${blog._id}`}>
                                                    <Edit3Icon size={18} />
                                                </Link>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(blog._id)}
                                                className="ring-2 ring-slate-800 px-2 hover:bg-red-600 hover:ring-0 hover:text-white py-1 rounded"
                                            >
                                                <Trash2Icon />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Pagination */}
            {!loading && (
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
            )}
        </main>
    );
}
