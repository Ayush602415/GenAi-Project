import axios from "axios";

export const authClient = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let accessToken = null;
let refreshInFlight = null;

/**
 * Sets the in-memory bearer token used by authenticated API requests.
 * @param {string|null} token Current access token.
 * @returns {void}
 */
export function setAccessToken(token) {
  accessToken = token;
}

authClient.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

/**
 * Registers a new Downbot account.
 * @param {{ name: string, email: string, password: string }} input Registration fields.
 * @returns {Promise<object>} API response data.
 */
export async function registerRequest(input) {
  const { data } = await authClient.post("/auth/register", input);
  return data.data;
}

/**
 * Starts a session with an existing account.
 * @param {{ email: string, password: string }} input Login fields.
 * @returns {Promise<object>} API response data.
 */
export async function loginRequest(input) {
  const { data } = await authClient.post("/auth/login", input);
  return data.data;
}

/**
 * Rotates a session using the httpOnly refresh cookie.
 * @returns {Promise<object>} New access token and public user.
 */
export function refreshRequest() {
  if (!refreshInFlight) {
    refreshInFlight = authClient.post("/auth/refresh")
      .then(({ data }) => data.data)
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

/**
 * Loads the current user's profile.
 * @returns {Promise<object>} Public user profile.
 */
export async function meRequest() {
  const { data } = await authClient.get("/auth/me");
  return data.data.user;
}

/**
 * Ends the current session on the server.
 * @returns {Promise<void>}
 */
export async function logoutRequest() {
  await authClient.post("/auth/logout");
}
