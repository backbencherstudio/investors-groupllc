import Image from "next/image";
import React from "react";

export default function PropertyImage() {
  return (
    <div>
      <Image
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
        alt="Property"
        width={160}
        height={160}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <div className="flex gap-2 mb-3">
        {[1, 2, 3].map((_, i) => (
          <Image
            key={i}
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            width={48}
            height={48}
            className="w-12 h-12 object-cover rounded-lg"
            alt={`thumb${i}`}
          />
        ))}
      </div>
    </div>
  );
}
