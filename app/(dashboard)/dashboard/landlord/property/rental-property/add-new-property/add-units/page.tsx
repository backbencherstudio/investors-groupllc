"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  propertySize: string;
  bedroom: number;
  bathroom: number;

  amenities: string[];
  utilities: string[];

  unitNumber: string;
  floor: string;
  availableDate: string;

  price: string;
  currency: string;
};

const propertySizes = ["950 sqft", "1350 sqft", "1550 sqft", "1600 sqft"];

const amenities = ["Parking", "Gym Access", "Gym Access", "CCTV", "Balcony"];

const utilities = ["Water", "Trash", "Sewer", "Gas", "Electricity", "Internet"];

export default function AddUnitPage() {
  const { register, handleSubmit, control, watch, setValue } =
    useForm<FormValues>({
      defaultValues: {
        propertySize: "1350 sqft",
        bedroom: 2,
        bathroom: 2,
        amenities: ["Parking"],
        utilities: ["Water"],
        currency: "USD",
      },
    });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const bedroom = watch("bedroom");
  const bathroom = watch("bathroom");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-7xl p-6">
      <div className="grid grid-cols-2 gap-8">
        {/* LEFT */}

        <div className="space-y-6">
          {/* Property */}

          <div>
            <h3 className="font-semibold mb-2">Property</h3>

            <div className="rounded-xl bg-orange-50 p-4">
              <h2 className="font-semibold text-lg">Sunset</h2>

              <p className="text-sm text-gray-500">123 Main Street, Miami</p>
            </div>
          </div>

          {/* Property Size */}

          <div>
            <label className="font-medium">Property Size</label>

            <Controller
              control={control}
              name="propertySize"
              render={({ field }) => (
                <div className="mt-3 flex flex-wrap gap-2">
                  {propertySizes.map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => field.onChange(size)}
                      className={`rounded border px-3 py-2 text-sm ${
                        field.value === size
                          ? "border-orange-500 bg-orange-500 text-white"
                          : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            />
          </div>

          {/* Bedroom */}

          <Counter
            label="Bedroom"
            value={bedroom}
            onChange={(v) => setValue("bedroom", v)}
          />

          {/* Bathroom */}

          <Counter
            label="Bathroom"
            value={bathroom}
            onChange={(v) => setValue("bathroom", v)}
          />

          {/* Amenities */}

          <CheckboxGroup
            title="Amenities"
            items={amenities}
            register={register}
            name="amenities"
          />

          {/* Utilities */}

          <CheckboxGroup
            title="Utilities"
            items={utilities}
            register={register}
            name="utilities"
          />
        </div>

        {/* RIGHT */}

        <div className="space-y-5">
          <div className="rounded-xl bg-orange-50 p-4">
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/100"
                className="h-14 w-14 rounded-full"
              />

              <div>
                <h3 className="font-semibold">Johan Mitchell</h3>

                <p className="text-sm text-gray-500">+1555-123-7890</p>
              </div>
            </div>
          </div>

          <div>
            <label>Unit Number</label>

            <input {...register("unitNumber")} className="input" />
          </div>

          <div>
            <label>Floor</label>

            <input {...register("floor")} className="input" />
          </div>

          <div>
            <label>Available Date</label>

            <input
              type="date"
              {...register("availableDate")}
              className="input"
            />
          </div>

          <div>
            <label>Price</label>

            <div className="flex gap-2">
              <input {...register("price")} className="input flex-1" />

              <select {...register("currency")} className="input w-28">
                <option>USD</option>
                <option>EUR</option>
                <option>BDT</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <button className="mt-8 rounded-lg bg-orange-500 px-6 py-3 text-white">
        Save
      </button>
    </form>
  );
}

function Counter({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label>{label}</label>

      <div className="mt-2 flex items-center gap-3">
        <button type="button" onClick={() => onChange(Math.max(0, value - 1))}>
          -
        </button>

        <span>{value}</span>

        <button type="button" onClick={() => onChange(value + 1)}>
          +
        </button>
      </div>
    </div>
  );
}

function CheckboxGroup({ title, items, register, name }: any) {
  return (
    <div>
      <h3 className="font-semibold mb-3">{title}</h3>

      <div className="grid grid-cols-3 gap-2">
        {items.map((item: string) => (
          <label key={item} className="flex items-center gap-2">
            <input type="checkbox" value={item} {...register(name)} />

            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
