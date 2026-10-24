import * as React from "react";
import { EvidenceDialog } from "./EvidenceDialog";
import type { SfCityHero } from "../../data/sfCityHeroes";

/**
 * The photo-credits pop-up for a city hero (CC BY / BY-SA require the author and the licence to be named).
 * Full credit line, licence name and licence URL as text, "cropped, resized", the Commons file page as text. The
 * one off-site control is the licence deed in a new tab. Render once per city page; the hero chip opens it.
 *   <PhotoCreditDialog photo={SF_CITY_HEROES.dallas} />
 * Also render <PhotoCreditsLine photo={…} /> at the end of the page body (never below the footer).
 */
export function PhotoCreditDialog({ photo }: { photo: SfCityHero }) {
  const commons = photo.source.replace(/^https?:\/\//, "");
  return (
    <EvidenceDialog
      id="photo-credit"
      title="Photo credit"
      intro={photo.alt}
      rows={[
        { th: "Credit", td: photo.credit },
        { th: "License", td: photo.licence + (photo.licenceUrl ? ` · ${photo.licenceUrl.replace(/^https?:\/\//, "")}` : "") },
        { th: "Source", td: decodeURIComponent(commons) },
        { th: "Changes", td: "cropped to 16:9, resized" },
      ]}
      external={photo.licenceUrl ? { href: photo.licenceUrl, label: "Read the license" } : undefined}
    />
  );
}

/** One-line photo credit for the end of a city page's body. */
export function PhotoCreditsLine({ photo }: { photo: SfCityHero }) {
  return (
    <div className="sf-wrap">
      <p className="sf-credits sf-mono">
        Hero photograph: {photo.credit.replace(/^Photo: /, "")}
        {photo.licenceUrl ? ` · ${photo.licenceUrl.replace(/^https?:\/\//, "")}` : ""}
      </p>
    </div>
  );
}
