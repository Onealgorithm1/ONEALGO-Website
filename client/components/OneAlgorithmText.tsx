import React from "react";
import BinaryGlobeSVG from "./BinaryGlobeSVG";

interface OneAlgorithmTextProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showGlobe?: boolean;
}

export default function OneAlgorithmText({
  size = "md",
  className = "",
  showGlobe = true,
}: OneAlgorithmTextProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl sm:text-2xl lg:text-3xl",
    lg: "text-2xl sm:text-3xl lg:text-4xl",
    xl: "text-3xl sm:text-4xl lg:text-5xl",
  };

  const globeSizes = {
    sm: 20,
    md: 28,
    lg: 36,
    xl: 44,
  };

  return (
    <span
      className={`font-bold inline-flex items-center ${sizeClasses[size]} ${className}`}
    >
      <span className="text-onealgo-orange-500">One</span>
      <span className="text-onealgo-blue-950">Alg</span>
      {showGlobe ? (
        <BinaryGlobeSVG size={globeSizes[size]} className="mx-1 inline-block drop-shadow-md" />
      ) : (
        <span className="text-onealgo-blue-950">o</span>
      )}
      <span className="text-onealgo-blue-950">rithm</span>
    </span>
  );
}
