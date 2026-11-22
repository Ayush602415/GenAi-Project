import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthError,
  loginUser,
  logoutUser,
  registerUser,
  restoreSession,
} from "../state/authSlice.js";

/**
 * Exposes auth state and session actions to authentication UI.
 * @returns {{ user: object|null, status: string, error: string|null, login: Function, register: Function, logout: Function, clearError: Function }}
 */
export function useAuth() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  const runAuth = useCallback(async (action) => {
    try {
      await dispatch(action).unwrap();
      return true;
    } catch {
      return false;
    }
  }, [dispatch]);

  const login = useCallback((input) => runAuth(loginUser(input)), [runAuth]);
  const register = useCallback((input) => runAuth(registerUser(input)), [runAuth]);

  const logout = useCallback(async () => {
    await dispatch(logoutUser()).unwrap();
  }, [dispatch]);

  return {
    user,
    status,
    error,
    login,
    register,
    logout,
    clearError: useCallback(() => dispatch(clearAuthError()), [dispatch]),
  };
}

/**
 * Restores a browser session once at the application root.
 * @returns {void}
 */
export function useInitializeAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);
}
