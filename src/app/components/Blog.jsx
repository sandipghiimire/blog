"use client"
import { ChevronLeft, ChevronRight, MessageCircleMore, Share2, ThumbsUp } from "lucide-react";
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

    return <main>
        <div className="grid lg:grid-cols-1 md:grid-cols-2 grid-cols-1 ">
        {/* <div className="flex-1 flex-col"> */}
            {currentblogs?.map((blog, index) => {
                return (
                    <div>
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
                                <h1 className="text-xl font-bold">{blog?.title}</h1>
                                <h1 className="text-sm font-extralight text-gray-600">
                                    Created {new Date(blog?.createdAt).toLocaleDateString()}
                                </h1>
                                <h1 className="pt-5 w-full md:w-[350px] line-clamp-6">{blog?.blog}</h1>
                                <div className="flex flex-row gap-3 pt-5">
                                    <h1><MessageCircleMore /></h1>
                                    <h1><ThumbsUp /></h1>
                                    <h1><Share2 /></h1>
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