import * as React from "react";
import { Verify } from "../sf";
import { RegionPlate } from "./RegionPlate";
import { NAP } from "../../data/wd-local/shared";
import type { LocalPlace } from "../../data/wd-local/types";
import type { PlacePhoto } from "../../data/wd-local/photos";

/*
 * The place banner under the hero (place pages): the place's licensed 16:9 photograph (the photo agent's
 * client/data/wd-local/photos.ts, AVIF + WebP 2400/1600, alt names the place) with a credit chip that opens the in-site
 * credits pop-up (PhotoCreditDialog, id "photo-credit"). A slug with no photo yet renders the RegionPlate schematic
 * instead (listed as TKTK-photo in build-wave12/place-pages.md). Never animated; eager + high priority (it can be the
 * LCP at 390).
 *   <LocalBanner place={place} photo={placePhoto(place)} />
 */
// import.meta.glob, not a static import: the page still builds while photos.ts is missing (the photo agent writes it).
const mods = import.meta.glob<{ PLACE_PHOTOS: Record<string, PlacePhoto> }>("../../data/wd-local/photos.ts", { eager: true });
const nw = import.meta.glob<{ PLACE_PHOTOS_NW: Record<string, PlacePhoto> }>("../../data/wd-local/photos-nw.ts", { eager: true });
const PHOTOS: Record<string, PlacePhoto> = { ...(Object.values(mods)[0]?.PLACE_PHOTOS ?? {}), ...(Object.values(nw)[0]?.PLACE_PHOTOS_NW ?? {}) };

export const placePhoto = (place: LocalPlace): PlacePhoto | undefined => (place.photo ? PHOTOS[place.photo] : undefined);

export function LocalBanner({ place, photo }: { place: LocalPlace; photo?: PlacePhoto }) {
  if (!photo) {
    return (
      <div className="sf-wrap wd-local-banner wd-local-banner-plate">
        <RegionPlate fig={1} counties={[place.name, "Malvern, PA"]} officeTile={1} office={{ l1: NAP.l1, l2: NAP.l2 }}
          stamp={`${place.name} and the office · schematic, not to scale`}
          caption={`Schematic: ${place.name}, worked remotely from our office at ${NAP.l1}, ${NAP.l2}.`} />
      </div>
    );
  }
  const credit = photo.credit.replace(/^Photo: /, "").split(" / ")[0];
  return (
    <figure className="sf-wrap wd-local-banner" style={{ "--fx": `${photo.focal.x}%`, "--fy": `${photo.focal.y}%` } as React.CSSProperties}>
      <picture>
        <source type="image/avif" srcSet={`${photo.avif1600} 1600w, ${photo.avif2400} 2400w`} sizes="(min-width: 1440px) 1376px, 100vw" />
        <source type="image/webp" srcSet={`${photo.webp1600} 1600w, ${photo.webp2400} 2400w`} sizes="(min-width: 1440px) 1376px, 100vw" />
        <img src={photo.webp1600} alt={photo.alt} width={photo.width} height={photo.height} loading="eager" decoding="async" {...({ fetchpriority: "high" } as Record<string, string>)} />
      </picture>
      <figcaption className="wd-local-credit">
        <Verify id="photo-credit">{`Photo: ${credit} · ${photo.licence}`}</Verify>
      </figcaption>
    </figure>
  );
}
