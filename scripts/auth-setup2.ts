// const fs = require("fs");
// const path = require("path");

// const files = {
//   // ─── App ───────────────────────────────────────────────
//   "app/layout.tsx": `
// import type { Metadata } from "next";
// import "./globals.css";
// import { ReduxProvider } from "@/redux/ReduxProvider";

// export const metadata: Metadata = {
//   title: "Your App",
//   description: "",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <ReduxProvider>{children}</ReduxProvider>
//       </body>
//     </html>
//   );
// }
// `.trim(),

//   "app/(auth)/login/page.tsx": `
// import LoginForm from "@/components/auth/LoginForm";

// export default function LoginPage() {
//   return <LoginForm />;
// }
// `.trim(),

//   "app/(dashboard)/layout.tsx": `
// import { AuthProvider } from "@/components/provider/AuthProvider";
// import type { ReactNode } from "react";

// export default function DashboardLayout({ children }: { children: ReactNode }) {
//   return <AuthProvider>{children}</AuthProvider>;
// }
// `.trim(),

//   "app/(dashboard)/page.tsx": `
// "use client";
// import useAuth from "@/hooks/useAuth";

// export default function DashboardPage() {
//   const { user } = useAuth();
//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>Hi, {user?.full_name}</p>
//     </div>
//   );
// }
// `.trim(),

//   // ─── Redux ─────────────────────────────────────────────
//   "redux/features/auth/authTypes.ts": `
// export interface User {
//   id: string;
//   email: string;
//   full_name: string;
//   plan: string;
//   role: string;
//   is_verified: boolean;
// }

// export interface LoginCredentials {
//   email: string;
//   password: string;
// }

// export interface LoginResponseBody {
//   access_token: string;
//   refresh_token: string;
//   token_type: string;
//   expires_in: number;
//   user: User;
// }

// export type MeResponseBody = User;

// export interface AuthState {
//   user: User | null;
//   isHydrated: boolean;
// }
// `.trim(),

//   "redux/features/auth/authSlice.ts": `
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { AuthState, User } from "./authTypes";

// const initialState: AuthState = {
//   user: null,
//   isHydrated: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<User | null>) {
//       state.user = action.payload;
//     },
//     setHydrated(state, action: PayloadAction<boolean>) {
//       state.isHydrated = action.payload;
//     },
//     clearAuth(state) {
//       state.user = null;
//       state.isHydrated = false;
//     },
//   },
// });

// export const { setUser, setHydrated, clearAuth } = authSlice.actions;

// export const selectUser          = (state: { auth: AuthState }) => state.auth.user;
// export const selectIsHydrated    = (state: { auth: AuthState }) => state.auth.isHydrated;
// export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.user !== null;

// export default authSlice.reducer;
// `.trim(),

//   "redux/features/api/baseApi.ts": `
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { extractTokensFromAuthPayload } from "@/lib/auth-tokens";
// import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "@/lib/session";
// import { API_URL, ENABLE_REFRESH } from "@/lib/constants/env";

// const baseQuery = fetchBaseQuery({
//   baseUrl: API_URL,
//   prepareHeaders: async (headers) => {
//     if (!headers.has("Authorization")) {
//       const token = await getAccessToken();
//       if (token) headers.set("Authorization", \`Bearer \${token}\`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReauth: typeof baseQuery = async (args, api, extra) => {
//   let result = await baseQuery(args, api, extra);

//   if (result.error?.status === 401) {
//     if (!ENABLE_REFRESH) {
//       await clearTokens();
//       if (typeof window !== "undefined") window.location.href = "/login";
//       return result;
//     }

//     const refreshToken = await getRefreshToken();
//     if (!refreshToken) {
//       await clearTokens();
//       if (typeof window !== "undefined") window.location.href = "/login";
//       return result;
//     }

//     const refreshResult = await baseQuery(
//       { url: "/auth/refresh", method: "POST", body: { refreshToken } },
//       api,
//       extra
//     );

