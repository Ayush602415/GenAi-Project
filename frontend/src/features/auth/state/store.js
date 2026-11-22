import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import conversationReducer from "./conversationSlice.js";

export const store = configureStore({
  reducer: { auth: authReducer, conversation: conversationReducer },
});
