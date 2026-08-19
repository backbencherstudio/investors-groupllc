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
import { useGetTenantRentPaymentDetailsQuery } from "@/redux/features/landlord/financial/financialApi";

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

export default function TenantRentPaymentDetails({
  paymentId,
}: {
  paymentId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } =
    useGetTenantRentPaymentDetailsQuery(paymentId, {
      skip: !isOpen,
    });

  const transaction = data?.transactions[0];
  const currency = transaction?.currency || "USD";

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="text-gray-600 hover:text-primary transition-colors cursor-pointer"
          aria-label="View rent payment details"
        >
          <EyeIcon className="w-5 h-5" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-full w-full sm:w-[480px]">
        <div className="flex h-full flex-col bg-white">
          <DrawerHeader className="flex flex-row items-center justify-between border-b border-zinc-200 px-6 py-4">
            <DrawerTitle className="text-base font-semibold">
              Rent Payment Details
            </DrawerTitle>
            <DrawerClose asChild>
              <button
                type="button"
                className="text-zinc-500 hover:text-zinc-700"
                aria-label="Close payment details"
              >
                <X className="h-5 w-5" />
              </button>
            </DrawerClose>
          </DrawerHeader>

          {isLoading ? (
            <Loader />
          ) : isError || !data ? (
            <div className="flex flex-1 items-center justify-center p-6 text-center text-red-500">
              Failed to load rent payment details.
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
                {data.recipient.avatar ? (
                  <Image
                    src={data.recipient.avatar}
                    alt={data.recipient.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-zinc-100" />
                )}
                <div>
                  <div className="font-medium">{data.recipient.name}</div>
                  <div className="text-xs text-muted-foreground">Tenant</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-neutral-700">
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-orange-500" />
                  {data.recipient.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-orange-500" />
                  {data.recipient.email}
                </span>
              </div>

              <section className="space-y-3 border-t pt-5">
                <h3 className="font-semibold">Payment Information</h3>
                <DetailRow label="Payment ID">{data.displayId}</DetailRow>
                <DetailRow label="Payment status">
                  <StatusBadge status={data.paymentStatus} />
                </DetailRow>
                <DetailRow label="Amount">
                  {formatCurrency(data.amount, currency)}
                </DetailRow>
                <DetailRow label="Method">
                  <span className="capitalize">
                    {data.method.replaceAll("_", " ")}
                  </span>
                </DetailRow>
                <DetailRow label="Paid date">
                  {formatDate(data.paidDate)}
                </DetailRow>
                <DetailRow label="Due date">
                  {formatDate(data.dueDate)}
                </DetailRow>
              </section>

              <section className="space-y-3 border-t pt-5">
                <h3 className="font-semibold">Order Summary</h3>
                <DetailRow label="Unit">{data.order.unitNumber}</DetailRow>
                <DetailRow label="Months">{data.order.months}</DetailRow>
                <DetailRow label="Monthly rent">
                  {formatCurrency(data.order.monthlyRent, currency)}
                </DetailRow>
                <DetailRow label="Service charge">
                  {formatCurrency(data.order.serviceCharge, currency)}
                </DetailRow>
                <DetailRow label="Tax">
                  {formatCurrency(data.order.tax, currency)}
                </DetailRow>
                <DetailRow label="Discount">
                  {formatCurrency(data.order.discount, currency)}
                </DetailRow>
                <DetailRow label="Total">
                  {formatCurrency(data.order.total, currency)}
                </DetailRow>
              </section>

              {transaction && (
                <section className="space-y-3 border-t pt-5">
                  <h3 className="font-semibold">Transaction</h3>
                  <DetailRow label="Transaction ID">
                    <span className="break-all">
                      {transaction.transactionId}
                    </span>
                  </DetailRow>
                  <DetailRow label="Gateway">
                    <span className="capitalize">{transaction.gateway}</span>
                  </DetailRow>
                  <DetailRow label="Status">
                    <StatusBadge status={transaction.status} />
                  </DetailRow>
                  <DetailRow label="Created">
                    {formatDate(transaction.createdAt)}
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
