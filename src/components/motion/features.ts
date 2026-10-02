// Loaded on demand by <LazyMotion> in providers.tsx, so Motion's animation
// engine stays out of the first JavaScript the page needs. `domMax` (not
// `domAnimation`) because the nav highlights use `layoutId` animations.
import { domMax } from "motion/react";

export default domMax;
