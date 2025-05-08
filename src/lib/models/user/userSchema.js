const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required: true
        },
        email: {
            type:String,
            required: true
        },
        password: {
            type:String,
            required: true
        },
        number: {
            type:String,
            required: true
        },
        isAdmin:{
            type: Boolean,
            default: false
        }
    }
)

const User = mongoose.models.Bloguser || mongoose.model("Bloguser", userSchema);
export default User;