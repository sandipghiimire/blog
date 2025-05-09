const { default: mongoose } = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    }
)

const Contact = mongoose.models.Blogcontact || mongoose.model("Blogcontact", contactSchema);
export default Contact;