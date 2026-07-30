"use client";

import { useState } from "react";
import { Gift, X } from "lucide-react";

interface PremiumTrialBannerProps {
  daysLeft?: number;
  onViewPlans?: () => void;
  onStartTrial?: () => void;
}

import RoleGuard from "@/components/provider/RoleGuard";
import Link from "next/link";

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
  onStartTrial,
}: PremiumTrialBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-gray-900" />
            <h3 className="text-base font-semibold text-gray-900">
              You&apos;re currently on a Premium Trial
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Dismiss"
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          Your trial ends in {daysLeft} days. Upgrade now to avoid losing access
          to premium features like investment tools and full maintenance
          control.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={"/dashboard/view-subscription-plans"}
            type="button"
            onClick={onViewPlans}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
          >
            View Subscription Plans
          </Link>
          <button
            type="button"
            onClick={onStartTrial}
            className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-700"
          >
            Start Trial
          </button>
        </div>
      </div>
    </div>
  );
}
