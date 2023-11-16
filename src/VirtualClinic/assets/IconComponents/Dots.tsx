import * as React from "react";
import type { SVGProps } from "react";
const SvgDots = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 5 15"
    {...props}
  >
    <path
      fill="currentColor"
      d="M2.616 14.661a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2.616 9.661a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2.616 4.661a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
    />
  </svg>
);
export default SvgDots;
