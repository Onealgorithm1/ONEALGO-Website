import { LocalPage } from "../../components/wd/LocalPage";
import { CHESTER_COUNTY } from "../../data/wd-local/chester-county";

/* Web design, Chester County. Improved 2026-10-24 on the shared local template (copy + facts in
 * data/wd-local/chester-county.ts; spec: onealgo-icm-oa/areas/sales/runs/2026-10-24_webdev-seo/structure-spec.md §8, §8.1).
 * The page with momentum (808 impressions, page 1 for the custom cluster): the title is kept as it ranks. */
export default function WebDesignChesterCounty() {
  return <LocalPage place={CHESTER_COUNTY} />;
}
