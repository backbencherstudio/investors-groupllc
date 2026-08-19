"use client";

import Image from "next/image";
import { Calendar, Clock, EyeIcon, Mail, Phone, X } from "lucide-react";

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

interface PropertyTourDetailsProps {
  data: any;
  isLoading?: boolean;
  isConfirming?: boolean;
  onOpen: () => void;
  onStatusChange: (status: "confirmed" | "rejected") => Promise<boolean>;
}

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

export default function PropertyTourDetails({
  data,
  isLoading = false,
  isConfirming = false,
  onOpen,
  onStatusChange,
}: PropertyTourDetailsProps) {
  const user = data?.user || data?.tenant;
  const apartment = data?.apartment;
  const userName =
    data?.name ||
    [user?.first_name, user?.last_name].filter(Boolean).join(" ") ||
    user?.username ||
    "Tenant";
  const status = String(data?.status || "");
  const propertyAddress = apartment
    ? `${apartment.address || ""}, ${apartment.city || ""}, ${apartment.state || ""} ${apartment.zipCode || ""}`
    : "—";

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button
          type="button"
          onClick={onOpen}
          className="cursor-pointer text-gray-600 hover:text-primary"
          aria-label="View property tour details"
        >
          <EyeIcon />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-full w-full sm:w-[480px]">
        <div className="flex h-full flex-col bg-white p-6">
          <DrawerHeader className="mb-4 flex flex-row items-center justify-between border-b border-zinc-200 p-0 pb-4">
            <DrawerTitle className="text-base font-semibold">
              Property Tour: {data?.tour_id || data?.id || ""}
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
              Failed to load property tour details.
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-6 overflow-y-auto">
                <div className="space-y-4 border-b border-zinc-200 pb-6">
                  <div className="flex items-center gap-3">
                    {user?.avatar_url ? (
                      <Image
                        src={user.avatar_url}
                        alt={userName}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600">
                        {userName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold">{userName}</div>
                      <div className="text-sm capitalize text-gray-500">
                        {user?.type || "Tenant"}
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
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-lg bg-zinc-100" />
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
                  <DetailRow
                    label="Tour date"
                    value={formatDate(data?.tour_date || data?.tourDate)}
                  />
                  <DetailRow
                    label="Tour time"
                    value={data?.tour_time || data?.tourTime || "—"}
                  />
                  <DetailRow
                    label="Tour type"
                    value={data?.tourType || "—"}
                  />
                  <DetailRow label="Status" value={status || "—"} />
                </div>

                <div>
                  <h3 className="mb-2 font-medium">Description</h3>
                  <div className="rounded-lg bg-zinc-50 p-3 text-sm text-zinc-600">
                    {data?.description || "No description provided."}
                  </div>
                </div>

                {data?.virtualMeetingLink && (
                  <a
                    href={data.virtualMeetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-orange-600 hover:underline"
                  >
                    <Calendar className="h-4 w-4" />
                    Open virtual meeting
                  </a>
                )}

                <div className="flex gap-4 text-sm text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(data?.tour_date || data?.tourDate)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {data?.tour_time || data?.tourTime || "—"}
                  </span>
                </div>
              </div>

              <DrawerFooter className="flex-row gap-2 p-0 pt-4">
                <Button
                  type="button"
                  disabled={isConfirming}
                  onClick={() => onStatusChange("confirmed")}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {isConfirming ? "Confirming..." : "Confirm Tour"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isConfirming}
                  onClick={() => onStatusChange("rejected")}
                >
                  {isConfirming ? "Updating..." : "Reject"}
                </Button>
              </DrawerFooter>
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
