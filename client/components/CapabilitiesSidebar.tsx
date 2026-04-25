import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ExternalLink } from "lucide-react";
import { siteConfig } from "../lib/siteConfig";
import { getFullAddress } from "../../shared/companyProfile";
import {
  registrations,
  procurementRegistrations,
} from "../../shared/capabilities-data";

export default function CapabilitiesSidebar() {
  return (
    <div className="space-y-6">
      {/* Company Branding */}
      <div className="bg-onealgo-orange-500 rounded-lg p-6 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">One Algorithm LLC</h3>
        <p className="text-sm text-orange-100 mb-4">
          Empowering Federal Modernization through intelligent, Secure, and Accessible Solutions
        </p>
      </div>

      {/* CAGE, UEI, DUNS */}
      <Card className="bg-white border-2 border-onealgo-orange-500">
        <CardHeader>
          <CardTitle className="text-onealgo-blue-950 text-sm">
            Key Identifiers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>CAGE:</strong> {siteConfig.identifiers.cage}
          </p>
          <p>
            <strong>UEI:</strong> {siteConfig.identifiers.uei}
          </p>
          <p>
            <strong>D-U-N-S:</strong> {siteConfig.identifiers.duns}
          </p>
        </CardContent>
      </Card>

      {/* Registrations */}
      <Card className="bg-white border-2 border-onealgo-orange-500">
        <CardHeader>
          <CardTitle className="text-onealgo-blue-950 text-sm">
            Registrations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-700">
          <div>
            <p className="font-semibold text-onealgo-blue-950">EDWOSB</p>
            <p>{registrations.edwosb}</p>
          </div>
          <div>
            <p className="font-semibold text-onealgo-blue-950">WBENC</p>
            <p className="text-xs">WBE: {registrations.wbenc.wbe}</p>
            <p className="text-xs">WOSB: {registrations.wbenc.wosb}</p>
          </div>
          <div>
            <p className="font-semibold text-onealgo-blue-950">SDB & SB</p>
            <p>{registrations.sdb_sb}</p>
          </div>
          <div>
            <p className="font-semibold text-onealgo-blue-950">NMSDC MBE</p>
            <p>{registrations.nmsdc_mbe}</p>
          </div>
          <div>
            <p className="font-semibold text-onealgo-blue-950">VA SWaM</p>
            <p>{registrations.va_swam}</p>
          </div>
        </CardContent>
      </Card>

      {/* Procurement */}
      <Card className="bg-white border-2 border-onealgo-orange-500">
        <CardHeader>
          <CardTitle className="text-onealgo-blue-950 text-sm">
            Procurement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <p className="font-semibold text-onealgo-blue-950 mb-2">Federal</p>
            <ul className="space-y-1 text-gray-700 text-xs">
              <li>
                <strong>SAM.gov UEI:</strong> {procurementRegistrations.federal.sam_gov}
              </li>
              <li>
                <strong>FedConnect:</strong> {procurementRegistrations.federal.fedConnect}
              </li>
              <li>
                <strong>GSA eBuy:</strong> {procurementRegistrations.federal.gsa_ebuy}
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-onealgo-blue-950 mb-2">State & Local</p>
            <ul className="space-y-1 text-gray-700 text-xs">
              {procurementRegistrations.stateAndLocal.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}:</strong> {item.value}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* NAICS Codes */}
      <Card className="bg-white border-2 border-onealgo-orange-500">
        <CardHeader>
          <CardTitle className="text-onealgo-blue-950 text-sm">
            NAICS Codes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-gray-700 mb-3">
            <strong>Primary:</strong> 541511
          </p>
          <div className="grid grid-cols-2 gap-2">
            {siteConfig.codes.naics.map((code) => (
              <div
                key={code}
                className="bg-onealgo-light px-2 py-1 rounded text-center font-mono text-xs"
              >
                {code}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PSC Codes */}
      <Card className="bg-white border-2 border-onealgo-orange-500">
        <CardHeader>
          <CardTitle className="text-onealgo-blue-950 text-sm">
            PSC Codes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {siteConfig.codes.psc.map((code) => (
              <div
                key={code}
                className="bg-onealgo-light px-2 py-1 rounded text-center font-mono text-xs"
              >
                {code}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-white border-2 border-onealgo-orange-500">
        <CardHeader>
          <CardTitle className="text-onealgo-blue-950 text-sm">
            Contact Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-700">
          <div>
            <p className="font-semibold text-onealgo-blue-950 mb-1">Address</p>
            <p className="text-xs leading-relaxed">
              {getFullAddress(true).replace(" | ", "\n")}
            </p>
          </div>
          <div>
            <p className="font-semibold text-onealgo-blue-950 mb-1">Phone</p>
            <p className="text-xs">{siteConfig.contact.phonePrimary}</p>
          </div>
          <div>
            <p className="font-semibold text-onealgo-blue-950 mb-1">Email</p>
            <p className="text-xs break-all">
              {siteConfig.contact.emailPrimary}
            </p>
          </div>
          <a
            href={siteConfig.sbaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-onealgo-orange-500 hover:underline text-xs font-semibold mt-2"
          >
            View SBA Profile
            <ExternalLink className="w-3 h-3" />
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
