"use client";

const userrole: { [key: string]: string } = {
  admin: "admin",
  landlord: "landlord",
}

export const ROLE = userrole.landlord; // Change this to "admin" or "landlord" as needed

export function getRole() {
  return ROLE;
}

export function useRole() {
  return getRole();
}
