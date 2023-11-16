import { FC, useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import AnimatedNumbers from "react-animated-numbers";
import FlipNumbers from "react-flip-numbers";
import { Badge } from "antd";
import "./AnimatedDigitsLarge.css";

interface AnimatedDigitsLargeProps {
  count: number;
  size: number;
}

const AnimatedDigitsLarge: FC<AnimatedDigitsLargeProps> = ({ count, size }) => {
  const [currentCount, setCurrentCount] = useState(count);

  // const digits = count.toString().split("").map(Number);
  useEffect(() => {
    console.log("MAALAK");
  });
  // console.log("DIGITS", digits);
  return (
    <>
      <FlipNumbers
        numbers={count.toString()}
        height={size}
        width={size * (2.0 / 3)}
        color="var(--dark-green)"
        background="transparent"
        play
      />
    </>
  );
};

export default AnimatedDigitsLarge;
