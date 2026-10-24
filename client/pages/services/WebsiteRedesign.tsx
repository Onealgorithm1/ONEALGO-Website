import { ServicePage } from "../../data/wd-service/ServicePage";
import { WEBSITE_REDESIGN } from "../../data/wd-service/website-redesign";

/* /services/website-redesign: data in client/data/wd-service/website-redesign.ts (build-wave12). GATED: REDESIGN_CASE in
 * that file is null until Louis names which built site replaced an earlier one; one data edit turns the case on. */
export default function WebsiteRedesign() {
  return <ServicePage page={WEBSITE_REDESIGN} />;
}
