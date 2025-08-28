import React from "react";

export default function TrustedPartnerships() {
  const partners = [
    "Salesforce", "Monday.com", "HubSpot", "Zoho", "Zapier", "MuleSoft", 
    "Microsoft Dynamics", "Twilio", "Aircall", "QuickBooks", "DocuSign", 
    "OneFlow", "Hootsuite", "Metricool"
  ];

  return (
    <div className="border-t border-blue-800 pt-8 mb-8">
      <p className="text-blue-200 text-sm text-center mb-6">
        <strong>Experts across leading platforms</strong>
      </p>
      
      {/* Partner Names Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="bg-blue-800 hover:bg-blue-700 rounded-lg px-4 py-3 text-center transition-all duration-300 hover:scale-105 shadow-sm"
          >
            <span className="text-white text-sm font-medium whitespace-nowrap">
              {partner}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
