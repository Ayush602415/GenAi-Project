import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getConversationMessages,
  getConversations,
  streamConversationMessage,
} from "../api/conversationApi.js";

const initialState = {
  conversations: [],
  messages: [],
  activeConversationId: null,
  conversationsStatus: "idle",
  messagesStatus: "idle",
  sendStatus: "idle",
  error: null,
};

function getErrorMessage(error) {
  return error.response?.data?.message ?? error.message ?? "Conversation request failed.";
}

export const fetchConversations = createAsyncThunk(
  "conversation/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getConversations();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchConversationMessages = createAsyncThunk(
  "conversation/fetchMessages",
  async (conversationId, { rejectWithValue }) => {
    try {
      const messages = await getConversationMessages(conversationId);
      return { conversationId, messages };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const sendConversationMessage = createAsyncThunk(
  "conversation/sendMessage",
  async ({ content, conversationId }, { dispatch, rejectWithValue, requestId, signal }) => {
    try {
      await streamConversationMessage({
        content,
        conversationId,
        signal,
        onConversation: (conversation) => dispatch(conversationReceived(conversation)),
        onChunk: (chunk) => dispatch(assistantChunkReceived({ requestId, chunk })),
      });
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    conversationReceived(state, action) {
      const { conversationId, title } = action.payload;
      state.activeConversationId = conversationId;
      const existing = state.conversations.find((item) => item._id === conversationId);
      if (existing) {
        existing.title = title || existing.title;
      } else {
        state.conversations.unshift({
          _id: conversationId,
          title: title || "New conversation",
        });
      }
    },
    assistantChunkReceived(state, action) {
      const message = state.messages.find(
        (item) => item.id === `assistant-${action.payload.requestId}`,
      );
      if (message) message.content += action.payload.chunk;
    },
    clearConversationError(state) {
      state.error = null;
    },
    clearConversationMessages(state) {
      state.activeConversationId = null;
      state.messages = [];
      state.messagesStatus = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.conversationsStatus = "loading";
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversationsStatus = "succeeded";
        const fetchedIds = new Set(action.payload.map((item) => item._id));
        state.conversations = [
          ...state.conversations.filter((item) => !fetchedIds.has(item._id)),
          ...action.payload,
        ];
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.conversationsStatus = "failed";
        state.error = action.payload ?? action.error.message;
      })
      .addCase(fetchConversationMessages.pending, (state, action) => {
        state.messagesStatus = "loading";
        state.activeConversationId = action.meta.arg;
        state.messages = [];
        state.error = null;
      })
      .addCase(fetchConversationMessages.fulfilled, (state, action) => {
        if (state.activeConversationId !== action.payload.conversationId) return;
        state.messagesStatus = "succeeded";
        state.messages = action.payload.messages;
      })
      .addCase(fetchConversationMessages.rejected, (state, action) => {
        if (state.activeConversationId !== action.meta.arg) return;
        state.messagesStatus = "failed";
        state.error = action.payload ?? action.error.message;
      })
      .addCase(sendConversationMessage.pending, (state, action) => {
        state.sendStatus = "sending";
        state.error = null;
        state.messages.push(
          {
            id: `user-${action.meta.requestId}`,
            role: "user",
            content: action.meta.arg.content,
          },
          {
            id: `assistant-${action.meta.requestId}`,
            role: "assistant",
            content: "",
          },
        );
      })
      .addCase(sendConversationMessage.fulfilled, (state) => {
        state.sendStatus = "idle";
      })
      .addCase(sendConversationMessage.rejected, (state, action) => {
        state.sendStatus = "idle";
        state.error = action.payload ?? action.error.message;
        const assistantId = `assistant-${action.meta.requestId}`;
        state.messages = state.messages.filter(
          (message) => message.id !== assistantId || message.content,
        );
      });
  },
});

export const {
  assistantChunkReceived,
  clearConversationError,
  clearConversationMessages,
  conversationReceived,
} = conversationSlice.actions;
export default conversationSlice.reducer;