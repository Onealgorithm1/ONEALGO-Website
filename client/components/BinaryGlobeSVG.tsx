import React from "react";

import { cn } from "@/lib/utils";
import styles from "./BinaryGlobeSVG.module.css";

interface BinaryGlobeSVGProps {
  size?: number;
  className?: string;
}

/**
 * The globe that stands in for the "o" in the wordmark.
 *
 * This was loading `/globe-logo.png` - a 512x512, 315KB PNG - to fill a box
 * between 20 and 44 pixels wide, eagerly, in the header and footer of every
 * page. It was the single heaviest asset on the site and roughly 95% of those
 * bytes were being thrown away by the downscale.
 *
 * It now loads a 128px derivative (15KB webp, 25KB png fallback), which still
 * covers a 44px box at 3x device pixel ratio. The original 512px PNG is kept
 * because index.html cites it as the Organization logo in JSON-LD, where a
 * larger image is the right choice - it is simply no longer downloaded to
 * render a 30px glyph.
 */
export default function BinaryGlobeSVG({
  size = 32,
  className = "",
}: BinaryGlobeSVGProps) {
  return (
    // inline-flex so the extra <picture> wrapper does not disturb the
    // wordmark's inline-flex row - global CSS sets img { display: block }.
    <picture className="inline-flex self-center">
      <source srcSet="/globe-logo-128.webp" type="image/webp" />
      <img
        src="/globe-logo-128.png"
        alt="o"
        width={size}
        height={size}
        className={cn(
          "inline-block self-center mx-0",
          styles.binaryGlobeImage,
          className,
        )}
        loading="eager"
        decoding="async"
        /* This 30x30 logo is the Largest Contentful Paint element on pages
           whose hero paints late — Lighthouse names it directly on
           /services/website-development and flags the missing priority hint.
           It costs nothing on pages where it is not the LCP. */
        fetchPriority="high"
      />
    </picture>
  );
}
