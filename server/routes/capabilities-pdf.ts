import { RequestHandler } from "express";
import PDFDocument from "pdfkit";
import {
  siteConfig,
  getFullAddress,
  getPostalAddress,
} from "../../shared/companyProfile";
import {
  coreCompetencies,
  differentiators,
  projectHighlights,
  keyPersonnel,
  federalExperience,
  complianceProfile,
  strategicPartnerships,
  mentorProtegeHighlights,
  jointVenturePartner,
} from "../../shared/capabilities-data";

export const handleCapabilitiesPdf: RequestHandler = (_req, res) => {
  try {
    const doc = new PDFDocument({ margin: 30, size: "LETTER" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=onealgorithm-capabilities.pdf",
    );

    doc.on("error", (error) => {
      console.error("Error generating capabilities PDF", error);
      if (!res.headersSent) {
        res.status(500).end("Failed to generate PDF");
      } else {
        res.end();
      }
    });

    doc.pipe(res);

    const sectionHeading = (title: string) => {
      doc.moveDown(0.2);
      doc
        .fontSize(11)
        .fillColor("#0f172a")
        .text(title, { underline: true })
        .moveDown(0.15)
        .fillColor("#1f2937");
    };

    // Compact header
    doc
      .fontSize(14)
      .fillColor("#0f172a")
      .text(`${siteConfig.legalName} Capabilities Statement`, {
        align: "center",
      })
      .moveDown(0.2);

    doc
      .fontSize(10)
      .fillColor("#1e293b")
      .text("Modernizing Federal Systems Securely and Intelligently", {
        align: "center",
      })
      .moveDown(0.2);

    doc
      .fontSize(8)
      .fillColor("#0f172a")
      .text(
        `CAGE: ${siteConfig.identifiers.cage} | UEI: ${siteConfig.identifiers.uei} | D-U-N-S: ${siteConfig.identifiers.duns}`,
        { align: "center" },
      )
      .moveDown(0.15);

    doc
      .fontSize(8)
      .fillColor("#0f172a")
      .text(
        `${siteConfig.url} | ${siteConfig.contact.emailPrimary} | ${siteConfig.contact.phonePrimary} | ${getFullAddress()}`,
        { align: "center" },
      )
      .moveDown(0.2);

    sectionHeading("Company Overview");
    doc
      .fontSize(8)
      .fillColor("#1f2937")
      .text(siteConfig.description, { lineGap: -1 })
      .moveDown(0.15);

    sectionHeading("Core Competencies");
    coreCompetencies.forEach((competency) => {
      doc
        .fontSize(9)
        .fillColor("#0f172a")
        .text(competency.title)
        .fontSize(7.5)
        .fillColor("#1f2937")
        .list(competency.items, {
          bulletRadius: 1.5,
          textIndent: 12,
          bulletIndent: 8,
          lineGap: -1,
        })
        .moveDown(0.15);
    });

    sectionHeading("Differentiators");
    differentiators.forEach((item) => {
      doc
        .fontSize(8)
        .fillColor("#0f172a")
        .text(`${item.title}: `, { continued: true })
        .fontSize(7.5)
        .fillColor("#1f2937")
        .text(item.description, { lineGap: -1 });
    });
    doc.moveDown(0.15);

    sectionHeading("Federal Contract Experience");
    federalExperience.forEach((item) => {
      doc
        .fontSize(8)
        .fillColor("#0f172a")
        .text(`${item.title} (${item.rfq}) - ${item.role}`, { lineGap: -1 })
        .fontSize(7.5)
        .fillColor("#1f2937");
      if (item.partner) {
        doc.text(item.partner, { lineGap: -1 });
      }
      doc.text(`${item.submissionDate} — ${item.status}`, { lineGap: -1 });
    });
    doc.moveDown(0.15);

    sectionHeading("Mentor-Protégé & Partnership Readiness");
    doc.fontSize(7.5).fillColor("#1f2937");
    mentorProtegeHighlights.forEach((item) => {
      doc.text(`• ${item.title}: ${item.description}`, { lineGap: -1 });
    });
    doc.moveDown(0.15);

    sectionHeading("Active SBA-Compliant Joint Venture");
    doc
      .fontSize(8)
      .fillColor("#0f172a")
      .text(jointVenturePartner.name)
      .fontSize(7.5)
      .fillColor("#1f2937")
      .text(`${jointVenturePartner.cage} | ${jointVenturePartner.uei} | ${jointVenturePartner.samStatus} | ${jointVenturePartner.certifications}`, { lineGap: -1 })
      .text(`Services: ${jointVenturePartner.services.join(", ")}`, { lineGap: -1 })
      .moveDown(0.15);

    sectionHeading("Commercial Project Highlights");
    projectHighlights.forEach((project) => {
      doc
        .fontSize(8)
        .fillColor("#0f172a")
        .text(project.title)
        .fontSize(7.5)
        .fillColor("#1f2937")
        .list(project.items, {
          bulletRadius: 1.5,
          textIndent: 12,
          bulletIndent: 8,
          lineGap: -1,
        })
        .moveDown(0.1);
    });

    sectionHeading("Compliance & Certifications");
    doc.fontSize(7.5).fillColor("#1f2937");
    doc.text(`Pending: ${complianceProfile.pendingCertifications.join(", ")}`, { lineGap: -1 });
    doc.text(`Federal: ${complianceProfile.federalCompliance.join(", ")}`, { lineGap: -1 });
    doc.text(`Security: ${complianceProfile.qualityAndSecurity.join(", ")}`, { lineGap: -1 });
    doc.text(`Bonding: ${complianceProfile.bondingCapacity} | SAM: ${complianceProfile.samRegistration}`, { lineGap: -1 });
    if (siteConfig.certifications?.length) {
      doc.text(`Industry Certs: ${siteConfig.certifications.join(", ")}`, { lineGap: -1 });
    }
    doc.moveDown(0.15);

    sectionHeading("Strategic Partnerships");
    doc.fontSize(7.5).fillColor("#1f2937");
    strategicPartnerships.forEach((note) => {
      doc.text(`• ${note}`, { lineGap: -1 });
    });
    doc.moveDown(0.15);

    sectionHeading("Key Personnel");
    keyPersonnel.forEach((person) => {
      doc
        .fontSize(8)
        .fillColor("#0f172a")
        .text(`${person.name} — ${person.role}`, { continued: true })
        .fontSize(7.5)
        .fillColor("#1f2937")
        .text(` - ${person.summary}`, { lineGap: -1 });
      if (person.email || person.phone) {
        const contact = [person.email, person.phone].filter(Boolean).join(" | ");
        doc.text(contact, { lineGap: -1 });
      }
    });
    doc.moveDown(0.15);

    sectionHeading("NAICS & PSC Codes");
    doc.fontSize(7.5).fillColor("#1f2937");
    doc.text(`NAICS: ${siteConfig.codes.naics.join(", ")}`, { lineGap: -1 });
    doc.text(`PSC: ${siteConfig.codes.psc.join(", ")}`, { lineGap: -1 });

    doc.end();
  } catch (error) {
    console.error("Unhandled error generating PDF", error);
    res.status(500).json({ message: "Unable to generate PDF" });
  }
};
