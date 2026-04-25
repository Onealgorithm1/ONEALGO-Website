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
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={cn("inline-block self-center drop-shadow-md", className)}
      aria-label="OneAlgorithm Logo - Binary Globe"
    >
      <defs>
        <radialGradient id="globeGradient" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#f0f0f0" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* Outer circle border */}
      <circle
        cx="60"
        cy="60"
        r="56"
        fill="none"
        stroke="#005eaa"
        strokeWidth="4"
      />

      {/* Globe sphere with gradient */}
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="url(#globeGradient)"
        opacity="0.98"
      />

      {/* Latitude curve lines for 3D effect */}
      <ellipse
        cx="60"
        cy="45"
        rx="48"
        ry="12"
        fill="none"
        stroke="#005eaa"
        strokeWidth="0.5"
        opacity="0.2"
      />
      <ellipse
        cx="60"
        cy="60"
        rx="50"
        ry="15"
        fill="none"
        stroke="#005eaa"
        strokeWidth="0.8"
        opacity="0.15"
      />
      <ellipse
        cx="60"
        cy="75"
        rx="48"
        ry="12"
        fill="none"
        stroke="#005eaa"
        strokeWidth="0.5"
        opacity="0.2"
      />

      {/* Binary digits arranged to show 3D perspective */}
      
      {/* Top left area - Blue */}
      <text x="28" y="35" fontSize="10" fontWeight="700" fill="#005eaa" textAnchor="middle">0</text>
      <text x="20" y="50" fontSize="9" fontWeight="700" fill="#005eaa" textAnchor="middle">1</text>
      <text x="25" y="65" fontSize="8" fontWeight="700" fill="#005eaa" textAnchor="middle">0</text>
      
      {/* Top center - Blue and Orange mix */}
      <text x="60" y="30" fontSize="11" fontWeight="700" fill="#005eaa" textAnchor="middle">0</text>
      <text x="50" y="40" fontSize="10" fontWeight="700" fill="#ffa634" textAnchor="middle">1</text>
      <text x="70" y="38" fontSize="9" fontWeight="700" fill="#005eaa" textAnchor="middle">0</text>
      
      {/* Top right area - Blue and Orange */}
      <text x="95" y="42" fontSize="10" fontWeight="700" fill="#005eaa" textAnchor="middle">1</text>
      <text x="100" y="58" fontSize="9" fontWeight="700" fill="#ffa634" textAnchor="middle">0</text>
      <text x="92" y="72" fontSize="8" fontWeight="700" fill="#005eaa" textAnchor="middle">1</text>
      
      {/* Center - Large Green and Orange for emphasis */}
      <text x="50" y="58" fontSize="13" fontWeight="700" fill="#10b981" textAnchor="middle">0</text>
      <text x="70" y="62" fontSize="12" fontWeight="700" fill="#ffa634" textAnchor="middle">1</text>
      <text x="60" y="75" fontSize="10" fontWeight="700" fill="#005eaa" textAnchor="middle">0</text>
      
      {/* Left side - Blue */}
      <text x="22" y="38" fontSize="8" fontWeight="700" fill="#005eaa" textAnchor="middle">1</text>
      <text x="18" y="75" fontSize="9" fontWeight="700" fill="#10b981" textAnchor="middle">0</text>
      <text x="26" y="85" fontSize="8" fontWeight="700" fill="#005eaa" textAnchor="middle">1</text>
      
      {/* Right side - Blue and Orange */}
      <text x="98" y="75" fontSize="9" fontWeight="700" fill="#ffa634" textAnchor="middle">0</text>
      <text x="102" y="88" fontSize="8" fontWeight="700" fill="#005eaa" textAnchor="middle">1</text>
      
      {/* Bottom area - Green emphasis */}
      <text x="40" y="95" fontSize="10" fontWeight="700" fill="#10b981" textAnchor="middle">0</text>
      <text x="60" y="100" fontSize="9" fontWeight="700" fill="#005eaa" textAnchor="middle">1</text>
      <text x="80" y="93" fontSize="9" fontWeight="700" fill="#ffa634" textAnchor="middle">0</text>

      {/* Additional scattered digits for density */}
      <text x="35" y="52" fontSize="7" fontWeight="700" fill="#005eaa" textAnchor="middle" opacity="0.8">1</text>
      <text x="85" y="50" fontSize="7" fontWeight="700" fill="#10b981" textAnchor="middle" opacity="0.8">0</text>
      <text x="45" y="72" fontSize="8" fontWeight="700" fill="#ffa634" textAnchor="middle" opacity="0.9">1</text>
      <text x="75" y="78" fontSize="7" fontWeight="700" fill="#005eaa" textAnchor="middle" opacity="0.8">0</text>
    </svg>
  );
}
