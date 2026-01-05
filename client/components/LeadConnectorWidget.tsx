import * as React from "react";

export function LeadConnectorWidget() {
  React.useEffect(() => {
    try {
      const host = window.location.hostname;
      const allowedHosts = ["onealgorithm.com", "www.onealgorithm.com"];
      if (!allowedHosts.includes(host)) return;

      const existing = document.getElementById("leadconnector-widget-loader");
      if (existing) return;

      const loadWidget = () => {
        if (document.getElementById("leadconnector-widget-loader")) return;
        const script = document.createElement("script");
        script.id = "leadconnector-widget-loader";
        script.src = "https://widgets.leadconnectorhq.com/loader.js";
        script.async = true;
        script.setAttribute(
          "data-resources-url",
          "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
        );
        script.setAttribute("data-widget-id", "68dd809b2129ad0fae082299");
        script.onerror = () => {};
        document.body.appendChild(script);
      };

      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(loadWidget, { timeout: 4000 });
      } else {
        (window as Window).addEventListener(
          "load",
          () => setTimeout(loadWidget, 2000),
          {
            once: true,
          },
        );
      }
    } catch (_) {}
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
