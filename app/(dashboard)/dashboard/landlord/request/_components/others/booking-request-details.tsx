"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, EyeIcon, FileText, Mail, Phone, X } from "lucide-react";

import Loader from "@/app/(dashboard)/dashboard/_components/common/Loader";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";

interface DocumentItem {
  name: string;
  url: string;
}

interface BookingRequestDetailsProps {
  data: any;
  isLoading?: boolean;
  isUpdating?: boolean;
  onOpen: () => void;
  onStatusChange: (
    status: "approved" | "rejected",
    reason: string,
  ) => Promise<boolean>;
}

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

export default function BookingRequestDetails({
  data,
  isLoading = false,
  isUpdating = false,
  onOpen,
  onStatusChange,
}: BookingRequestDetailsProps) {
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");

  const tenant = data?.tenant;
  const apartment = data?.apartment;
  const tenantName =
    data?.name ||
    [tenant?.first_name, tenant?.last_name].filter(Boolean).join(" ") ||
    tenant?.username ||
    "Tenant";
  const propertyAddress = apartment
    ? `${apartment.address || ""}, ${apartment.city || ""}, ${apartment.state || ""} ${apartment.zipCode || ""}`
    : "—";
  const status = String(data?.status || "");

  const documents: DocumentItem[] = [
    data?.doc?.idVerificationDocUrl && {
      name: "ID Verification Document",
      url: data.doc.idVerificationDocUrl,
    },
    data?.doc?.financialDocUrl && {
      name: "Financial Document",
      url: data.doc.financialDocUrl,
    },
  ].filter(Boolean) as DocumentItem[];

  const updateStatus = async (nextStatus: "approved" | "rejected") => {
    const trimmedReason = reason.trim();
    if (nextStatus === "rejected" && !trimmedReason) {
      setReasonError("Please enter a reason for rejecting this request.");
      return;
    }

    setReasonError("");
    const succeeded = await onStatusChange(
      nextStatus,
      trimmedReason ||
        (nextStatus === "approved"
          ? "Approved by landlord"
          : "Rejected by landlord"),
    );
    if (succeeded) setReason("");
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button
          type="button"
          onClick={onOpen}
          className="cursor-pointer text-gray-600 hover:text-primary"
          aria-label="View booking request"
        >
          <EyeIcon />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-full w-full sm:w-[480px]">
        <div className="flex h-full flex-col bg-white p-6">
          <DrawerHeader className="mb-4 flex flex-row items-center justify-between border-b border-zinc-200 p-0 pb-4">
            <DrawerTitle className="text-base font-semibold">
              Booking Request: {data?.id ? `#${data.id.slice(0, 8)}` : ""}
            </DrawerTitle>
            <DrawerClose asChild>
              <button type="button" className="text-zinc-500">
                <X className="h-5 w-5" />
              </button>
            </DrawerClose>
          </DrawerHeader>

          {isLoading ? (
            <Loader />
          ) : !data ? (
            <div className="flex flex-1 items-center justify-center text-red-500">
              Failed to load booking details.
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-6 overflow-y-auto">
                <div className="space-y-4 border-b border-zinc-200 pb-6">
                  <div className="flex items-start gap-3">
                    {tenant?.avatar_url ? (
                      <Image
                        src={tenant.avatar_url}
                        alt={tenantName}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600">
                        {tenantName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold">{tenantName}</div>
                      <div className="text-sm capitalize text-gray-500">
                        {tenant?.type || "Tenant"}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-orange-500" />
                      {data?.phone || "—"}
                    </span>
                    <span className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-orange-500" />
                      {data?.email || "—"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  {apartment?.first_image_url ? (
                    <Image
                      src={apartment.first_image_url}
                      alt={apartment.name || "Property"}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-lg bg-zinc-100" />
                  )}
                  <div>
                    <div className="font-medium">
                      {apartment?.name || "Property"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {propertyAddress}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 border-y border-zinc-200 py-5 text-sm">
                  <DetailRow label="Job title" value={data?.jobTitle || "—"} />
                  <DetailRow
                    label="Annual salary"
                    value={data?.annualSalaryRange || "—"}
                  />
                  <DetailRow
                    label="Lease start"
                    value={formatDate(data?.leaseStartDate)}
                  />
                  <DetailRow
                    label="Lease end"
                    value={formatDate(data?.leaseEndDate)}
                  />
                  <DetailRow label="Status" value={status || "—"} />
                </div>

                {documents.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium">Documents</h3>
                    {documents.map((document) => (
                      <a
                        key={document.url}
                        href={document.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <span className="flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4 text-red-500" />
                          {document.name}
                        </span>
                        <Download className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-4">
                <Textarea
                  value={reason}
                  onChange={(event) => {
                    setReason(event.target.value);
                    if (reasonError) setReasonError("");
                  }}
                  placeholder="Reason (required when rejecting)"
                  disabled={isUpdating}
                />
                {reasonError && (
                  <p className="text-sm text-red-500">{reasonError}</p>
                )}
                <DrawerFooter className="flex-row gap-2 p-0">
                  <Button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => updateStatus("approved")}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    {isUpdating ? "Updating..." : "Accept"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isUpdating}
                    onClick={() => updateStatus("rejected")}
                  >
                    {isUpdating ? "Updating..." : "Reject"}
                  </Button>
                </DrawerFooter>
              </div>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-zinc-500">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
