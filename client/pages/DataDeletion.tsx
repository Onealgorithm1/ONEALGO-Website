import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { PageHero, Section, Prose, Card } from "../components/site";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import { siteConfig } from "../../shared/companyProfile";

/* Data deletion instructions — the "User data deletion" URL Meta requires for
   App Review of OA BPO Connector Hub (app 1400034042049945). Must load without
   a login. Styled exactly like /privacy (same primitives and class strings). */

const LAST_UPDATED = "October 13, 2026";
const HEADING = "text-h3 font-semibold text-oa-ink scroll-mt-24 pt-6";
const LIST = "list-disc space-y-2 pl-5 marker:text-oa-ink3";
const LINK =
  "text-oa-blue underline underline-offset-4 hover:text-oa-blue700 break-words";

export default function DataDeletion() {
  useSEO({
    title: "Data Deletion — OneAlgorithm",
    description:
      "How to have One Algorithm delete the comments, messages and identifiers we hold from Instagram and Facebook accounts we manage for clients.",
    canonical: getCanonicalUrl("/data-deletion"),
    ogTitle: "Data Deletion — OneAlgorithm",
    ogDescription: "How to request deletion of your data from One Algorithm's social inbox.",
    ogUrl: getCanonicalUrl("/data-deletion"),
    twitterTitle: "Data Deletion — OneAlgorithm",
    twitterDescription: "How to request deletion of your data from One Algorithm's social inbox.",
  });

  const { legalName, contact } = siteConfig;
  const mail = `mailto:${contact.emailPrimary}?subject=${encodeURIComponent("Data deletion")}`;

  return (
    <Layout>
      <PageHero
        eyebrow="Legal"
        title="Delete your data from One Algorithm's social inbox"
        meta={[
          { label: "Document", value: "Data Deletion Instructions" },
          { label: "Last updated", value: LAST_UPDATED },
        ]}
      />
      <Section tone="paper">
        <Prose>
          <p>
            If you commented on, or messaged, an Instagram or Facebook account
            that One Algorithm manages for a business, you can have every record
            we hold about you deleted. These are the user data deletion
            instructions for our app, OA BPO Connector Hub.
          </p>

          <h2 className={HEADING}>How to request deletion</h2>
          <Card>
            <p>
              Email{" "}
              <a href={mail} className={LINK}>
                {contact.emailPrimary}
              </a>{" "}
              with the subject <strong className="text-oa-ink">"Data deletion"</strong> and include:
            </p>
            <ul className={`${LIST} mt-3`}>
              <li>your Instagram username or Facebook name;</li>
              <li>the business account you commented on or messaged.</li>
            </ul>
          </Card>

          <h2 className={HEADING}>What we delete</h2>
          <ul className={LIST}>
            <li>your comments and the time they were posted;</li>
            <li>your username or name and the account ID the platform gave our app;</li>
            <li>our public replies and private replies to you, and any messages you sent;</li>
            <li>any notes or classifications attached to those records.</li>
          </ul>

          <h2 className={HEADING}>How long it takes</h2>
          <p>
            We delete your records from our systems within 30 days of your
            request and confirm by email when it is done.
          </p>

          <h2 className={HEADING}>Removing our app through Facebook</h2>
          <p>
            You can also remove our app's access from your Facebook account:
            go to Facebook <strong className="text-oa-ink">Settings &amp; Privacy</strong>{" "}
            &gt; <strong className="text-oa-ink">Settings</strong> &gt;{" "}
            <strong className="text-oa-ink">Apps and Websites</strong>, find
            OA BPO Connector Hub and select <strong className="text-oa-ink">Remove</strong>.
            To have the data we already hold deleted, email us as described above.
          </p>

          <h2 className={HEADING}>What this does not delete</h2>
          <p>
            Deleting your data from our systems does not remove comments you
            posted publicly on Instagram or Facebook. Delete those in the app
            itself. Meta's own handling of your data is covered by Meta's
            privacy policy.
          </p>

          <p>
            Our <Link to="/privacy" className={LINK}>Privacy Policy</Link> explains
            what we collect and why.
          </p>

          <div className="border-t border-oa-hairlineStrong pt-8">
            <p className="text-sm text-oa-ink3">
              © {new Date().getFullYear()} {legalName}. All rights reserved.
            </p>
          </div>
        </Prose>
      </Section>
    </Layout>
  );
}
