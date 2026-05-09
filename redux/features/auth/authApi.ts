import { baseApi } from "@/redux/features/api/baseApi";

import { extractTokensFromAuthPayload } from "@/lib/auth-tokens";
import { clearTokens, setTokens } from "@/lib/session";

import { AUTH_ENDPOINTS } from "./authEndpoints";
import type {
  LoginCredentials,
  LoginResponseBody,
  MeResponseBody,
  User,
} from "./authTypes";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginCredentials>({
      async queryFn(credentials, _api, _extra, baseQuery) {
        const loginRes = await baseQuery({
          url: AUTH_ENDPOINTS.LOGIN,
          method: "POST",
          body: credentials,
        });

        if (loginRes.error) return { error: loginRes.error };

        const body = loginRes.data as LoginResponseBody;
        if (body.success === false) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: body.message ?? "Login failed",
            },
          };
        }

        const tokens = extractTokensFromAuthPayload(body);
        if (!tokens) {
          return {
            error: { status: "CUSTOM_ERROR", error: "Invalid login response" },
          };
        }
        try {
          await setTokens(
            tokens.accessToken,
            tokens.refreshToken ?? undefined
          );
        } catch (e) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error:
                e instanceof Error
                  ? e.message
                  : "Failed to persist session",
            },
          };
        }

        const meRes = await baseQuery({
          url: AUTH_ENDPOINTS.ME,
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        });
        if (meRes.error) {
          await clearTokens();
          return { error: meRes.error };
        }

        const user = (meRes.data as MeResponseBody)?.data;
        if (!user) {
          return {
            error: { status: "CUSTOM_ERROR", error: "Failed to load profile" },
          };
        }

        return { data: user };
      },
      invalidatesTags: ["Auth", "User"],
    }),

    fetchMe: builder.query<User, void>({
      query: () => ({ url: AUTH_ENDPOINTS.ME, method: "GET" }),
      transformResponse: (res: MeResponseBody) => res.data!,
      providesTags: ["User"],
    }),

    logout: builder.mutation<void, void>({
      async queryFn() {
        await clearTokens();
        return { data: "Logged out successfully" as unknown as void };
      },
      invalidatesTags: ["Auth"],
    }),

    refreshToken: builder.mutation<void, { refreshToken: string }>({
      query: (body) => ({
        url: AUTH_ENDPOINTS.REFRESH,
        method: "POST",
        body,
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useLoginMutation,
  useFetchMeQuery,
  useLogoutMutation,
  useRefreshTokenMutation,
} = authApi;
