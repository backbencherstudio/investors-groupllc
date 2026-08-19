"use client";

import { useState } from "react";
import Image from "next/image";
import { EyeIcon, Mail, Phone, X } from "lucide-react";

import Loader from "@/app/(dashboard)/dashboard/_components/common/Loader";
import StatusBadge from "@/components/common/StatusBadges";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useGetInvestorTransactionDetailsQuery } from "@/redux/features/landlord/financial/financialApi";

const formatCurrency = (amount: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);

const formatDate = (date: string | null) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Not paid";

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-zinc-500">{label}</span>
      <span className="font-medium text-right">{children}</span>
    </div>
  );
}

export default function InvestorTransactionDetails({
  transactionId,
}: {
  transactionId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } =
    useGetInvestorTransactionDetailsQuery(transactionId, {
      skip: !isOpen,
    });

  const gatewayTransaction = data?.transactions[0];
  const currency = gatewayTransaction?.currency || "USD";

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="text-gray-600 hover:text-primary transition-colors cursor-pointer"
          aria-label="View investor transaction details"
        >
          <EyeIcon className="h-5 w-5" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-full w-full sm:w-[480px]">
        <div className="flex h-full flex-col bg-white">
          <DrawerHeader className="flex flex-row items-center justify-between border-b border-zinc-200 px-6 py-4">
            <DrawerTitle className="text-base font-semibold">
              Investor Transaction Details
            </DrawerTitle>
            <DrawerClose asChild>
              <button
                type="button"
                className="text-zinc-500 hover:text-zinc-700"
                aria-label="Close transaction details"
              >
                <X className="h-5 w-5" />
              </button>
            </DrawerClose>
          </DrawerHeader>

          {isLoading ? (
            <Loader />
          ) : isError || !data ? (
            <div className="flex flex-1 items-center justify-center p-6 text-center text-red-500">
              Failed to load investor transaction details.
            </div>
          ) : (
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  {data.property.imageUrl ? (
                    <Image
                      src={data.property.imageUrl}
                      alt={data.property.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 shrink-0 rounded-lg bg-zinc-100" />
                  )}
                  <div className="min-w-0">
                    <div className="font-medium">{data.property.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {data.property.address}
                    </div>
                  </div>
                </div>
                <StatusBadge status={data.status} />
              </div>

              <div className="flex items-center gap-3">
                {data.investor.avatar ? (
                  <Image
                    src={data.investor.avatar}
                    alt={data.investor.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-500">
                    {data.investor.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-medium">{data.investor.name}</div>
                  <div className="text-xs text-muted-foreground">Investor</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-neutral-700">
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-orange-500" />
                  {data.investor.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-orange-500" />
                  {data.investor.email}
                </span>
              </div>

              <section className="space-y-3 border-t pt-5">
                <h3 className="font-semibold">Investment Information</h3>
                <DetailRow label="Transaction ID">{data.displayId}</DetailRow>
                <DetailRow label="Payment status">
                  <StatusBadge status={data.paymentStatus} />
                </DetailRow>
                <DetailRow label="Investment status">
                  <StatusBadge status={data.recordStatus} />
                </DetailRow>
                <DetailRow label="Investment type">
                  <span className="capitalize">{data.type}</span>
                </DetailRow>
                <DetailRow label="Method">
                  {data.investmentInformation.method}
                </DetailRow>
                <DetailRow label="Paid date">
                  {formatDate(data.paidDate)}
                </DetailRow>
                <DetailRow label="Created">
                  {formatDate(data.createdAt)}
                </DetailRow>
                <DetailRow label="Auto renew">
                  {data.autoRenew ? "Yes" : "No"}
                </DetailRow>
              </section>

              <section className="space-y-3 border-t pt-5">
                <h3 className="font-semibold">Transaction Summary</h3>
                <DetailRow label="Investment amount">
                  {formatCurrency(data.transactionSummary.amount, currency)}
                </DetailRow>
                <DetailRow label={data.transactionSummary.taxLabel}>
                  {formatCurrency(data.transactionSummary.tax, currency)}
                </DetailRow>
                <DetailRow label="Total">
                  {formatCurrency(data.transactionSummary.total, currency)}
                </DetailRow>
              </section>

              <section className="space-y-3 border-t pt-5">
                <h3 className="font-semibold">Funding Overview</h3>
                <DetailRow label="Total funded">
                  {formatCurrency(data.fundingOverview.totalFunded, currency)}
                </DetailRow>
                <DetailRow label="Funding goal">
                  {formatCurrency(data.fundingOverview.totalFoundGoal, currency)}
                </DetailRow>
                <DetailRow label="Funded">
                  {data.fundingOverview.fundedPercentage}%
                </DetailRow>
                <DetailRow label="Investors">
                  {data.fundingOverview.investorCount}
                </DetailRow>
                <DetailRow label="Annual return">
                  {data.fundingOverview.annualReturnRate}%
                </DetailRow>
                <DetailRow label="Lock-in period">
                  {data.fundingOverview.lockInPeriod}
                </DetailRow>
              </section>

              {gatewayTransaction && (
                <section className="space-y-3 border-t pt-5">
                  <h3 className="font-semibold">Gateway Transaction</h3>
                  <DetailRow label="Transaction ID">
                    <span className="break-all">
                      {gatewayTransaction.transactionId}
                    </span>
                  </DetailRow>
                  <DetailRow label="Gateway">
                    <span className="capitalize">
                      {gatewayTransaction.gateway}
                    </span>
                  </DetailRow>
                  <DetailRow label="Status">
                    <StatusBadge status={gatewayTransaction.status} />
                  </DetailRow>
                </section>
              )}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
