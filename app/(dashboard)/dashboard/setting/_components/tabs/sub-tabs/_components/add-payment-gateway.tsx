import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";

import { Label } from "@radix-ui/react-label";
import { ChevronDownIcon, Plus, X } from "lucide-react";

import React, { useState } from "react";
import AddButton from "@/components/common/AddButton";

const AddPaymentGatway = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolderName: "",
    expiryDate: undefined as Date | undefined,
    cvc: "",
    paymentMethod: "default",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAccept = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.cardNumber ||
      !formData.cardHolderName ||
      !formData.expiryDate ||
      !formData.cvc
    ) {
      alert("Please fill in all required fields");
      return;
    }

    console.log(formData);
    // Reset the form data manually
    setFormData({
      cardNumber: "",
      cardHolderName: "",
      expiryDate: undefined,
      cvc: "",
      paymentMethod: "default",
    });
    setIsModalOpen(false);
  };

  return (
    <div>
      <AddButton onClick={() => setIsModalOpen(true)}>Add Gateway</AddButton>
      {/* modal info  */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
          <form className="" onSubmit={handleAccept}>
            <Card className="w-[630px] relative">
              <CardHeader>
                <CardTitle className="text-2xl text-[#170A00] font-semibold">
                  Add New Payment Gateway
                </CardTitle>
                <CardDescription className="text-[#707070] mt-2 mb-2">
                  You can pay your invoice with Card or via Bank Debit
                </CardDescription>
              </CardHeader>

              <CardContent>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      paymentMethod: value,
                    }))
                  }
                  className="flex gap-3"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem className="" value="default" id="r1" />
                    <Label className="text-sm" htmlFor="r1">
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="comfortable" id="r2" />
                    <Label className="text-sm" htmlFor="r2">
                      ACH
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="PayPal" id="r3" />
                    <Label className="text-sm" htmlFor="r3">
                      PayPal
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="zelle" id="r4" />
                    <Label className="text-sm" htmlFor="r4">
                      Zelle
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="apple-pay" id="r5" />
                    <Label className="text-sm" htmlFor="r5">
                      Apple Pay
                    </Label>
                  </div>
                </RadioGroup>

                <div className="space-y-6 my-4">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[#101010] font-medium"
                      htmlFor="card-number"
                    >
                      Card Number
                    </label>
                    <Input
                      id="card-number"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="p-[14px]"
                      placeholder="6564   1212   7595   7952"
                      required
                    ></Input>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[#101010] font-medium"
                      htmlFor="holder-number"
                    >
                      Card Holder Name
                    </label>
                    <Input
                      id="card-holder-name"
                      name="cardHolderName"
                      value={formData.cardHolderName}
                      onChange={handleChange}
                      className="p-[14px]"
                      placeholder="Mr. Tailor"
                      required
                    ></Input>
                  </div>
                  {/* expiry date and cvv/cvc */}
                  <div>
                    <div className="flex flex-col md:flex-row gap-2 ">
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-col gap-3">
                          <Label htmlFor="expiryDate" className="px-1">
                            Expiry Date <span className="text-red-500">*</span>
                          </Label>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id="date"
                                className="w-48 justify-between font-normal"
                                type="button"
                              >
                                {formData.expiryDate
                                  ? formData.expiryDate.toLocaleDateString()
                                  : "Select date"}
                                <ChevronDownIcon />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={formData.expiryDate}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    expiryDate: date,
                                  }));
                                  setOpen(false);
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <label
                          className="text-[#101010] font-medium"
                          htmlFor="cvc"
                        >
                          CVV/CVC/CVN
                        </label>
                        <Input
                          id="cvc-number"
                          name="cvc"
                          value={formData.cvc}
                          onChange={handleChange}
                          className="p-[14px] "
                          placeholder="456 987"
                          required
                        ></Input>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Checkbox />
                      <p className="text-sm font-medium">
                        Save card for future payment
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardAction className="px-6 space-x-4">
                <Button type="submit" variant="accept">
                  Accept
                </Button>
                <Button
                  type="button"
                  variant="reject"
                  onClick={() => setIsModalOpen(false)}
                >
                  Reject
                </Button>
              </CardAction>

              <div
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 cursor-pointer"
              >
                <X className="text-gray-500 hover:text-gray-600 transition-colors" />
              </div>
            </Card>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddPaymentGatway;
