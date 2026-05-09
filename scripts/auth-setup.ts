// Scaffolds Redux + RTK Query + cookie auth into THIS repo (project root).
// Run from repo root: npm run generate-auth-setup
//
// API: POST /api/auth/login, GET /me, bearer token in authorization.token

import fs from 'fs';
import path from 'path';

const CONFIG = {
  /** Output root — `.` = files go next to package.json */
  rootDir: '.',
  env: {
    // Backend origin (paths are /api/auth/login, /me, etc. — no trailing /api)
    NEXT_PUBLIC_API_URL: 'https://gueloprboy.anikstudio.com',
    NEXT_PUBLIC_ENABLE_REFRESH: 'false',
  },
};

// File contents map (relative path → content)
const FILES = {
  // ─────────────────────────────────────────────────────────────
  // Env template — copy vars into .env.local (name avoids .gitignore .env*)
  // ─────────────────────────────────────────────────────────────
  'auth.env.example': Object.entries(CONFIG.env)
    .map(([k, v]) => `${k}=${v}`)
    .join('\n'),

  // ─────────────────────────────────────────────────────────────
  // Library Files
  // ─────────────────────────────────────────────────────────────
  'lib/session.ts': `"use server";
import { cookies } from "next/headers";

const ACCESS_TOKEN_MAX_AGE = 24 * 60 * 60; // 24 hours — adjust as needed
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

const refreshFlowEnabled = () =>
  process.env.NEXT_PUBLIC_ENABLE_REFRESH === "true";

export async function setTokens(
  accessToken: string,
  refreshToken?: string | null
) {
  const cookieStore = await cookies();

  cookieStore.set("access-token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ACCESS_TOKEN_MAX_AGE,
    path: "/",
  });

  if (refreshFlowEnabled() && refreshToken) {
    cookieStore.set("refresh-token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: REFRESH_TOKEN_MAX_AGE,
      path: "/",
    });
  } else {
    cookieStore.delete("refresh-token");
  }
}

export async function clearTokens() {
  const cookieStore = await cookies();
  cookieStore.delete("access-token");
  cookieStore.delete("refresh-token");
}

export async function getAccessToken() {
  return (await cookies()).get("access-token")?.value;
}

export async function getRefreshToken() {
  return (await cookies()).get("refresh-token")?.value;
}
`,

  'lib/auth-tokens.ts': `/**
 * Normalize token fields from API payloads (login / refresh).
 * Supports this backend shape:
 * { authorization: { token: string, type?: "bearer" }, ... }
 * and legacy { access_token, refresh_token } variants.
 */
export function extractTokensFromAuthPayload(payload: unknown): {
  accessToken: string;
  refreshToken: string | null;
} | null {
  if (!payload || typeof payload !== "object") return null;
  const p = payload as Record<string, unknown>;
  const auth = p.authorization;
  if (auth && typeof auth === "object") {
    const a = auth as Record<string, unknown>;
    if (typeof a.token === "string") {
      const refresh =
        typeof a.refresh_token === "string"
          ? a.refresh_token
          : typeof a.refreshToken === "string"
            ? a.refreshToken
            : null;
      return { accessToken: a.token, refreshToken: refresh };
    }
    if (
      typeof a.access_token === "string" &&
      typeof a.refresh_token === "string"
    ) {
      return {
        accessToken: a.access_token,
        refreshToken: a.refresh_token,
      };
    }
  }
  if (
    typeof p.access_token === "string" &&
    typeof p.refresh_token === "string"
  ) {
    return { accessToken: p.access_token, refreshToken: p.refresh_token };
  }
  if (
    typeof p.accessToken === "string" &&
    typeof p.refreshToken === "string"
  ) {
    return { accessToken: p.accessToken, refreshToken: p.refreshToken };
  }
  return null;
}
`,

  // ─────────────────────────────────────────────────────────────
  // Redux - Auth Types & Slice
  // ─────────────────────────────────────────────────────────────
  'redux/features/auth/authTypes.ts': `/** GET /me → data (profile) */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  address: string | null;
  phone: string | null;
  type: string;
  gender: string | null;
  date_of_birth: string | null;
  created_at: string;
  job_title: string | null;
  annual_salary: string | null;
  fromTime: string | null;
  toTime: string | null;
  service_type: string | null;
  occupation: string | null;
  investment_budget: string | null;
  source_of_funds: string | null;
  annual_income: string | null;
  /** Raw JSON string from API; parse if needed */
  docs_url: string | null;
  photoIdUrl: string | null;
  proofOfIncomeUrl: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

/** POST /api/auth/login */
export interface LoginResponseBody {
  success?: boolean;
  message?: string;
  /** Role hint from login (e.g. ADMIN); full profile comes from /me */
  type?: string;
  authorization?: {
    type?: string;
    token?: string;
    access_token?: string;
    refresh_token?: string;
  };
  access_token?: string;
  refresh_token?: string;
}

export interface MeResponseBody {
  success?: boolean;
  data?: User;
  message?: string;
}

export interface AuthState {
  user: User | null;
  isHydrated: boolean;
}
`,

  'redux/features/auth/authSlice.ts': `import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "./authTypes";

const initialState: AuthState = {
  user: null,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setHydrated(state, action: PayloadAction<boolean>) {
      state.isHydrated = action.payload;
    },
    clearAuth(state) {
      state.user = null;
      state.isHydrated = false;
    },
  },
});

export const { setUser, setHydrated, clearAuth } = authSlice.actions;

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsHydrated = (state: { auth: AuthState }) =>
  state.auth.isHydrated;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.user !== null;

export default authSlice.reducer;
`,

  // ─────────────────────────────────────────────────────────────
  // Redux - API Layer
  // ─────────────────────────────────────────────────────────────
  'redux/features/api/baseApi.ts': `import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { extractTokensFromAuthPayload } from "@/lib/auth-tokens";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/lib/session";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: async (headers) => {
    if (!headers.has("Authorization")) {
      const token = await getAccessToken();
      if (token) headers.set("Authorization", \`Bearer \${token}\`);
    }
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (args, api, extra) => {
  let result = await baseQuery(args, api, extra);

  if (result.error?.status === 401) {
    const refreshEnabled = process.env.NEXT_PUBLIC_ENABLE_REFRESH === "true";

    if (!refreshEnabled) {
      await clearTokens();
      if (typeof window !== "undefined") window.location.href = "/";
      return result;
    }

    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      await clearTokens();
      if (typeof window !== "undefined") window.location.href = "/";
      return result;
    }

    const refreshResult = await baseQuery(
      { url: "/api/auth/refresh", method: "POST", body: { refreshToken } },
      api,
      extra
    );

    const parsed = extractTokensFromAuthPayload(refreshResult.data);
    if (parsed) {
      await setTokens(parsed.accessToken, parsed.refreshToken ?? undefined);
      result = await baseQuery(args, api, extra);
    } else {
      await clearTokens();
      if (typeof window !== "undefined") window.location.href = "/";
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
`,

  'redux/features/auth/authApi.ts': `import { baseApi } from "@/redux/features/api/baseApi";

import { extractTokensFromAuthPayload } from "@/lib/auth-tokens";
import { clearTokens, setTokens } from "@/lib/session";

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
          url: "/api/auth/login",
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
          url: "/me",
          method: "GET",
          headers: {
            Authorization: \`Bearer \${tokens.accessToken}\`,
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
      query: () => ({ url: "/me", method: "GET" }),
      transformResponse: (res: MeResponseBody) => res.data!,
      providesTags: ["User"],
    }),

    logout: builder.mutation<void, void>({
      async queryFn() {
        await clearTokens();
        return { data: undefined };
      },
      invalidatesTags: ["Auth", "User"],
    }),

    refreshToken: builder.mutation<void, { refreshToken: string }>({
      query: (body) => ({
        url: "/api/auth/refresh",
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
`,

  // ─────────────────────────────────────────────────────────────
  // Redux - Store & Hooks
  // ─────────────────────────────────────────────────────────────
  'redux/store.ts': `import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/redux/features/api/baseApi";
import authReducer from "@/redux/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
`,

  'redux/hooks.ts': `import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);
`,

  'redux/ReduxProvider.tsx': `"use client";

import { store } from "@/redux/store";
import { Provider } from "react-redux";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
`,

  // ─────────────────────────────────────────────────────────────
  // Hooks & Components
  // ─────────────────────────────────────────────────────────────
  'hooks/useAuth.ts': `"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useLoginMutation,
  useLogoutMutation,
} from "@/redux/features/auth/authApi";
import {
  clearAuth,
  selectIsAuthenticated,
  selectIsHydrated,
  selectUser,
  setUser,
} from "@/redux/features/auth/authSlice";
import type { LoginCredentials } from "@/redux/features/auth/authTypes";

const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isHydrated = useAppSelector(selectIsHydrated);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [loginMutation, { isLoading: isLoginLoading, error: loginError }] =
    useLoginMutation();
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const user = await loginMutation(credentials).unwrap();
      dispatch(setUser(user));
      router.push("/dashboard");
    },
    [loginMutation, dispatch, router]
  );

  const logout = useCallback(async () => {
    await logoutMutation().unwrap();
    dispatch(clearAuth());
    router.push("/");
  }, [logoutMutation, dispatch, router]);

  return {
    user,
    isHydrated,
    isAuthenticated,
    isLoading: isLoginLoading || isLogoutLoading,
    loginError,
    login,
    logout,
  };
};

export default useAuth;
`,

  'components/provider/AuthProvider.tsx': `"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useFetchMeQuery } from "@/redux/features/auth/authApi";
import {
  clearAuth,
  setHydrated,
  setUser,
} from "@/redux/features/auth/authSlice";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { data: user, isSuccess, isError, isLoading } = useFetchMeQuery();

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(setUser(user));
      dispatch(setHydrated(true));
    }
    if (isError) {
      dispatch(clearAuth());
      dispatch(setHydrated(true));
    }
  }, [isSuccess, isError, user, dispatch]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
`,

  'components/provider/Providers.tsx': `"use client";

import { ReduxProvider } from "@/redux/ReduxProvider";
import { AuthProvider } from "./AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <AuthProvider>{children}</AuthProvider>
    </ReduxProvider>
  );
}
`,

  // Middleware & Route Guard
  'proxy.ts': `import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Login lives at \`/\` — do not use \`startsWith("/")\` (matches every path). */
const PUBLIC_PREFIXES = [
  "/forgot-password",
  "/enter-otp",
  "/reset-your-password",
  "/reset-successful",
];

function isPublicPath(pathname: string) {
  if (pathname === "/") return true;
  return PUBLIC_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(\`\${p}/\`)
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("access-token")?.value;
  const publicRoute = isPublicPath(pathname);

  if (!token && !publicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && publicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\\\..*).*)"],
};
`,
};

