import { HumanMessage, SystemMessage } from "langchain";
import * as z from "zod";
import model from "./main.model.js";

const structuredModel = model.withStructuredOutput(
  z.object({
    title: z.string().min(1).max(60).describe("A concise title for the user's message."),
  }),
  { method: "jsonMode" },
);

export async function generateTitle(message) {
  const systemMessage = new SystemMessage(
    'Generate a short, clear title that captures the user\'s message. Return a JSON object with a single "title" string field. Keep the title between 1 and 60 characters.',
  );
  const humanMessage = new HumanMessage(message);
  return structuredModel.invoke([systemMessage, humanMessage]);
}