//     const parsed = extractTokensFromAuthPayload(refreshResult.data);
//     if (parsed) {
//       await setTokens(parsed.accessToken, parsed.refreshToken);
//       result = await baseQuery(args, api, extra);
//     } else {
//       await clearTokens();
//       if (typeof window !== "undefined") window.location.href = "/login";
//     }
//   }

//   return result;
// };

// export const baseApi = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ["User", "Auth"],
//   endpoints: () => ({}),
// });
// `.trim(),

//   "redux/features/auth/authApi.ts": `
// import { baseApi } from "@/redux/features/api/baseApi";
// import { extractTokensFromAuthPayload } from "@/lib/auth-tokens";
// import { clearTokens, setTokens } from "@/lib/session";
// import type { LoginCredentials, LoginResponseBody, MeResponseBody, User } from "./authTypes";

// export const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation<User, LoginCredentials>({
//       async queryFn(credentials, _api, _extra, baseQuery) {
//         const loginRes = await baseQuery({
//           url: "/login",
//           method: "POST",
//           body: credentials,
//         });

//         if (loginRes.error) return { error: loginRes.error };

//         const body = loginRes.data as LoginResponseBody;
//         const tokens = extractTokensFromAuthPayload(body);
//         if (!tokens) {
//           return { error: { status: "CUSTOM_ERROR", error: "Invalid login response" } };
//         }

//         try {
//           await setTokens(tokens.accessToken, tokens.refreshToken);
//         } catch (e) {
//           return {
//             error: {
//               status: "CUSTOM_ERROR",
//               error: e instanceof Error ? e.message : "Failed to persist session",
//             },
//           };
//         }

//         // user সরাসরি login response এ আছে
//         return { data: body.user };
//       },
//       invalidatesTags: ["Auth", "User"],
//     }),

//     fetchMe: builder.query<User, void>({
//       query: () => ({ url: "/me", method: "GET" }),
//       // flat response — no wrapper
//       transformResponse: (res: MeResponseBody) => res,
//       providesTags: ["User"],
//     }),

//     logout: builder.mutation<void, void>({
//       async queryFn() {
//         await clearTokens();
//         return { data: undefined };
//       },
//       invalidatesTags: ["Auth", "User"],
//     }),
//   }),
//   overrideExisting: false,
// });

// export const {
//   useLoginMutation,
//   useFetchMeQuery,
//   useLogoutMutation,
// } = authApi;
// `.trim(),

//   "redux/store.ts": `
// import { configureStore } from "@reduxjs/toolkit";
// import { baseApi } from "@/redux/features/api/baseApi";
// import authReducer from "@/redux/features/auth/authSlice";

// export const store = configureStore({
//   reducer: {
//     [baseApi.reducerPath]: baseApi.reducer,
//     auth: authReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(baseApi.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// `.trim(),

//   "redux/hooks.ts": `
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "./store";

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
//   useSelector(selector);
// `.trim(),

//   "redux/ReduxProvider.tsx": `
// "use client";
// import { store } from "@/redux/store";
// import { Provider } from "react-redux";

// export function ReduxProvider({ children }: { children: React.ReactNode }) {
//   return <Provider store={store}>{children}</Provider>;
// }
// `.trim(),

//   // ─── Components ────────────────────────────────────────
//   "components/provider/AuthProvider.tsx": `
// "use client";
// import { useEffect } from "react";
// import { useAppDispatch } from "@/redux/hooks";
// import { useFetchMeQuery } from "@/redux/features/auth/authApi";
// import { clearAuth, setHydrated, setUser } from "@/redux/features/auth/authSlice";

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const dispatch = useAppDispatch();
//   const { data: user, isSuccess, isError, isLoading } = useFetchMeQuery();

