"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, EyeIcon, Mail, Phone, X } from "lucide-react";

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
import { useGetWithdrawalDetailsQuery } from "@/redux/features/landlord/financial/financialApi";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

const formatDate = (date: string | null) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

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

export default function WithdrawalsDetails({
  withdrawalId,
}: {
  withdrawalId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } = useGetWithdrawalDetailsQuery(
    withdrawalId,
    { skip: !isOpen },
  );

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="text-gray-600 hover:text-primary transition-colors cursor-pointer"
          aria-label="View withdrawal details"
        >
          <EyeIcon className="h-5 w-5" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-full w-full sm:w-[480px]">
        <div className="flex h-full flex-col bg-white">
          <DrawerHeader className="flex flex-row items-center justify-between border-b border-zinc-200 px-6 py-4">
            <DrawerTitle className="text-base font-semibold">
              {data?.title || "Withdrawal Details"}
            </DrawerTitle>
            <DrawerClose asChild>
              <button
                type="button"
                className="text-zinc-500 hover:text-zinc-700"
                aria-label="Close withdrawal details"
              >
                <X className="h-5 w-5" />
              </button>
            </DrawerClose>
          </DrawerHeader>

          {isLoading ? (
            <Loader />
          ) : isError || !data ? (
            <div className="flex flex-1 items-center justify-center p-6 text-center text-red-500">
              Failed to load withdrawal details.
            </div>
          ) : (
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {data.user.avatar ? (
                    <Image
                      src={data.user.avatar}
                      alt={data.user.name}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-500">
                      {data.user.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{data.user.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {data.user.role}
                    </div>
                  </div>
                </div>
                <StatusBadge status={data.statusLabel} />
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-neutral-700">
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-orange-500" />
                  {data.user.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-orange-500" />
                  {data.user.email}
                </span>
              </div>

              <section className="space-y-3 border-t pt-5">
                <h3 className="font-semibold">Withdrawal Information</h3>
                <DetailRow label="Withdrawal ID">{data.displayId}</DetailRow>
                <DetailRow label="Type">{data.detailType}</DetailRow>
                <DetailRow label="Status">
                  <StatusBadge status={data.information.withdrawStatus} />
                </DetailRow>
                <DetailRow label="Method">{data.information.method}</DetailRow>
                <DetailRow label="Paid at">
                  {data.information.paidDateLabel ||
                    formatDate(data.information.paidAt)}
                </DetailRow>
                <DetailRow label="Amount">
                  {formatCurrency(data.amount)}
                </DetailRow>
                <DetailRow label="Reference">
                  <span className="break-all">
                    {data.transactionReference || "—"}
                  </span>
                </DetailRow>
              </section>

              {data.sections.showTransactionSummary && (
                <section className="space-y-3 border-t pt-5">
                  <h3 className="font-semibold">Transaction Summary</h3>
                  <DetailRow label="Amount">
                    {formatCurrency(data.transactionSummary.amount)}
                  </DetailRow>
                  <DetailRow label={data.transactionSummary.taxLabel}>
                    {formatCurrency(data.transactionSummary.tax)}
                  </DetailRow>
                  <DetailRow label="Total">
                    {formatCurrency(data.transactionSummary.total)}
                  </DetailRow>
                </section>
              )}

              <section className="space-y-4 border-t pt-5">
                <h3 className="font-semibold">Withdrawal Timeline</h3>
                <div className="space-y-4">
                  {data.withdrawalTimeline.map((item) => (
                    <div key={item.key} className="flex gap-3">
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                          item.isCompleted
                            ? "bg-green-100 text-green-600"
                            : "bg-zinc-100 text-zinc-400"
                        }`}
                      >
                        {item.isCompleted ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-current" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{item.title}</div>
                        <div className="text-xs text-zinc-500">
                          {item.subtitle}
                        </div>
                        {item.atLabel && (
                          <div className="mt-1 text-xs text-zinc-400">
                            {item.atLabel}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {(data.note || data.adminNote) && (
                <section className="space-y-3 border-t pt-5">
                  <h3 className="font-semibold">Notes</h3>
                  {data.note && <DetailRow label="Note">{data.note}</DetailRow>}
                  {data.adminNote && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                      <div className="mb-1 font-medium">Admin note</div>
                      {data.adminNote}
                    </div>
                  )}
                  {data.rejectedAt && (
                    <DetailRow label="Rejected at">
                      {formatDate(data.rejectedAt)}
                    </DetailRow>
                  )}
                </section>
              )}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
