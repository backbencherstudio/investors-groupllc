"use client";

import React, { useState } from "react";
import { X, ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddTeamMemberModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Contractor Manager",
    permission: "Manage Tenant",
  });

  const roles = [
    "Contractor Manager",
    "Project Manager",
    "Admin",
    "Supervisor",
    "Team Lead",
  ];

  const permissions = [
    "Manage Tenant",
    "Manage Contractor",
    "View Only",
    "Full Access",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Simulate API call
      //   console.log(isSubmitting);
      setTimeout(() => {
        const response = true;
        if (response) {
          // Success - close modal and reset form
          setIsModalOpen(false);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            role: "Contractor Manager",
            permission: "Manage Tenant",
          });
          alert("Team member invitation sent successfully!");
        } else {
          throw new Error("Failed to send invitation");
        }
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send invitation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(isSubmitting);
  return (
    <div className="">
      {/* Trigger Button */}
      <div className="max-w-md ">
        {/* <button
          
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Team Member
        </button> */}

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black border rounded font-normal mt-4 md:mt-6 hover:text-white cursor-pointer"
        >
          <Plus></Plus>
          Add New Team
        </Button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto ">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Add Team Member
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-6">
                Send an invitation directly to the user&apos;s email.
                They&apos;ll receive a secure link to join the dashboard, create
                a password, and set up their profile.
              </p>

              <div className="space-y-4">
                {/* first and last name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Your first name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Your last name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Role Dropdown */}
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Role
                  </label>
                  <div className="relative">
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white "
                    >
                      {roles.map((role) => (
                        <option
                          className=" rounded-2xl"
                          key={role}
                          value={role}
                        >
                          {role}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>

                {/* Permission Dropdown */}
                <div>
                  <label
                    htmlFor="permission"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Permission
                  </label>
                  <div className="relative">
                    <select
                      id="permission"
                      name="permission"
                      value={formData.permission}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      {permissions.map((permission) => (
                        <option key={permission} value={permission}>
                          {permission}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 px-4 rounded-lg font-medium transition-colors mt-6 cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTeamMemberModal;
