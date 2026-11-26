import { tool } from "langchain";
import * as z from "zod";
import { createContext, getContextByUserId } from "../../../DAO/context.dao.js";

export const generateContextTool = tool(
  async (_state, config) => {
    const { userId } = config.configurable;
    const context = await getContextByUserId(userId);
    return context.context;
  },
  {
    name: "GetUserContext",
    description: "Use this to get the current userContext",
    schema: z.object({})
  },
);

export const setContextTool = tool(
    async({context},config)=>{
        const {userId} = config.configurable
        const response = await createContext(context , userId)
        return response.context
    },
    {
        name: "SetUserContext",
        description: `Use this to create or update the current user context
                       Use this tool-
                       - When you know something new about the user that will last long for days/week/months/years`,
        schema: z.object({
            context: z.string()
        })
    }
) 
