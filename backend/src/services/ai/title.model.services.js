import {ChatGroq} from "@langchain/groq"
import * as z from "zod"
import {SystemMessage, HumanMessage} from "langchain"
import { env } from "../../config/env.js"

const model = new ChatGroq({
    model: "qwen/qwen3.8-27b",
    apiKey: env.groqApikey
})

const structuredModel = model.withStructuredOutput(z.object({
    title: z.string().min(1).max(60).describe("Generate title according to the the user's message.")
}))

export async function generateTitle(message){
    const systemMessage = new SystemMessage(
        `You are an AI assistant that generate the concise and relevant title according to the user's message
        You are an AI Title Generator. Analyze the user's input and generate a short, clear, and relevant title that captures its main intent. Use appropriate keywords, avoid unnecessary words, and do not add unrelated information.
        Return only the generated title without explanations or extra text.`
    )
    const humanMessage = new HumanMessage(message)
    const response = structuredModel.invoke([systemMessage , humanMessage])
    return response
}