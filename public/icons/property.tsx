import React from "react";

interface PropertyIconProps {
  className?: string;
}

const PropertyIcon: React.FC<PropertyIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="124"
      height="124"
      viewBox="0 0 124 124"
      fill="none"
      className={className}
    >
      <path
        d="M10.334 51.6663H42.0057C43.2635 51.6538 44.4674 51.1537 45.364 50.2713L58.6423 37.5613C59.5335 36.6716 60.7413 36.1719 62.0006 36.1719C63.2599 36.1719 64.4678 36.6716 65.359 37.5613L78.6373 50.2713C79.5339 51.1537 80.7378 51.6538 81.9956 51.6663H113.667"
        stroke="#EDEDED"
        stroke-width="7.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.5007 108.5V51.6667L25.6325 28.024C30.0862 17.639 33.3308 15.5 44.6303 15.5H79.371C90.6757 15.5 93.9151 17.639 98.3688 28.024L108.501 51.6667V108.5M10.334 108.5H113.667M62.042 56.8333H61.9955M49.084 108.5V85.25C49.084 83.1946 49.9005 81.2233 51.3539 79.7699C52.8073 78.3165 54.7786 77.5 56.834 77.5H67.1673C69.2227 77.5 71.194 78.3165 72.6474 79.7699C74.1008 81.2233 74.9173 83.1946 74.9173 85.25V108.5M31.0007 72.3333H36.1673M87.834 72.3333H93.0006"
        stroke="#EDEDED"
        stroke-width="7.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default PropertyIcon;
