import React from "react";

interface BinaryGlobeProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function BinaryGlobe({ size = "md", className = "" }: BinaryGlobeProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8", 
    xl: "w-10 h-10",
  };

  const patternSize = {
    sm: "text-[6px]",
    md: "text-[8px]",
    lg: "text-[10px]",
    xl: "text-[12px]",
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative inline-block`}>
      <div className="w-full h-full relative overflow-hidden rounded-full bg-gradient-to-br from-onealgo-blue-400 via-onealgo-blue-600 to-onealgo-blue-950 shadow-lg animate-spin-slow">
        {/* Binary pattern overlay */}
        <div className={`absolute inset-0 flex flex-wrap content-start justify-start ${patternSize[size]} leading-none text-white/30 font-mono select-none pointer-events-none`}>
          {Array.from({ length: 36 }, (_, i) => (
            <span key={i} className="animate-pulse" style={{ animationDelay: `${(i * 0.1) % 2}s` }}>
              {Math.random() > 0.5 ? '1' : '0'}
            </span>
          ))}
        </div>

        {/* Highlight effect */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full blur-sm animate-float"></div>

        {/* Orange accent line */}
        <div className="absolute inset-0 rounded-full border border-onealgo-orange-500/60"></div>
      </div>
    </div>
  );
}
