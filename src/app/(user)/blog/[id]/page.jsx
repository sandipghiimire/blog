"use client";
import Category from "@/app/components/Categories";
import CommentBox from "@/app/components/CommentBox";
import Contactus from "@/app/components/Contactus";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import LikeButton from "@/app/components/LikeButton";
import { Edit3Icon, MessageCircle, Share, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Page() {
    const pathname = usePathname();
    const segments = pathname.split("/");
    const blogId = segments[segments.length - 1];

    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLoggedinUser = async () => {
            try {
                const res = await fetch('/api/me');
                const data = await res.json();
                setUser(data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchLoggedinUser();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/blog/${blogId}`);
            const data = await res.json();
            setData(data.blog);
            setComments(data.blog.comments);
        } catch (error) {
            console.error("Error fetching blog data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [blogId]);

    const handelDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/blog/${blogId}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok) {
                console.log("Didn't get the blog!");
            }
            await fetchData();
            console.log("Blog Deleted Successfully!!", data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteComment = async (commentId) => {
        try {
            const response = await fetch(`/api/blog/${blogId}/comment/${commentId}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Failed to delete comment:", data.message);
                throw new Error("Failed to delete comment");
            }
            await fetchData();
            console.log("Comment deleted successfully");
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <main className="bg-gray-200 text-black">
            <Header />
            <div className="flex flex-col xl:flex-row">
                <div className="md:p-10 p-5 h-full w-full">
                    <div className="h-[350px] flex justify-center items-center bg-slate-100">
                        {loading ? (
                            <Skeleton height={350} width="100%" />
                        ) : data?.image ? (
                            <img
                                src={data?.image}
                                alt={data?.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-gray-500">Image placeholder</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-5 mt-20">
                        <div>
                            <div className="flex flex-row justify-between">
                                <h1 className="text-black text-2xl font-semibold">
                                    {loading ? <Skeleton width={250} /> : data?.title}
                                </h1>
                                {user?.isAdmin && !loading && (
                                    <div className="flex flex-row gap-3 text-green-800">
                                        <button className="ring-2 ring-green-800 px-2 hover:bg-green-800 hover:ring-0 hover:text-white py-1 rounded">
                                            <Link href={`/blogform/${data?._id}`}>
                                                <Edit3Icon size={18} />
                                            </Link>
                                        </button>
                                        <button
                                            onClick={handelDelete}
                                            className="ring-2 ring-green-800 px-2 hover:bg-red-600 hover:ring-0 hover:text-white py-1 rounded"
                                        >
                                            <Trash2Icon />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <h1 className="text-sm font-extralight text-gray-600">
                                {loading
                                    ? <Skeleton width={100} />
                                    : `Created ${new Date(data?.createdAt).toLocaleDateString()}`}
                            </h1>
                        </div>

                        <div className="text-black">
                            {loading ? <Skeleton count={5} /> : data?.blog}
                        </div>
                    </div>

                    <div className="flex flex-row gap-3 mt-5">
                        {user && !loading && (
                            <LikeButton
                                blogId={data._id}
                                userId={user._id}
                                initialLikes={data.likes?.count || 0}
                                isLiked={data.likes?.users?.includes(user._id)}
                            />
                        )}
                        <MessageCircle />
                        <Share />
                    </div>

                    {!loading && user && (
                        <CommentBox
                            blogId={data?._id}
                            userId={user?._id}
                            onCommentSubmitted={fetchData}
                        />
                    )}

                    <div className="flex flex-col gap-8 mt-5">
                        {loading ? (
                            [...Array(3)].map((_, index) => (
                                <div key={index} className="p-4 border-b border-gray-200">
                                    <Skeleton height={60} />
                                </div>
                            ))
                        ) : (
                            comments?.map((comment, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 border-b border-gray-200">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                                        {comment?.userId?.name?.charAt(0)}
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="flex flex-row justify-between">
                                            <div className="flex flex-col">
                                                <div className="text-lg font-semibold text-gray-800">{comment?.userId?.name}</div>
                                                <div className="text-sm text-gray-500">{comment?.userId?.email}</div>
                                            </div>
                                            {user?.isAdmin && (
                                                <button onClick={() => deleteComment(comment?._id)}>
                                                    <Trash2Icon />
                                                </button>
                                            )}
                                        </div>
                                        <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700">
                                            {comment?.comment}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div>
                    <div className="hidden md:block">
                        <Category />
                    </div>
                    <Contactus />
                </div>
            </div>
            <div className="text-white">
                <Footer />
            </div>
        </main>
    );
}
