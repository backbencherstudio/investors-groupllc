"use client";

import { Check } from "lucide-react";
import {
  useGetViewSubscriptionPlansQuery,
  useSubscriptionCreateMutation,
} from "@/redux/features/landlord/dashboard/subscription";
import { useRouter } from "next/navigation";

interface Plan {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  interval: string;
  trialDays: number;
  benefits: string[];
}

interface SubscriptionPlansResponse {
  data: Plan[];
  isLoading: any;
}

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(amount / 100);
}

export default function Page() {
  const { data, isLoading } =
    useGetViewSubscriptionPlansQuery<SubscriptionPlansResponse>({});
  const [subscriptionCreate] = useSubscriptionCreateMutation();
  const router = useRouter();

  const plans: Plan[] = data ?? [];

  const handleSubscriptionPlans = async (planId: string) => {
    try {
      const result = await subscriptionCreate({ planId }).unwrap();
      if (result?.success) {
        router.push(result?.data?.checkoutUrl);
      }
      console.log("result --->", result);
    } catch (error) {
      console.error("Subscription create failed --->", error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Subscription Plans
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Choose the plan that fits your needs.
        </p>
      </div>

      {isLoading ? (
        <p className="text-center text-sm text-gray-500">Loading plans...</p>
      ) : plans.length === 0 ? (
        <p className="text-center text-sm text-gray-500">
          No subscription plans available.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {plan.name}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{plan.description}</p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(plan.amount, plan.currency)}
                </span>
                <span className="text-sm text-gray-500">/{plan.interval}</span>
              </div>

              {plan.trialDays > 0 && (
                <p className="mt-1 text-xs font-medium text-amber-600">
                  {plan.trialDays}-day free trial
                </p>
              )}

              <ul className="mt-5 flex-1 space-y-2">
                {plan.benefits.map((benefit, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscriptionPlans(plan.id)}
                className="mt-6 rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-700"
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
