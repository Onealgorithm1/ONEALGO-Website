import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CollapsibleDetailsProps {
  learnMore: string;
  goDeeper: string;
}

export default function CollapsibleDetails({ learnMore, goDeeper }: CollapsibleDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-onealgo-blue-950 hover:text-oa-orangeText transition-colors text-sm font-medium italic"
      >
        <span className="font-bold italic">More Details</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isExpanded && (
        <div className="mt-3 space-y-2 text-sm text-gray-500 animate-fade-in-up">
          <p>
            <span className="font-bold italic">Learn more:</span> {learnMore}
          </p>
          <p>
            <span className="font-bold italic">Go deeper:</span> {goDeeper}
          </p>
        </div>
      )}
    </div>
  );
}
