import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export default function DatePicker({ value, onChange }: { value: Date, onChange: (date: Date) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full md:w-[160px] justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? value.toDateString() : "Select date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={(date) => { onChange(date); setOpen(false); }} initialFocus />
      </PopoverContent>
    </Popover>
  );
}