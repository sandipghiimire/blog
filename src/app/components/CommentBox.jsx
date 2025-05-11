"use client";
import { useState, useEffect } from "react";

export default function CommentBox({ blogId, userId, onCommentSubmitted }) {
    const [comment, setComment] = useState("");
    const [userCommentsCount, setUserCommentsCount] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false); 

    useEffect(() => {
        const fetchUserCommentsCount = async () => {
            try {
                const response = await fetch(`/api/blog/${blogId}/comments`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch comments: ${response.statusText}`);
                }

                const data = await response.json();

                if (!data.comments) {
                    console.error("Comments data is missing.");
                    return;
                }

                const userCommentCount = data.comments.filter(
                    (comment) => comment.userId.toString() === userId.toString()
                ).length;

                setUserCommentsCount(userCommentCount);
            } catch (error) {
                console.error("Error fetching comments count:", error.message || error);
            }
        };

        fetchUserCommentsCount();
    }, [blogId, userId]);

    const submitComment = async () => {
        if (!comment) return;
        if (userCommentsCount >= 3) {
            alert("You can only comment 3 times.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/blog/${blogId}/comment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, comment }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to submit comment");
            }

            setComment("");
            setUserCommentsCount((prev) => prev + 1);

            await onCommentSubmitted();
        } catch (error) {
            console.error("Error submitting comment:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-6">
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full border rounded p-2"
                disabled={isSubmitting} 
            />
            <button
                onClick={submitComment}
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
                disabled={userCommentsCount >= 3 || isSubmitting} 
            >
                {isSubmitting ? "Submitting..." : "Comment"}
            </button>
            {userCommentsCount >= 3 && (
                <p className="text-red-500 mt-2">You have reached the maximum comment limit.</p>
            )}
        </div>
    );
}
