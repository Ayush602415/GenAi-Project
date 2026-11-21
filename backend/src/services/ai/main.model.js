import { ChatGroq } from "@langchain/groq";
import { env } from "../../config/env";

const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: env.groqApikey
})

export default model