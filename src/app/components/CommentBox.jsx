"use client";
import { useState, useEffect } from "react";

export default function CommentBox({ blogId, userId }) {
    const [comment, setComment] = useState("");
    const [userCommentsCount, setUserCommentsCount] = useState(0);

    useEffect(() => {
        const fetchUserCommentsCount = async () => {
            try {
                const response = await fetch(`/api/blog/${blogId}/comments`);

                // Check if the response is successful (status code 200)
                if (!response.ok) {
                    throw new Error(`Failed to fetch comments: ${response.statusText}`);
                }

                // Parse the response JSON
                const data = await response.json();

                // Ensure 'comments' array is available
                if (!data.comments) {
                    console.error("Comments data is missing.");
                    return;
                }

                // Filter and count the user's comments
                const userCommentCount = data.comments.filter(
                    (comment) => comment.userId.toString() === userId.toString()
                ).length;

                setUserCommentsCount(userCommentCount);
            } catch (error) {
                // Handle any errors that occurred during the fetch or processing
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

        try {
            const response = await fetch(`/api/blog/${blogId}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    comment,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Server error:", errorData);
                throw new Error("Failed to submit comment");
            }

            setComment("");
            setUserCommentsCount((prevCount) => prevCount + 1);
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    return (
        <div className="mt-6">
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full border rounded p-2"
            />
            <button
                onClick={submitComment}
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
                disabled={userCommentsCount >= 3}
            >
                Comment
            </button>
            {userCommentsCount >= 3 && (
                <p className="text-red-500 mt-2">You have reached the maximum comment limit.</p>
            )}
        </div>
    );
}
