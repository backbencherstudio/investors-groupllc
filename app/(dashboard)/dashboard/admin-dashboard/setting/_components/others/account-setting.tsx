"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";

import { useForm } from "react-hook-form";
// import axios from "axios";

type FormData = {
  name: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ProfileEditForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [photo, setPhoto] = useState<File | null>(null);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (photo) formData.append("photo", photo);
    if (data.newPassword) {
      formData.append("currentPassword", data.currentPassword);
      formData.append("newPassword", data.newPassword);
    }

    console.log(formData);
    // try {
    //   const response = await axios.post("/api/updateProfile", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    //   console.log("Profile updated:", response.data);
    // } catch (error) {
    //   console.error("Error updating profile:", error);
    // }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-6 bg-white rounded-lg shadow"
    >
      <div className="flex items-center gap-6">
        <Image src="https://randomuser.me/img/creator_keith.png" width={320} height={320} alt="Profile" className="w-16 h-16 rounded-full"></Image>

        <div className="relative">
          <Label
            className=" absolute bg-white border text-center flex items-center justify-center w-full h-9 rounded-md"
            htmlFor="photo"
          >
            Upload Photo
          </Label>
          <Input
            id="photo"
            type="file"
            accept="image/jpeg,image/png"
            onChange={handlePhotoUpload}
            className="w-38 bg-amber-300 "
          />
          <p className="text-sm text-gray-500">JPG, PNG under 10MB</p>
        </div>
      </div>

      {/* Name and contact  */}

      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="w-full md:w-1/3 mt-0.5">
          <Label>Change Name & Contact Info</Label>
          <p className="text-sm text-gray-500 mt-2">
            Set a new password to keep your account secure.
          </p>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-[14px]">
          <Input
            {...register("name", { required: "Name is required" })}
            defaultValue="Johan Alex"
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          <Input
            {...register("email", { required: "Email is required" })}
            defaultValue="john@winvestors.com"
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <Input
            {...register("phone", { required: "Phone is required" })}
            defaultValue="+88 012 345 678"
            placeholder="Phone"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <hr className="my-6" />

      {/* Change Password */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="w-full md:w-1/3 mt-0.5">
          <Label>Change Password</Label>
          <p className="text-sm text-gray-500">
            Set a new password to keep your account secure.
          </p>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-[14px]">
          <Input
            {...register("currentPassword")}
            type="password"
            placeholder="Current Password"
          />
          <Input
            {...register("newPassword")}
            type="password"
            placeholder="New Password"
          />
          <Input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" variant="default">
          Update
        </Button>
      </div>
    </form>
  );
}
