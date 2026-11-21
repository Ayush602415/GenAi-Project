import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "New conversation",
    },
    lastMessage:{
      type: Date,
      default: null
    }
  },
  { timestamps: true },
);

conversationSchema.index({ user: 1, lastMessage: -1 });

const ConversationModel = mongoose.model("Conversation", conversationSchema);
export default ConversationModel;
