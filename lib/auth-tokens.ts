/**
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
