"use client";

export const ROLE = "admin";

export function getRole() {
  return ROLE;
}

export function useRole() {
  return getRole();
}
