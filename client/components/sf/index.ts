/* Salesforce redesign v2: the component kit for the 23 /services/salesforce* routes.
 * Usage rules and the API list: onealgo-icm-oa/areas/sales/runs/2026-10-23_sf-audit/build-v2/foundation.md
 * Import from "@/components/sf" (and the figures from "@/components/sf/illus"). */
export { SfPage, SfButton, ExtLink, ArrowIcon, ChevronIcon, ExtIcon } from "./SfPage";
export { SFHero, sfHeroAvifSrcset, SF_HERO_SIZES } from "./SFHero";
export { SmartSection, SmartUnit, LedgerRule } from "./SmartSection";
export type { LeadIn, Tone } from "./SmartSection";
export { GoDeeper } from "./GoDeeper";
export { EvidenceDialog, SourcesDialog, Verify, AppExchangeEvidence, TrailblazerEvidence } from "./EvidenceDialog";
export type { EvidenceRow, SfSource } from "./EvidenceDialog";
export { PersonCredentials } from "./PersonCredentials";
export { Readouts, DeliveredLedger, APPEXCHANGE_READOUTS } from "./Readouts";
export type { Readout } from "./Readouts";
export { FAQ } from "./FAQ";
export type { SfFaqItem } from "./FAQ";
export { DeskCTA } from "./DeskCTA";
export { ServiceCards, HUB_SERVICE_CARDS } from "./ServiceCards";
export type { ServiceCard } from "./ServiceCards";
export { StageRail, StageUnits, HUB_STAGES } from "./StageRail";
export type { Stage, Station } from "./StageRail";
export { PhotoCreditDialog, PhotoCreditsLine } from "./PhotoCredit";
