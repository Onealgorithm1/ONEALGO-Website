import React from "react";

export default function TrustedPartnerships() {
  const partners = [
    "Salesforce",
    "Monday",
    "HubSpot",
    "Zoho",
    "Zapier",
    "MuleSoft",
    "MS Dynamics",
    "Twilio",
    "Aircall",
    "QuickBooks",
    "DocuSign",
    "OneFlow",
    "Hootsuite",
    "Metricool",
  ];

  return (
    <div className="border-t border-blue-800 pt-8 mb-8">
      <p className="text-blue-200 text-sm text-center mb-6">
        <strong>Experts across leading platforms</strong>
      </p>

      {/* Partner Names Marquee */}
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll space-x-4">
          {/* First set of partners */}
          {partners.map((partner, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 bg-blue-800 hover:bg-blue-700 rounded-lg px-4 py-3 text-center transition-all duration-300 hover:scale-105 shadow-sm min-w-fit"
            >
              <span className="text-white text-sm font-medium whitespace-nowrap">
                {partner}
              </span>
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {partners.map((partner, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 bg-blue-800 hover:bg-blue-700 rounded-lg px-4 py-3 text-center transition-all duration-300 hover:scale-105 shadow-sm min-w-fit"
            >
              <span className="text-white text-sm font-medium whitespace-nowrap">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
