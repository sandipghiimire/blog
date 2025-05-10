"use client";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { useState } from "react";

const LikeButton = ({ blogId, userId, initialLikes, isLiked }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(isLiked);

  const handleLikeToggle = async () => {
    const response = await fetch(`/api/blog/${blogId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      const data = await response.json(); 
      setLikes(data.likes.count);
      setLiked(data.liked);
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={handleLikeToggle}
        className={`pl-4 py-2 rounded "text-blue-500"`}
      >
        {liked ?  <FaThumbsUp size={20}/>:<FaRegThumbsUp size={20}/> }
      </button>
      <span>{likes}</span>
    </div>
  );
};

export default LikeButton;