// ─────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

function writeFile(filePath: string, content: string) {
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`📄 Created: ${filePath}`);
}

function generateFileTree(files: Record<string, string>): string {
  const tree: string[] = ['📦 Generated Structure:'];
  const sorted = Object.keys(files).sort();
  
  for (const file of sorted) {
    tree.push(`  └─ ${file}`);
  }
  return tree.join('\n');
}

// ─────────────────────────────────────────────────────────────
// Main Execution
// ─────────────────────────────────────────────────────────────

function main() {
  console.log('🚀 Starting auth setup generation...\n');

  const root = path.resolve(CONFIG.rootDir);
  ensureDir(root);

  for (const [relativePath, content] of Object.entries(FILES)) {
    const fullPath = path.join(root, relativePath);
    const dir = path.dirname(fullPath);
    
    ensureDir(dir);
    writeFile(fullPath, content);
  }

  const readme = `# Auth scaffold (generated)

Files were written into the **project root** (same folder as \`package.json\`).

## 1. Install Redux (required)

If these are not already in \`package.json\`, run:

\`\`\`bash
npm install @reduxjs/toolkit react-redux
\`\`\`

## 2. Environment

Copy values from \`auth.env.example\` into \`.env.local\` (create \`.env.local\` if needed). Set \`NEXT_PUBLIC_API_URL\` to your API origin (no trailing slash).

## 3. Wire the app

In \`app/layout.tsx\`, wrap \`children\` with the client providers:

\`\`\`tsx
import { Providers } from "@/components/provider/Providers";

// inside <body>:
<Providers>{children}</Providers>
\`\`\`

## 4. Optional: route guard (Next.js 16)

\`proxy.ts\` was added at the project root (Next 16 uses \`proxy.ts\` only — no \`middleware.ts\`). Adjust \`PUBLIC_PREFIXES\` if your public auth routes differ.

## 5. Use auth in UI

- Import \`useAuth\` from \`@/hooks/useAuth\` in your login form and call \`login({ email, password })\`.
- Default post-login redirect is \`/dashboard\` — change in \`hooks/useAuth.ts\` if needed (e.g. \`/dashboard/admin\`).

## API shape (defaults)

- \`POST /api/auth/login\` → \`authorization.token\`, optional \`type\` (ADMIN, …)
- \`GET /me\` → \`data\` user object
- \`POST /api/auth/refresh\` → only if \`NEXT_PUBLIC_ENABLE_REFRESH=true\`

Override URLs in \`redux/features/auth/authApi.ts\` and \`redux/features/api/baseApi.ts\`.

---
*Generated by \`npm run generate-auth-setup\`*
`;

  const docsDir = path.join(root, 'docs');
  ensureDir(docsDir);
  writeFile(path.join(docsDir, 'AUTH-SCAFFOLD.md'), readme);

  console.log('\n' + generateFileTree(FILES));
  console.log('\n✨ Done! Auth files are in this project (lib/, redux/, hooks/, components/provider/, proxy.ts, auth.env.example).');
  console.log('\n📋 Next: ensure @reduxjs/toolkit + react-redux are installed (see docs/AUTH-SCAFFOLD.md)');
  console.log('📖 See docs/AUTH-SCAFFOLD.md for wiring app/layout.tsx and .env.local');
}

// Run if executed directly
if (require.main === module) {
  try {
    main();
  } catch (err) {
    console.error('❌ Error generating files:', err);
    process.exit(1);
  }
}

module.exports = { generate: main, CONFIG, FILES };