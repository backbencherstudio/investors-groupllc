import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface AddButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  className?: string;
}

export default function AddButton({
  children,
  className,
  ...props
}: AddButtonProps) {
  return (
    <Button
      className={`bg-gray-100/50 text-black border rounded font-normal hover:text-white transition-colors cursor-pointer shadow ${
        className || ""
      }`}
      {...props}
    >
      <Plus />
      {children}
    </Button>
  );
}
