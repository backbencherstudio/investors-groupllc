"use client";

import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { X, Phone, Mail, EyeIcon } from "lucide-react";
import Image from "next/image";

interface PropertyInfo {
  image: string;
  name: string;
  address: string;
  priority: string;
}

interface ContactInfo {
  phone: string;
  email: string;
}

interface TaskDetails {
  tenantName: string;
  issue: string;
  position: string;
  category: string;
  preferredDateTime: string;
  requestId: string;
  status: string;
  requestDate: string;
  description: string;
  media: string[];
}

interface MaintenanceDetailsProps {
  property: PropertyInfo;
  contact: ContactInfo;
  taskDetails: TaskDetails;
}

export function MaintenanceDetails({
  property,
  contact,
  taskDetails,
}: MaintenanceDetailsProps) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="text-gray-600 hover:text-primary cursor-pointer">
          <EyeIcon />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-full w-full sm:w-[480px]">
        <div className="flex flex-col h-full bg-white p-6">
          {/* Header */}
          <DrawerHeader className="flex flex-row justify-between items-center pb-4 border-b border-zinc-200 mb-4">
            <DrawerTitle className="text-[16px] font-semibold">
              Vendor Task Details
            </DrawerTitle>
            <DrawerClose asChild>
              <button className="text-zinc-500 hover:text-zinc-700">
                <X className="h-5 w-5" />
              </button>
            </DrawerClose>
          </DrawerHeader>

          {/* Property Info */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <Image
                src={property.image}
                alt={property.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <div className="font-medium">{property.name}</div>
                <div className="text-xs text-muted-foreground">
                  {property.address}
                </div>
              </div>
            </div>
            <span className="text-xs bg-red-100 text-red-600 font-medium px-2 py-0.5 rounded">
              {property.priority}
            </span>
          </div>

          {/* Contact Info */}
          <div className="flex gap-4 items-center text-sm text-neutral-700 mb-6">
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-orange-500" />
              {contact.phone}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4 text-orange-500" />
              {contact.email}
            </span>
          </div>

          {/* Task Info */}
          <div className="space-y-2 text-sm text-neutral-700 mb-6">
            <div className="flex justify-between">
              <span className="text-zinc-500">Tenant Name</span>
              <span className="font-medium text-right">
                {taskDetails.tenantName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Issue</span>
              <span className="font-medium text-right">
                {taskDetails.issue}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Position</span>
              <span className="font-medium text-right">
                {taskDetails.position}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Category</span>
              <span className="font-medium text-right">
                {taskDetails.category}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Preferred Date & Time</span>
              <span className="font-medium text-right">
                {taskDetails.preferredDateTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Request ID</span>
              <span className="font-medium text-right">
                {taskDetails.requestId}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">Status</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-semibold">
                {taskDetails.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Request Date</span>
              <span className="font-medium text-right">
                {taskDetails.requestDate}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-zinc-50 p-3 rounded text-sm text-neutral-600 mb-4">
            {taskDetails.description}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {taskDetails.media.map((media, index) => (
              <Image
                key={index}
                src={media}
                width={80}
                height={80}
                className="w-20 h-20 rounded object-cover"
                alt={`Issue ${index + 1}`}
              />
            ))}
          </div>

          {/* Footer (if needed) */}
          {/* 
          <DrawerFooter className="mt-auto flex flex-row gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Confirm</Button>
          </DrawerFooter> 
          */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
