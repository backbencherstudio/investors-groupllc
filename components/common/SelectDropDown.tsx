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

const EMPTY_VALUE = "__all__";

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
    <Select
      value={value || EMPTY_VALUE}
      onValueChange={(val) => onChange(val === EMPTY_VALUE ? "" : val)}
    >
      <SelectTrigger className="w-full md:w-[140px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem
            key={opt.value || EMPTY_VALUE}
            value={opt.value || EMPTY_VALUE}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}