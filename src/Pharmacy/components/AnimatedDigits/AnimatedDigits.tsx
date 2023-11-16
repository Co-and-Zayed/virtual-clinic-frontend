import { FC, useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Badge } from "antd";
import "./AnimatedDigits.css";

interface AnimatedDigitsProps {
  count: number;
  style?: any;
}

const AnimatedDigits: FC<AnimatedDigitsProps> = ({ count, style }) => {
  return (
    <Badge
      count={count}
      overflowCount={999999999999 * 2}
      style={{
        backgroundColor: "transparent",
        color: "var(--dark-green)",
        boxShadow: "none",
        transition: "all 1s ease-in-out",
        ...style,
      }}
    />
  );
};

export default AnimatedDigits;
