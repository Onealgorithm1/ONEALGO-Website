import { LocalPage } from "../../components/wd/LocalPage";
import { PHILADELPHIA } from "../../data/wd-local/philadelphia";

/* Web design, Philadelphia. Rebuilt 2026-10-24 on the shared local template (copy + facts in data/wd-local/philadelphia.ts;
 * spec: onealgo-icm-oa/areas/sales/runs/2026-10-24_webdev-seo/structure-spec.md §7, §8.1). Review date 2027-01-24:
 * if Search Console shows no impressions on the target queries 90 days after release, noindex it (doorway rule D1). */
export default function WebDesignPhiladelphia() {
  return <LocalPage place={PHILADELPHIA} />;
}
