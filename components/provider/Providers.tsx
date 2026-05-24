"use client";

import { ReduxProvider } from "@/redux/ReduxProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
