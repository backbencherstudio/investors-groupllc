import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { extractTokensFromAuthPayload } from "@/lib/auth-tokens";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/lib/session";
import { AUTH_ENDPOINTS } from "@/redux/features/auth/authEndpoints";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: async (headers) => {
    if (!headers.has("Authorization")) {
      const token = await getAccessToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const AUTH_URLS = [AUTH_ENDPOINTS.LOGIN, AUTH_ENDPOINTS.REFRESH];

const baseQueryWithReauth: typeof baseQuery = async (args, api, extra) => {
  let result = await baseQuery(args, api, extra);
  const url = typeof args === "string" ? args : args.url;

  // Auth endpoint errors (wrong credentials, expired refresh) should bubble
  // back to the caller — never force a hard redirect for them.
  if (AUTH_URLS.some((u) => url.endsWith(u))) return result;

  if (result.error?.status === 401 || result.error?.status === 403) {
    const refreshEnabled = process.env.NEXT_PUBLIC_ENABLE_REFRESH === "true";

    if (!refreshEnabled) {
      await clearTokens();
      if (typeof window !== "undefined") window.location.href = "/login";
      return result;
    }

    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      await clearTokens();
      if (typeof window !== "undefined") window.location.href = "/login";
      return result;
    }

    const refreshResult = await baseQuery(
      { url: AUTH_ENDPOINTS.REFRESH, method: "POST", body: { refreshToken } },
      api,
      extra
    );

    const parsed = extractTokensFromAuthPayload(refreshResult.data);
    if (parsed) {
      await setTokens(parsed.accessToken, parsed.refreshToken ?? undefined);
      result = await baseQuery(args, api, extra);
    } else {
      await clearTokens();
      if (typeof window !== "undefined") window.location.href = "/login";
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Auth"],
  endpoints: () => ({}),
});
