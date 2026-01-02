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
    md: 30,
    lg: 36,
    xl: 44,
  };

  // If className includes text-white, show simplified version
  const isWhiteText = className.includes("text-white");

  if (isWhiteText) {
    return (
      <span className="logo-container">
        <span
          className={`logo font-bold inline-flex items-center ${sizeClasses[size]} ${className}`}
        >
          <span className="logo-one text-onealgo-orange-500">One</span>
          <span className="logo-algorithm text-white">Algorithm</span>
        </span>
      </span>
    );
  }

  return (
    <span className="logo-container">
      <span
        className={`logo font-bold inline-flex items-center ${sizeClasses[size]} ${className}`}
      >
        <span className="logo-one text-onealgo-orange-500">One</span>
        <span className="logo-algorithm text-onealgo-blue-950">Alg</span>
        {showGlobe ? (
          <BinaryGlobeSVG
            size={globeSizes[size]}
            className="mx-1 inline-block drop-shadow-md"
          />
        ) : (
          <span className="logo-algorithm text-onealgo-blue-950">o</span>
        )}
        <span className="logo-algorithm text-onealgo-blue-950">rithm</span>
      </span>
    </span>
  );
}
