"use client";

import { useEffect, useRef, useState } from "react";
import { Gift } from "lucide-react";

interface PremiumTrialBannerProps {
  daysLeft?: number;
  onViewPlans?: () => void;
}

import RoleGuard from "@/components/provider/RoleGuard";
import Link from "next/link";
import { useFetchMeQuery } from "@/redux/features/auth/authApi";
import { usePathname } from "next/navigation";

export default function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["landlord"]}>
      <div>
        <PremiumTrialBanner />
      </div>
      {children}
    </RoleGuard>
  );
}

function PremiumTrialBanner({
  daysLeft = 14,
  onViewPlans,
}: PremiumTrialBannerProps) {
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const isSubscriptionPage = pathname === "/dashboard/landlord/subscription";

  const { data } = useFetchMeQuery();

  const handleFreeTrial = () => {
    localStorage.setItem("freeTrialStarted", "true");
  };

  const freeTrialStarted = localStorage.getItem("freeTrialStarted");

  // Show the modal again whenever the user navigates to a different page
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setVisible(true);
    }
  }, [pathname]);

  if (!visible || isSubscriptionPage) return null;

  return (
    <div>
      {data?.hasActiveSubscription || freeTrialStarted ? null : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-gray-900" />
                <h3 className="text-base font-semibold text-gray-900">
                  You&apos;re currently on a Premium Trial
                </h3>
              </div>
              {/* <button
                type="button"
                onClick={() => setVisible(false)}
                aria-label="Dismiss"
                className="text-gray-400 transition-colors hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button> */}
            </div>

            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Your trial ends in {daysLeft} days. Upgrade now to avoid losing
              access to premium features like investment tools and full
              maintenance control.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={"/dashboard/landlord/subscription"}
                type="button"
                onClick={() => {
                  onViewPlans?.();
                  setVisible(false);
                }}
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
              >
                View Subscription Plans
              </Link>
              <button
                type="button"
                onClick={() => {
                  handleFreeTrial();
                  setVisible(false);
                }}
                className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-700"
              >
                Start Trial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
