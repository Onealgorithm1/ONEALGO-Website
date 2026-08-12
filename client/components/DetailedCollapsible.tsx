import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DetailedCollapsibleProps {
  title: string;
  summary: string;
  details: string[];
}

export default function DetailedCollapsible({ title, summary, details }: DetailedCollapsibleProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4">
      <p className="text-gray-600 mb-4">{summary}</p>
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-onealgo-blue-950 hover:text-oa-orangeText transition-colors text-sm font-medium w-full text-left"
      >
        <span className="font-bold">Learn More</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isExpanded && (
        <div className="mt-4 space-y-3 text-sm text-gray-600 animate-fade-in-up bg-gray-50 p-4 rounded-lg">
          {details.map((detail, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-2 h-2 bg-onealgo-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>{detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
