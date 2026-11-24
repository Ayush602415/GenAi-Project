import { ChatCohere } from "@langchain/cohere"
import { env } from "../../config/env.js";
import {ChatOpenAI} from "@langchain/openai"
import {CohereClientV2} from "cohere-ai"
import {ChatGroq} from "@langchain/groq"

// const cohereClient = new CohereClientV2({
//     token: env.cohereApikey
// })

// const model = new ChatOpenAI({
//     model: "command-a-05-2026",
//     client: cohereClient
// })

const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: env.GROQ_API_KEY
})


export default model