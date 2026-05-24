"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import {
  useGetGeneralSettingsQuery,
  useUpdateGeneralSettingsMutation,
  useUpdatePasswordMutation,
} from "@/redux/features/settings/SettingsApi";
import { toast } from "sonner";

type ProfileFormData = {
  name: string;
  email: string;
  phone: string;
};

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ProfileEditForm() {
  const { data: userData, isLoading: isLoadingUser } = useGetGeneralSettingsQuery();
  const [updateGeneralSettings, { isLoading: isUpdatingProfile }] = useUpdateGeneralSettingsMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] = useUpdatePasswordMutation();

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    setValue: setProfileValue,
    reset: resetProfile,
  } = useForm<ProfileFormData>();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormData>();

  const [photo, setPhoto] = useState<File | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  // Set form values when user data is loaded
  useEffect(() => {
    if (userData) {
      setProfileValue("name", userData.name);
      setProfileValue("email", userData.email);
      setProfileValue("phone", userData.phone);
      setPreviewImage(userData.avatar);
    }
  }, [userData, setProfileValue]);

  // Handle Profile Update
  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      if (photo) formData.append("avatar", photo);

      const result = await updateGeneralSettings(formData).unwrap();
      toast.success((result as any).message || "Profile updated successfully");
      
      // Reset photo state
      setPhoto(null);
      
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  // Handle Password Update
  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        toast.error("New password and confirm password do not match");
        return;
      }

      const result = await updatePassword({
        old_password: data.currentPassword,
        new_password: data.newPassword,
        confirm_password: data.confirmPassword,
      }).unwrap();

      toast.success((result as any).message || "Password updated successfully");
      
      // Clear password fields
      resetPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
    } catch (error: any) {
      console.error("Error updating password:", error);
      toast.error(error?.data?.message || "Failed to update password");
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoadingUser) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      {/* Profile Update Form */}
      <form onSubmit={handleSubmitProfile(onProfileSubmit)} className="space-y-4">
        <div className="flex items-center gap-6">
          <img
            src={previewImage || "https://randomuser.me/img/creator_keith.png"}
            width={320}
            height={320}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />

          <div className="relative">
            <Label
              className="absolute bg-white border text-center flex items-center justify-center w-full h-9 rounded-md cursor-pointer"
              htmlFor="photo"
            >
              Upload Photo
            </Label>
            <Input
              id="photo"
              type="file"
              accept="image/jpeg,image/png"
              onChange={handlePhotoUpload}
              className="w-38 opacity-0 cursor-pointer"
            />
            <p className="text-sm text-gray-500 mt-2">JPG, PNG under 10MB</p>
          </div>
        </div>

        {/* Name and contact */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="w-full md:w-1/3 mt-0.5">
            <Label>Change Name & Contact Info</Label>
            <p className="text-sm text-gray-500 mt-2">
              Update your personal information
            </p>
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-[14px]">
            <Input
              {...registerProfile("name", { required: "Name is required" })}
              placeholder="Name"
            />
            {profileErrors.name && (
              <p className="text-red-500 text-sm">{profileErrors.name.message}</p>
            )}

            <Input
              {...registerProfile("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Email"
            />
            {profileErrors.email && (
              <p className="text-red-500 text-sm">{profileErrors.email.message}</p>
            )}
            
            <Input
              {...registerProfile("phone", { required: "Phone is required" })}
              placeholder="Phone"
            />
            {profileErrors.phone && (
              <p className="text-red-500 text-sm">{profileErrors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            variant="default"
            disabled={isUpdatingProfile}
          >
            {isUpdatingProfile ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>

      <hr className="my-6" />

      {/* Change Password Form */}
      <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="w-full md:w-1/3 mt-0.5">
            <Label>Change Password</Label>
            <p className="text-sm text-gray-500">
              Set a new password to keep your account secure.
            </p>
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-[14px]">
            <div className="relative">
              <Input
                {...registerPassword("currentPassword", {
                  required: "Current password is required",
                })}
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Current Password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                tabIndex={-1}
                onClick={() => setShowCurrentPassword((v) => !v)}
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordErrors.currentPassword && (
              <p className="text-red-500 text-sm">{passwordErrors.currentPassword.message}</p>
            )}
            
            <div className="relative">
              <Input
                {...registerPassword("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                tabIndex={-1}
                onClick={() => setShowNewPassword((v) => !v)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordErrors.newPassword && (
              <p className="text-red-500 text-sm">{passwordErrors.newPassword.message}</p>
            )}
            
            <div className="relative">
              <Input
                {...registerPassword("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value, formValues) =>
                    value === formValues.newPassword || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                tabIndex={-1}
                onClick={() => setShowConfirmPassword((v) => !v)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordErrors.confirmPassword && (
              <p className="text-red-500 text-sm">{passwordErrors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            variant="default"
            disabled={isUpdatingPassword}
          >
            {isUpdatingPassword ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}