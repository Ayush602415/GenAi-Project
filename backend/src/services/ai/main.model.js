import { env } from "../../config/env.js";
import {ChatOpenAI} from "@langchain/openai"




const model = new ChatOpenAI({
    model: "command-a-plus-05-2026",
    apiKey: env.cohereApikey,
    configuration: {
        baseURL: "https://api.cohere.ai/compatibility/v1"
    }
})



export default model