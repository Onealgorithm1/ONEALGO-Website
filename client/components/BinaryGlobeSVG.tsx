import React from "react";

interface BinaryGlobeSVGProps {
  size?: number;
  className?: string;
}

export default function BinaryGlobeSVG({
  size = 32,
  className = "",
}: BinaryGlobeSVGProps) {
  const base =
    "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fc7904dee94834b3c95bc63f5f5c8a666?format=webp&width=";
  const dpr2 = Math.max(size * 2, 64);
  const widths = Array.from(new Set([size, dpr2, 128, 256]))
    .filter((w) => w > 0)
    .sort((a, b) => a - b);
  const src = `${base}${dpr2}`;
  const srcSet = widths.map((w) => `${base}${w} ${w}w`).join(", ");

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={`${size}px`}
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
