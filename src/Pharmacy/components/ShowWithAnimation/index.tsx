import React, { useEffect, useState } from "react";
import "./style.css";

interface IndexProps {
  children: React.ReactNode;
  isMounted: boolean;
}

function useDelayUnmount(isMounted: boolean, delayTime: number): boolean {
  const [showDiv, setShowDiv] = useState(false);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (isMounted && !showDiv) {
      setShowDiv(true);
    } else if (!isMounted && showDiv) {
      timeoutId = setTimeout(() => setShowDiv(false), delayTime); // Delay our unmount
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isMounted, delayTime, showDiv]);
  return showDiv;
}

const Index: React.FC<IndexProps> = ({ children, isMounted }) => {
  const showDiv = useDelayUnmount(isMounted, 450);
  const mountedStyle: React.CSSProperties = {
    animation: "inAnimation 450ms ease-in",
  };
  const unmountedStyle: React.CSSProperties = {
    animation: "outAnimation 470ms ease-out",
    animationFillMode: "forwards",
  };
  return (
    <div>
      {showDiv && (
        <div style={isMounted ? mountedStyle : unmountedStyle}>{children}</div>
      )}
    </div>
  );
};

export default Index;
