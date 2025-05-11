const { default: mongoose } = require("mongoose");
import BlogUser from "@/lib/models/user/userSchema";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        blog: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories",
        },
        image: {
            type: String,
            required: true,
        },

        likes: {
            count: {
                type: Number,
                default: 0, 
            },
            users: {
                type: [mongoose.Schema.Types.ObjectId], 
                ref: "User",
                default: [], 
            },
        },

        comments: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Bloguser",
                    required: true,
                },
                comment: {
                    type: String,
                    required: true,
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
