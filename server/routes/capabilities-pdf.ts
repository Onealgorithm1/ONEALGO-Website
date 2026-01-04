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
    const doc = new PDFDocument({ margin: 50 });

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
      doc.moveDown(0.5);
      doc
        .fontSize(16)
        .fillColor("#0f172a")
        .text(title, { underline: true })
        .moveDown(0.3)
        .fillColor("#1f2937");
    };

    doc
      .fontSize(22)
      .fillColor("#0f172a")
      .text(`${siteConfig.legalName} Capabilities Statement`, {
        align: "center",
      })
      .moveDown(0.5);

    doc
      .fontSize(14)
      .fillColor("#1e293b")
      .text("Modernizing Federal Systems Securely and Intelligently", {
        align: "center",
      })
      .moveDown(0.5);

    doc
      .fontSize(12)
      .fillColor("#0f172a")
      .text(
        `CAGE: ${siteConfig.identifiers.cage}  |  UEI: ${siteConfig.identifiers.uei}  |  D-U-N-S: ${siteConfig.identifiers.duns}`,
        { align: "center" },
      )
      .moveDown();

    doc
      .fontSize(11)
      .fillColor("#0f172a")
      .text(`Website: ${siteConfig.url}`)
      .text(`Email: ${siteConfig.contact.emailPrimary}`)
      .text(`Phone: ${siteConfig.contact.phonePrimary}`)
      .text(`Address: ${getFullAddress()}`)
      .text(`Mailing Address: ${getPostalAddress().replace("\n", ", ")}`)
      .moveDown();

    sectionHeading("Company Overview");
    doc
      .fontSize(11)
      .fillColor("#1f2937")
      .text(siteConfig.description)
      .moveDown();

    sectionHeading("Core Competencies");
    coreCompetencies.forEach((competency) => {
      doc
        .fontSize(13)
        .fillColor("#0f172a")
        .text(competency.title)
        .fontSize(11)
        .fillColor("#1f2937")
        .list(competency.items, {
          bulletRadius: 2,
          textIndent: 20,
          bulletIndent: 10,
        })
        .moveDown(0.5);
    });

    sectionHeading("Differentiators");
    differentiators.forEach((item) => {
      doc
        .fontSize(13)
        .fillColor("#0f172a")
        .text(item.title)
        .fontSize(11)
        .fillColor("#1f2937")
        .text(item.description)
        .moveDown(0.5);
    });

    sectionHeading("Federal Contract Experience");
    federalExperience.forEach((item) => {
      doc
        .fontSize(13)
        .fillColor("#0f172a")
        .text(`${item.title} (${item.rfq})`)
        .fontSize(11)
        .fillColor("#1f2937")
        .text(item.role);
      if (item.partner) {
        doc.text(item.partner);
      }
      doc
        .text(item.scope)
        .text(`${item.submissionDate} — ${item.status}`)
        .moveDown(0.5);
    });

    sectionHeading("Mentor-Protégé & Partnership Readiness");
    mentorProtegeHighlights.forEach((item) => {
      doc
        .fontSize(13)
        .fillColor("#0f172a")
        .text(item.title)
        .fontSize(11)
        .fillColor("#1f2937")
        .text(item.description)
        .moveDown(0.3);
    });

    sectionHeading("Active SBA-Compliant Joint Venture");
    doc
      .fontSize(13)
      .fillColor("#0f172a")
      .text(jointVenturePartner.name)
      .fontSize(11)
      .fillColor("#1f2937")
      .text(jointVenturePartner.summary)
      .moveDown(0.3)
      .text(`Address: ${jointVenturePartner.address}`)
      .text(`${jointVenturePartner.cage}  |  ${jointVenturePartner.uei}`)
      .text(jointVenturePartner.samStatus)
      .text(jointVenturePartner.certifications)
      .moveDown(0.3)
      .text("Core Services:");
    doc.list(jointVenturePartner.services, {
      bulletRadius: 2,
      textIndent: 20,
      bulletIndent: 10,
    });
    doc
      .moveDown(0.3)
      .text(`Website: ${jointVenturePartner.website}`)
      .moveDown(0.5);

    sectionHeading("Commercial Project Highlights");
    projectHighlights.forEach((project) => {
      doc
        .fontSize(13)
        .fillColor("#0f172a")
        .text(project.title)
        .fontSize(11)
        .fillColor("#1f2937")
        .list(project.items, {
          bulletRadius: 2,
          textIndent: 20,
          bulletIndent: 10,
        })
        .moveDown(0.5);
    });

    sectionHeading("Compliance & Certifications");
    doc.fontSize(11).fillColor("#1f2937").text("Pending Certifications:");
    doc.list(complianceProfile.pendingCertifications, {
      bulletRadius: 2,
      textIndent: 20,
      bulletIndent: 10,
    });
    doc.text("Federal Compliance:");
    doc.list(complianceProfile.federalCompliance, {
      bulletRadius: 2,
      textIndent: 20,
      bulletIndent: 10,
    });
    doc.text("Quality & Security Programs:");
    doc.list(complianceProfile.qualityAndSecurity, {
      bulletRadius: 2,
      textIndent: 20,
      bulletIndent: 10,
    });
    doc
      .moveDown(0.3)
      .text(`Bonding Capacity: ${complianceProfile.bondingCapacity}`)
      .text(`SAM Registration: ${complianceProfile.samRegistration}`)
      .text(
        `CAGE: ${siteConfig.identifiers.cage}  |  UEI: ${siteConfig.identifiers.uei}  |  D-U-N-S: ${siteConfig.identifiers.duns}`,
      );
    if (siteConfig.certifications?.length) {
      doc.text("Industry Certifications:");
      doc.list(siteConfig.certifications, {
        bulletRadius: 2,
        textIndent: 20,
        bulletIndent: 10,
      });
    }

    sectionHeading("Strategic Partnerships");
    strategicPartnerships.forEach((note) => {
      doc.fontSize(11).fillColor("#1f2937").text(note).moveDown(0.3);
    });

    sectionHeading("Key Personnel / Consultants");
    keyPersonnel.forEach((person) => {
      doc
        .fontSize(13)
        .fillColor("#0f172a")
        .text(`${person.name} — ${person.role}`)
        .fontSize(11)
        .fillColor("#1f2937")
        .text(person.summary);
      if (person.email) {
        doc.text(`Email: ${person.email}`);
      }
      if (person.phone) {
        doc.text(`Phone: ${person.phone}`);
      }
      doc.moveDown(0.3);
    });

    sectionHeading("NAICS & PSC Codes");
    doc.fontSize(11).fillColor("#1f2937").text("NAICS Codes:");
    doc.list(siteConfig.codes.naics, {
      bulletRadius: 2,
      textIndent: 20,
      bulletIndent: 10,
    });
    doc.text("PSC Codes:");
    doc.list(siteConfig.codes.psc, {
      bulletRadius: 2,
      textIndent: 20,
      bulletIndent: 10,
    });

    doc.end();
  } catch (error) {
    console.error("Unhandled error generating PDF", error);
    res.status(500).json({ message: "Unable to generate PDF" });
  }
};
