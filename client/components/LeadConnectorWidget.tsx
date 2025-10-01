import * as React from "react";

export function LeadConnectorWidget() {
  React.useEffect(() => {
    const existing = document.getElementById("leadconnector-widget-loader");
    if (existing) return;

    const script = document.createElement("script");
    script.id = "leadconnector-widget-loader";
    script.src = "https://widgets.leadconnectorhq.com/loader.js";
    script.async = true;
    script.setAttribute(
      "data-resources-url",
      "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
    );
    script.setAttribute("data-widget-id", "68dd809b2129ad0fae082299");

    document.body.appendChild(script);
  }, []);

  return (
    <div
      data-chat-widget
      data-widget-id="68dd809b2129ad0fae082299"
      data-location-id="n8dUmBLHwtHBId8N4RtV"
    />
  );
}

export default LeadConnectorWidget;
