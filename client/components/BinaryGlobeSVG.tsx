import React from "react";

interface BinaryGlobeSVGProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function BinaryGlobeSVG({ size = "md", className = "" }: BinaryGlobeSVGProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8", 
    xl: "w-10 h-10",
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative inline-block`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full animate-spin-slow"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient Definitions */}
        <defs>
          <radialGradient id="sphereGradient" cx="0.3" cy="0.3" r="0.7">
            <stop offset="0%" stopColor="#36bef6" />
            <stop offset="30%" stopColor="#0284c7" />
            <stop offset="70%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#005eaa" />
          </radialGradient>
          
          <radialGradient id="highlightGradient" cx="0.3" cy="0.3" r="0.4">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Main sphere */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#sphereGradient)"
          stroke="#ffa634"
          strokeWidth="1"
          opacity="0.95"
        />

        {/* Binary numbers positioned around sphere */}
        <g className="binary-numbers" fill="rgba(255,255,255,0.7)" fontSize="6" fontFamily="monospace">
          {/* Top arc */}
          <text x="30" y="20" className="animate-pulse" style={{animationDelay: '0s'}}>1</text>
          <text x="40" y="15" className="animate-pulse" style={{animationDelay: '0.2s'}}>0</text>
          <text x="50" y="12" className="animate-pulse" style={{animationDelay: '0.4s'}}>1</text>
          <text x="60" y="15" className="animate-pulse" style={{animationDelay: '0.6s'}}>1</text>
          <text x="70" y="20" className="animate-pulse" style={{animationDelay: '0.8s'}}>0</text>
          
          {/* Left arc */}
          <text x="15" y="35" className="animate-pulse" style={{animationDelay: '1s'}}>0</text>
          <text x="12" y="45" className="animate-pulse" style={{animationDelay: '1.2s'}}>1</text>
          <text x="15" y="55" className="animate-pulse" style={{animationDelay: '1.4s'}}>0</text>
          <text x="20" y="65" className="animate-pulse" style={{animationDelay: '1.6s'}}>1</text>
          
          {/* Right arc */}
          <text x="85" y="35" className="animate-pulse" style={{animationDelay: '1.8s'}}>1</text>
          <text x="88" y="45" className="animate-pulse" style={{animationDelay: '2s'}}>0</text>
          <text x="85" y="55" className="animate-pulse" style={{animationDelay: '0.3s'}}>1</text>
          <text x="80" y="65" className="animate-pulse" style={{animationDelay: '0.5s'}}>0</text>
          
          {/* Bottom arc */}
          <text x="30" y="85" className="animate-pulse" style={{animationDelay: '0.7s'}}>0</text>
          <text x="40" y="88" className="animate-pulse" style={{animationDelay: '0.9s'}}>1</text>
          <text x="50" y="90" className="animate-pulse" style={{animationDelay: '1.1s'}}>1</text>
          <text x="60" y="88" className="animate-pulse" style={{animationDelay: '1.3s'}}>0</text>
          <text x="70" y="85" className="animate-pulse" style={{animationDelay: '1.5s'}}>1</text>
          
          {/* Inner numbers */}
          <text x="35" y="40" className="animate-pulse" style={{animationDelay: '1.7s'}}>1</text>
          <text x="65" y="40" className="animate-pulse" style={{animationDelay: '1.9s'}}>0</text>
          <text x="35" y="60" className="animate-pulse" style={{animationDelay: '0.1s'}}>0</text>
          <text x="65" y="60" className="animate-pulse" style={{animationDelay: '0.4s'}}>1</text>
          <text x="50" y="50" className="animate-pulse" style={{animationDelay: '0.6s'}}>1</text>
        </g>

        {/* Orange accent numbers */}
        <g fill="#ffa634" fontSize="7" fontFamily="monospace" fontWeight="bold">
          <text x="25" y="30" className="animate-pulse" style={{animationDelay: '0.8s'}}>1</text>
          <text x="75" y="30" className="animate-pulse" style={{animationDelay: '1.0s'}}>0</text>
          <text x="25" y="75" className="animate-pulse" style={{animationDelay: '1.2s'}}>0</text>
          <text x="75" y="75" className="animate-pulse" style={{animationDelay: '1.4s'}}>1</text>
        </g>

        {/* Green accent numbers */}
        <g fill="#10b981" fontSize="7" fontFamily="monospace" fontWeight="bold">
          <text x="45" y="25" className="animate-pulse" style={{animationDelay: '1.6s'}}>0</text>
          <text x="55" y="75" className="animate-pulse" style={{animationDelay: '1.8s'}}>1</text>
        </g>

        {/* Highlight effect */}
        <ellipse
          cx="40"
          cy="35"
          rx="8"
          ry="6"
          fill="url(#highlightGradient)"
          opacity="0.6"
          className="animate-float"
        />

        {/* Orange rim glow */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#ffa634"
          strokeWidth="0.5"
          opacity="0.8"
          className="animate-pulse-slow"
        />
      </svg>
    </div>
  );
}
