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
  const src = "/globe-logo.png";
  return (
    <img
      src={src}
      alt="o"
      width={size}
      height={size}
      className={cn(
        "inline-block self-center mx-0",
        styles.binaryGlobeImage,
        className,
      )}
      loading="eager"
      decoding="async"
    />
  );
}
