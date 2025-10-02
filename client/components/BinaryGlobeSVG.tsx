import React from "react";

interface BinaryGlobeSVGProps {
  size?: number;
  className?: string;
}

export default function BinaryGlobeSVG({
  size = 32,
  className = "",
}: BinaryGlobeSVGProps) {
  const src =
    "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F557317a35fa3445dbb745567290f1bd4";
  return (
    <img
      src={src}
      alt="OneAlgorithm Logo"
      width={size}
      height={size}
      className={`inline-block ${className}`}
      style={{
        objectFit: "contain",
        aspectRatio: `auto ${size} / ${size}`,
        borderColor: "rgb(255, 255, 255)",
        borderWidth: "0.8px",
        color: "rgb(255, 255, 255)",
        filter:
          "drop-shadow(rgba(0, 0, 0, 0.07) 0px 4px 3px) drop-shadow(rgba(0, 0, 0, 0.06) 0px 2px 2px)",
        fontWeight: 700,
        objectFit: "contain",
        textDecoration: "rgb(255, 255, 255)",
        alignSelf: "center",
      }}
      loading="lazy"
      decoding="async"
    />
  );
}
