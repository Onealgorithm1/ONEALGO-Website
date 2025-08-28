import React from "react";

interface BinaryGlobeSVGProps {
  size?: number;
  className?: string;
}

export default function BinaryGlobeSVG({ size = 32, className = "" }: BinaryGlobeSVGProps) {
  return (
    <img
      src="https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fc7904dee94834b3c95bc63f5f5c8a666?format=webp&width=800"
      alt="OneAlgorithm Logo"
      width={size}
      height={size}
      className={`inline-block ${className}`}
      style={{ objectFit: 'contain' }}
    />
  );
}
