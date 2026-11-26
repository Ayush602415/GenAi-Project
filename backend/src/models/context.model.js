import mongoose from "mongoose";

const contextSchema = new mongoose.Schema({
    context:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const contextModel = mongoose.model("Context",contextSchema)
export default contextModel