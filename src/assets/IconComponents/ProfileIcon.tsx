import * as React from "react";
import type { SVGProps } from "react";
const SvgProfileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      stroke="#163B45"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1.864 14.267a3.75 3.75 0 0 1 3.75-3.75h7.5a3.75 3.75 0 0 1 3.75 3.75 1.875 1.875 0 0 1-1.875 1.875H3.74a1.875 1.875 0 0 1-1.875-1.875Z"
    />
    <path
      stroke="#163B45"
      strokeWidth={2}
      d="M9.364 6.767a2.812 2.812 0 1 0 0-5.625 2.812 2.812 0 0 0 0 5.625Z"
    />
  </svg>
);
export default SvgProfileIcon;
