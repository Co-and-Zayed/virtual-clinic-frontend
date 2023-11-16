import * as React from "react";

const Icon = ({ size = 57, color = "currentColor", ...props }) => (
  <svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25Zm4.5 10.5h-3.75v3.75h-1.5v-3.75H7.5v-1.5h3.75V7.5h1.5v3.75h3.75v1.5Z" />
  </svg>
);

export default Icon;