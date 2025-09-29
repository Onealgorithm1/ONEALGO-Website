import React from "react";

interface JSONLDScriptProps {
  data: any;
}

export function JSONLDScript({ data }: JSONLDScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
