import * as React from "react";
import type { SVGProps } from "react";
const SvgLockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 17 18"
    {...props}
  >
    <path
      fill="#163B45"
      d="M6.114 11.988a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm3 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm3 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
    <path
      stroke="#163B45"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M3.864 7.489v-1.5c0-.255.021-.506.063-.75m8.937 2.25v-1.5A4.5 4.5 0 0 0 4.99 3.012M7.614 16.49h-2.25c-2.12 0-3.182 0-3.84-.66-.66-.658-.66-1.72-.66-3.84 0-2.121 0-3.182.66-3.84.658-.66 1.72-.66 3.84-.66h6c2.121 0 3.182 0 3.84.66.66.658.66 1.719.66 3.84 0 2.12 0 3.182-.66 3.84-.658.66-1.719.66-3.84.66h-.75"
    />
  </svg>
);
export default SvgLockIcon;
