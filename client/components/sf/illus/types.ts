/** Props shared by the eight staged-scene components. */
export type IllusProps = {
  /** The figure number printed in the stamp ("FIG. n · Staged scene · Sample data, not a client org"). Number figures in page order. */
  fig: number;
  /** Hero placement: ships with .js.in and --t0 .25s (CSS deals it 250ms after first paint, no JS on the critical path) and counters off. One per page. */
  hero?: boolean;
  className?: string;
};
