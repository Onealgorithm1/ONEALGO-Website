import React from "react";

import { cn } from "@/lib/utils";
import styles from "./BinaryGlobeSVG.module.css";

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
      className={cn(
        "inline-block self-center",
        styles.binaryGlobeImage,
        className,
      )}
      loading="lazy"
      decoding="async"
    />
  );
}
