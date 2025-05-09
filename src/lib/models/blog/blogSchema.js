const { default: mongoose } = require("mongoose")

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        blog: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories"
        },
        image: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;