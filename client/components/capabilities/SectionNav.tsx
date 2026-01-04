import { cn } from "@/lib/utils";
import * as React from "react";

export interface SectionNavItem {
  id: string;
  label: string;
}

interface SectionNavProps {
  sections: SectionNavItem[];
  className?: string;
  sticky?: boolean;
}

export function SectionNav({ sections, className, sticky = true }: SectionNavProps) {
  const [activeId, setActiveId] = React.useState<string>(sections[0]?.id ?? "");

  React.useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -45%",
        threshold: 0.2,
      },
    );

    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => Boolean(el));

    targets.forEach((el) => observer.observe(el));

    return () => {
      targets.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [sections]);

  const handleClick = React.useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const headerOffset = 96; // account for sticky site header
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({ top: Math.max(offsetPosition, 0), behavior: "smooth" });
  }, []);

  return (
    <nav
      className={cn(
        "rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur",
        sticky && "sticky top-24",
        className,
      )}
      aria-label="Capabilities page sections"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
        On this page
      </p>
      <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => handleClick(section.id)}
            className={cn(
              "w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
              activeId === section.id
                ? "bg-onealgo-blue-50 text-onealgo-blue-900"
                : "text-gray-600 hover:bg-gray-100",
            )}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
