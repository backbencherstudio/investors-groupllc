import Image from "next/image";
import React from "react";

interface PropertyImageProps {
  property?: {
    images?: { url: string }[];
    video?: string | null;
    tourVideo?: string | null;
  };
}

export default function PropertyImage({ property }: PropertyImageProps) {
  const images = property?.images || [];
  const mainImage = images.length > 0 ? images[0].url : null;
  const additionalImages = images.slice(1, 4);

  return (
    <div>
      {mainImage ? (
        <Image
          src={mainImage}
          alt="Property"
          width={400}
          height={160}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
      ) : (
        <div className="w-full h-40 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-gray-400 text-sm">
          No Image Available
        </div>
      )}
      <div className="flex gap-2 mb-3">
        {additionalImages.length > 0
          ? additionalImages.map((img, i) => (
              <Image
                key={i}
                src={img.url}
                width={48}
                height={48}
                className="w-12 h-12 object-cover rounded-lg"
                alt={`thumb${i}`}
              />
            ))
          : images.length === 1 &&
            [1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs"
              >
                No img
              </div>
            ))}
      </div>
      {/* Video links */}
      {(property?.video || property?.tourVideo) && (
        <div className="flex flex-wrap gap-2 mt-2">
          {property?.video && (
            <a
              href={property.video}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#d48806] underline"
            >
              Virtual Video
            </a>
          )}
          {property?.tourVideo && (
            <a
              href={property.tourVideo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#d48806] underline"
            >
              Tour Video
            </a>
          )}
        </div>
      )}
    </div>
  );
}