//   useEffect(() => {
//     if (isSuccess && user) {
//       dispatch(setUser(user));
//       dispatch(setHydrated(true));
//     }
//     if (isError) {
//       dispatch(clearAuth());
//       dispatch(setHydrated(true));
//     }
//   }, [isSuccess, isError, user, dispatch]);

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen w-full items-center justify-center">
//         <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
//       </div>
//     );
//   }

//   return <>{children}</>;
// }
// `.trim(),

//   "components/auth/LoginForm.tsx": `
// "use client";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import useAuth from "@/hooks/useAuth";
// import { isDev } from "@/lib/constants/env";

// interface LoginFormValues {
//   email: string;
//   password: string;
// }

// const DEFAULT_VALUES = {
//   email: isDev ? "your-dev@email.com" : "",
//   password: isDev ? "your-dev-password" : "",
// };

// export default function LoginForm() {
//   const router = useRouter();
//   const { login, isLoading } = useAuth();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<LoginFormValues>({ defaultValues: DEFAULT_VALUES });

//   const onSubmit = async (values: LoginFormValues) => {
//     try {
//       await login({
//         email: values.email.toLowerCase(),
//         password: values.password,
//       });
//       router.push("/");
//       router.refresh();
//     } catch (err) {
//       setError("root", {
//         message: err instanceof Error ? err.message : "Login failed",
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {errors.root && (
//         <p className="text-red-400 text-sm mb-3">{errors.root.message}</p>
//       )}

//       <input
//         type="email"
//         placeholder="Email"
//         {...register("email", {
//           required: "Email is required",
//           pattern: {
//             value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
//             message: "Enter a valid email",
//           },
//         })}
//       />
//       {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}

//       <input
//         type="password"
//         placeholder="Password"
//         {...register("password", {
//           required: "Password is required",
//           minLength: { value: 6, message: "Minimum 6 characters" },
//         })}
//       />
//       {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}

//       <button type="submit" disabled={isLoading}>
//         {isLoading ? "Signing in..." : "Log in"}
//       </button>
//     </form>
//   );
// }
// `.trim(),

//   // ─── Hooks ─────────────────────────────────────────────
//   "hooks/useAuth.ts": `
// "use client";
// import { useRouter } from "next/navigation";
// import { useCallback } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { useLoginMutation, useLogoutMutation } from "@/redux/features/auth/authApi";
// import {
//   clearAuth,
//   selectIsAuthenticated,
//   selectIsHydrated,
//   selectUser,
//   setUser,
// } from "@/redux/features/auth/authSlice";
// import type { LoginCredentials } from "@/redux/features/auth/authTypes";

// export default function useAuth() {
//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   const user            = useAppSelector(selectUser);
//   const isHydrated      = useAppSelector(selectIsHydrated);
//   const isAuthenticated = useAppSelector(selectIsAuthenticated);

//   const [loginMutation,  { isLoading: isLoginLoading  }] = useLoginMutation();
//   const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();

//   const login = useCallback(
//     async (credentials: LoginCredentials) => {
//       const user = await loginMutation(credentials).unwrap();
//       dispatch(setUser(user));
//     },
//     [loginMutation, dispatch]
//   );

//   const logout = useCallback(async () => {
//     await logoutMutation().unwrap();
//     dispatch(clearAuth());
//     router.push("/login");
//     router.refresh();
//   }, [logoutMutation, dispatch, router]);

//   return {
//     user,
//     isHydrated,
//     isAuthenticated,
//     isLoading: isLoginLoading || isLogoutLoading,
//     login,
//     logout,
//   };
// }
// `.trim(),

//   // ─── Lib ───────────────────────────────────────────────
//   "lib/constants/env.ts": `
// export const isDev          = process.env.NODE_ENV === "development";
// export const isProd         = process.env.NODE_ENV === "production";
// export const API_URL        = process.env.NEXT_PUBLIC_API_URL!;
// export const ENABLE_REFRESH = process.env.NEXT_PUBLIC_ENABLE_REFRESH === "true";
// `.trim(),

//   "lib/auth-tokens.ts": `
// export function extractTokensFromAuthPayload(payload: unknown): {
//   accessToken: string;
//   refreshToken: string;
// } | null {
//   if (!payload || typeof payload !== "object") return null;
//   const p = payload as Record<string, unknown>;

//   // Shape: { authorization: { access_token, refresh_token } }
//   const auth = p.authorization;
//   if (auth && typeof auth === "object") {
//     const a = auth as Record<string, unknown>;
//     if (typeof a.access_token === "string" && typeof a.refresh_token === "string") {
//       return { accessToken: a.access_token, refreshToken: a.refresh_token };
//     }
//   }

//   // Shape: { access_token, refresh_token } ← flat
//   if (typeof p.access_token === "string" && typeof p.refresh_token === "string") {
//     return { accessToken: p.access_token, refreshToken: p.refresh_token };
//   }

//   return null;
// }
// `.trim(),

//   "lib/session.ts": `
// "use server";
// import { cookies } from "next/headers";

// const ACCESS_TOKEN_MAX_AGE  = 24 * 60 * 60;
// const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

// const refreshFlowEnabled = () =>
//   process.env.NEXT_PUBLIC_ENABLE_REFRESH === "true";

// export async function setTokens(
//   accessToken: string,
//   refreshToken?: string | null
// ) {
//   const cookieStore = await cookies();
//   cookieStore.set("access-token", accessToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     maxAge: ACCESS_TOKEN_MAX_AGE,
//     path: "/",
//   });

//   if (refreshFlowEnabled() && refreshToken) {
//     cookieStore.set("refresh-token", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       maxAge: REFRESH_TOKEN_MAX_AGE,
//       path: "/",
//     });
//   } else {
//     cookieStore.delete("refresh-token");
//   }
// }

// export async function clearTokens() {
//   const cookieStore = await cookies();
//   cookieStore.delete("access-token");
//   cookieStore.delete("refresh-token");
// }

// export async function getAccessToken() {
//   return (await cookies()).get("access-token")?.value;
// }

// export async function getRefreshToken() {
//   return (await cookies()).get("refresh-token")?.value;
// }
// `.trim(),

//   // ─── Middleware ────────────────────────────────────────
//   "proxy.ts": `
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const PUBLIC_PATHS = [
//   "/login",
//   "/register",
//   "/forgot-password",
// ];

// export function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const token = request.cookies.get("access-token")?.value;

//   const isPublicPath = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

//   if (pathname === "/") {
//     return NextResponse.redirect(
//       new URL(token ? "/dashboard" : "/login", request.url)
//     );
//   }

//   if (!token && !isPublicPath) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (token && isPublicPath) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
// };
// `.trim(),

//   "middleware.ts": `
// import type { NextRequest } from "next/server";
// import { proxy } from "./proxy";

// export function middleware(request: NextRequest) {
//   return proxy(request);
// }

// export { config } from "./proxy";
// `.trim(),
// };

// // ─── Runner ──────────────────────────────────────────────

// function createFile(filePath, content) {
//   const fullPath = path.join(process.cwd(), filePath);
//   const dir = path.dirname(fullPath);

//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }

//   if (!fs.existsSync(fullPath)) {
//     fs.writeFileSync(fullPath, content, "utf8");
//     console.log(`Created:  ${filePath}`);
//   } else {
//     console.log(`Skipped:  ${filePath} (already exists)`);
//   }
// }

// console.log("\n Setting up Redux auth structure...\n");
// Object.entries(files).forEach(([filePath, content]) => createFile(filePath, content));
// console.log("\n Auth setup completed!\n");
// console.log("Next steps:");
// console.log("  1. npm install @reduxjs/toolkit react-redux react-hook-form");
// console.log("  2. Update .env.local with your API URL");
// console.log("  3. Update redux/features/auth/authTypes.ts to match your API");
// console.log("  4. Update components/auth/LoginForm.tsx with your UI\n");