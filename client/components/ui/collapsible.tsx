import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CollapsibleProps {
  trigger: string;
  children: React.ReactNode;
  className?: string;
}

export function Collapsible({
  trigger,
  children,
  className = "",
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-oa-orangeText hover:text-oa-ink text-sm font-medium transition-colors mt-3"
      >
        {trigger}
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {isOpen && (
        <div className="mt-3 text-gray-600 text-sm leading-relaxed animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}
