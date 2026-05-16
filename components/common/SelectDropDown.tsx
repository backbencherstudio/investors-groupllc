// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// export default function SelectDropDown({
//   value,
//   onChange,
//   options,
// }: {
//   value: string;
//   onChange: (val: string) => void;
//   options: string[];
// }) {
//   return (
//     <Select value={value} onValueChange={onChange}>
//       <SelectTrigger className="w-full md:w-[140px]">
//         <SelectValue placeholder="All Status" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectItem value="All Status">All Status</SelectItem>
//         {options.map((opt) => (
//           <SelectItem key={opt} value={opt}>
//             {opt}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );
// }




import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

export default function SelectDropDown({
  value,
  onChange,
  options,
  placeholder = "Select",
}: {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  placeholder?: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full md:w-[140px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}