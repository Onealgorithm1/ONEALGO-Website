import React from "react";

interface BinaryGlobeSVGProps {
  size?: number;
  className?: string;
}

export default function BinaryGlobeSVG({ size = 32, className = "" }: BinaryGlobeSVGProps) {
  return (
    <div className={`inline-block ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className="animate-spin-slow"
        style={{ animationDuration: '20s' }}
      >
        {/* Gradient Definitions */}
        <defs>
          <radialGradient id="sphereGradient" cx="0.3" cy="0.3" r="0.7">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="70%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </radialGradient>
          
          <linearGradient id="numberGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>
          
          <linearGradient id="numberGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
          
          <linearGradient id="numberGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
        </defs>

        {/* Main Sphere */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="url(#sphereGradient)"
          opacity="0.1"
        />

        {/* Binary Numbers positioned around sphere surface */}
        
        {/* Top Arc - 1s and 0s */}
        <text x="65" y="35" fill="url(#numberGradient1)" fontSize="24" fontWeight="bold" className="animate-pulse" style={{animationDelay: '0s'}}>1</text>
        <text x="85" y="25" fill="url(#numberGradient2)" fontSize="20" fontWeight="bold" className="animate-pulse" style={{animationDelay: '0.5s'}}>0</text>
        <text x="105" y="30" fill="url(#numberGradient3)" fontSize="22" fontWeight="bold" className="animate-pulse" style={{animationDelay: '1s'}}>1</text>
        <text x="125" y="35" fill="url(#numberGradient1)" fontSize="18" fontWeight="bold" className="animate-pulse" style={{animationDelay: '1.5s'}}>0</text>
        <text x="140" y="45" fill="url(#numberGradient2)" fontSize="20" fontWeight="bold" className="animate-pulse" style={{animationDelay: '2s'}}>1</text>

        {/* Upper Left Arc */}
        <text x="25" y="65" fill="url(#numberGradient3)" fontSize="18" fontWeight="bold" className="animate-pulse" style={{animationDelay: '0.3s'}}>0</text>
        <text x="15" y="85" fill="url(#numberGradient1)" fontSize="22" fontWeight="bold" className="animate-pulse" style={{animationDelay: '0.8s'}}>1</text>
        <text x="20" y="105" fill="url(#numberGradient2)" fontSize="20" fontWeight="bold" className="animate-pulse" style={{animationDelay: '1.3s'}}>0</text>
        <text x="30" y="125" fill="url(#numberGradient3)" fontSize="24" fontWeight="bold" className="animate-pulse" style={{animationDelay: '1.8s'}}>1</text>

        {/* Upper Right Arc */}
        <text x="175" y="65" fill="url(#numberGradient2)" fontSize="20" fontWeight="bold" className="animate-pulse" style={{animationDelay: '0.6s'}}>1</text>
        <text x="185" y="85" fill="url(#numberGradient1)" fontSize="18" fontWeight="bold" className="animate-pulse" style={{animationDelay: '1.1s'}}>0</text>
        <text x="180" y="105" fill="url(#numberGradient3)" fontSize="22" fontWeight="bold" className="animate-pulse" style={{animationDelay: '1.6s'}}>1</text>
        <text x="170" y="125" fill="url(#numberGradient2)" fontSize="20" fontWeight="bold" className="animate-pulse" style={{animationDelay: '2.1s'}}>0</text>

        {/* Center Area - Large numbers */}
        <text x="70" y="85" fill="url(#numberGradient1)" fontSize="28" fontWeight="bold" className="animate-pulse" style={{animationDelay: '0.2s'}}>1</text>
        <text x="110" y="75" fill="url(#numberGradient3)" fontSize="32" fontWeight="bold" className="animate-pulse" style={{animationDelay: '0.7s'}}>0</text>
        <text x="85" y="110" fill="url(#numberGradient2)" fontSize="30" fontWeight="bold" className="animate-pulse" style={{animationDelay: '1.2s'}}>1</text>
        <text x="125" y="105" fill="url(#numberGradient1)" fontSize="26" fontWeight="bold" className="animate-pulse" style={{animationDelay: '1.7s'}}>0</text>
        <text x="100" y="130" fill="url(#numberGradient3)" fontSize="24" fontWeight="bold" className="animate-pulse" style={{animationDelay: '2.2s'}}>1</text>

        {/* Lower Left Arc */}
        <text x="35" y="145" fill="url(#numberGradient2)" fontSize="18" fontWeight="bold" className="animate-pulse" style={{animationDelay: '0.4s'}}>0</text>
        <text x="25" y="165" fill="url(#numberGradient3)" fontSize="20" fontWeight="bold" className="animate-pulse" style={{animationDelay: '0.9s'}}>1</text>
        <text x="40" y="180" fill="url(#numberGradient1)" fontSize="22" fontWeight="bold" className="animate-pulse" style={{animationDelay: '1.4s'}}>0</text>

        {/* Lower Right Arc */}
        <text x="165" y="145" fill="url(#numberGradient1)" fontSize="20" fontWeight="bold" className="animate-pulse" style={{animationDelay: '0.7s'}}>1</text>
        <text x="175" y="165" fill="url(#numberGradient2)" fontSize="18" fontWeight="bold" className="animate-pulse" style={{animationDelay: '1.2s'}}>0</text>
        <text x="160" y="180" fill="url(#numberGradient3)" fontSize="22" fontWeight="bold" className="animate-pulse" style={{animationDelay: '1.7s'}}>1</text>

        {/* Bottom Arc */}
        <text x="65" y="185" fill="url(#numberGradient2)" fontSize="20" fontWeight="bold" className="animate-pulse" style={{animationDelay: '0.5s'}}>0</text>
        <text x="85" y="190" fill="url(#numberGradient1)" fontSize="18" fontWeight="bold" className="animate-pulse" style={{animationDelay: '1s'}}>1</text>
        <text x="105" y="185" fill="url(#numberGradient3)" fontSize="22" fontWeight="bold" className="animate-pulse" style={{animationDelay: '1.5s'}}>0</text>
        <text x="125" y="180" fill="url(#numberGradient2)" fontSize="20" fontWeight="bold" className="animate-pulse" style={{animationDelay: '2s'}}>1</text>
        <text x="140" y="175" fill="url(#numberGradient1)" fontSize="18" fontWeight="bold" className="animate-pulse" style={{animationDelay: '2.5s'}}>0</text>

        {/* Floating numbers for depth */}
        <text x="55" y="60" fill="url(#numberGradient3)" fontSize="16" fontWeight="bold" className="animate-float" style={{animationDelay: '0.1s'}} opacity="0.7">1</text>
        <text x="145" y="70" fill="url(#numberGradient1)" fontSize="14" fontWeight="bold" className="animate-float" style={{animationDelay: '0.6s'}} opacity="0.6">0</text>
        <text x="60" y="140" fill="url(#numberGradient2)" fontSize="16" fontWeight="bold" className="animate-float" style={{animationDelay: '1.1s'}} opacity="0.7">1</text>
        <text x="140" y="150" fill="url(#numberGradient3)" fontSize="14" fontWeight="bold" className="animate-float" style={{animationDelay: '1.6s'}} opacity="0.6">0</text>

        {/* Edge highlight */}
        <circle
          cx="100"
          cy="100"
          r="89"
          fill="none"
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="2"
          className="animate-pulse"
          style={{animationDelay: '0s', animationDuration: '3s'}}
        />
      </svg>
    </div>
  );
}
