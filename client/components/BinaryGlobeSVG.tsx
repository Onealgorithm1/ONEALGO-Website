import React from "react";

interface BinaryGlobeSVGProps {
  size?: number;
  className?: string;
}

export default function BinaryGlobeSVG({
  size = 32,
  className = "",
}: BinaryGlobeSVGProps) {
  const src = "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fdc081d752c66412d9b254d3932210f12?format=webp&width=800";
  return (
    <img
      src={src}
      alt="OneAlgorithm Logo"
      width={size}
      height={size}
      className={`inline-block ${className}`}
      style={{ objectFit: "contain" }}
      loading="lazy"
      decoding="async"
    />
  );
}
