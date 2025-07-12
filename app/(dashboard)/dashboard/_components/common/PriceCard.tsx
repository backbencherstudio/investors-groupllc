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
import { Check, Edit, X } from "lucide-react";

type PriceCard = {
  variant?: string;
  data: any;
};

export const SubscriptionCard = ({ variant = "admin", data }: PriceCard) => {
  return (
    <Card className="w-full rounded-md py-4 gap-3 max-w-md ">
      <CardHeader className="px-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-[#404040]">{data.name}</h3>
          {variant === "admin" ? (
            <Edit className="w-4 h-4 cursor-pointer" />
          ) : (
            <Checkbox className="border-[#404040]" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg">{data.price}</CardTitle>
          {data.savings && (
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">
              {data.savings}
            </span>
          )}
        </div>
        <CardDescription className="font-medium">
          {data.description}
        </CardDescription>
        <hr className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-1">
        {data?.features?.map((feature, idx: number) => (
          <div
            key={idx}
            className="text-[#707070] text-xs flex items-center gap-2"
          >
            {feature?.included ? (
              <Check className="w-4 h-4 font-semibold" color="#04A755" />
            ) : (
              <X className="w-4 h-4 font-semibold" color="#CB121D" />
            )}
            <span>{feature?.label}</span>
          </div>
        ))}
      </CardContent>

      {variant === "landlord" && (
        <CardAction className="px-5 mt-4">
          <Button  className={`${data.name === "Premium" && "bg-[#d80]"} cursor-pointer`}>
            Get Started
          </Button>
        </CardAction>
      )}
    </Card>
  );
};
