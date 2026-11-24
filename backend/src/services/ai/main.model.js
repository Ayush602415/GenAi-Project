import { ChatCohere } from "@langchain/cohere"
import { env } from "../../config/env.js";
import {ChatOpenAI} from "@langchain/openai"
import {CohereClientV2} from "cohere-ai"

const cohereClient = new CohereClientV2({
    token: env.cohereApikey
})

const model = new ChatOpenAI({
    model: "command-a-05-2026",
    client: cohereClient
})

export default model