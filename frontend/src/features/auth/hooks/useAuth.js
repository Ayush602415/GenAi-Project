import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authFailed,
  authLoading,
  clearAuthError,
  sessionEnded,
  sessionStarted,
} from "../state/authSlice.js";
import {
  loginRequest,
  logoutRequest,
  meRequest,
  refreshRequest,
  registerRequest,
  setAccessToken,
} from "../api/authApi.js";

/**
 * Exposes auth state and session actions to authentication UI.
 * @returns {{ user: object|null, status: string, error: string|null, login: Function, register: Function, logout: Function, clearError: Function }}
 */
export function useAuth() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  const startSession = useCallback((session) => {
    setAccessToken(session.accessToken);
    dispatch(sessionStarted(session));
  }, [dispatch]);

  const runAuth = useCallback(async (request) => {
    dispatch(authLoading());
    try {
      const session = await request();
      startSession(session);
      return true;
    } catch (requestError) {
      const response = requestError.response?.data;
      const details = Array.isArray(response?.errors)
        ? response.errors
            .filter((item) => typeof item.field === "string" && typeof item.message === "string")
            .map((item) => `${item.field}: ${item.message}`)
            .join("; ")
        : "";
      const message = details
        ? `${response.message ?? "Request failed"}: ${details}`
        : response?.message ?? "Something went wrong. Please try again.";
      setAccessToken(null);
      dispatch(authFailed(message));
      return false;
    }
  }, [dispatch, startSession]);

  const login = useCallback((input) => runAuth(() => loginRequest(input)), [runAuth]);
  const register = useCallback((input) => runAuth(() => registerRequest(input)), [runAuth]);

  const logout = useCallback(async () => {
    await logoutRequest();
    setAccessToken(null);
    dispatch(sessionEnded());
  }, [dispatch]);

  return {
    user,
    status,
    error,
    login,
    register,
    logout,
    clearError: () => dispatch(clearAuthError()),
  };
}

/**
 * Restores a browser session once at the application root.
 * @returns {void}
 */
export function useInitializeAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    let active = true;
    refreshRequest()
      .then(async (session) => {
        setAccessToken(session.accessToken);
        const currentUser = await meRequest();
        if (active) dispatch(sessionStarted({ ...session, user: currentUser }));
      })
      .catch(() => {
        setAccessToken(null);
        if (active) dispatch(sessionEnded());
      });
    return () => {
      active = false;
    };
  }, [dispatch]);
}
