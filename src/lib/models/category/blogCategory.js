const { default: mongoose } = require("mongoose")

const blogCategory = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
)

const Categories = mongoose.models.Categories || mongoose.model("Categories", blogCategory);
export default Categories;