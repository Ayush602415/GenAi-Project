import contextModel from "../models/context.model.js";

export async function createContext(context,userId) {
    return contextModel.findOneAndUpdate({user:userId},{context},{upsert: true , new: true})
}

export async function getContextByUserId(userId){
    return contextModel.findOne({user: userId})
}