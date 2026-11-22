import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginRequest,
  logoutRequest,
  meRequest,
  refreshRequest,
  registerRequest,
  setAccessToken,
} from "../api/authApi.js";

const initialState = {
  user: null,
  accessToken: null,
  status: "loading",
  error: null,
};

function getErrorMessage(error) {
  const response = error.response?.data;
  const details = Array.isArray(response?.errors)
    ? response.errors
        .filter((item) => typeof item.field === "string" && typeof item.message === "string")
        .map((item) => `${item.field}: ${item.message}`)
        .join("; ")
    : "";

  return details
    ? `${response.message ?? "Request failed"}: ${details}`
    : response?.message ?? "Something went wrong. Please try again.";
}

function createAuthThunk(type, request) {
  return createAsyncThunk(type, async (input, { rejectWithValue }) => {
    try {
      const session = await request(input);
      setAccessToken(session.accessToken);
      return session;
    } catch (error) {
      setAccessToken(null);
      return rejectWithValue(getErrorMessage(error));
    }
  });
}

export const loginUser = createAuthThunk("auth/login", loginRequest);
export const registerUser = createAuthThunk("auth/register", registerRequest);

export const restoreSession = createAsyncThunk("auth/restoreSession", async () => {
  try {
    const session = await refreshRequest();
    setAccessToken(session.accessToken);
    const user = await meRequest();
    return { ...session, user };
  } catch (error) {
    setAccessToken(null);
    throw error;
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await logoutRequest();
  setAccessToken(null);
});

export const getConversation = createAsyncThunk("/conversation", async()=>{

})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.status = "authenticated";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "unauthenticated";
        state.error = action.payload ?? action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.status = "authenticated";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "unauthenticated";
        state.error = action.payload ?? action.error.message;
      })
      .addCase(restoreSession.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.status = "authenticated";
        state.error = null;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.status = "unauthenticated";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.status = "unauthenticated";
        state.error = null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
