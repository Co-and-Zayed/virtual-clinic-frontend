import { FC } from "react";
import { useNav } from "Pharmacy/hooks/useNav";
import { useSelector, useDispatch } from "react-redux";
import { Jelly } from "@uiball/loaders";

import SideBar from "../SideBar/SideBar";

interface JellyLoaderProps {
  color?: any;
}

const JellyLoader: FC<JellyLoaderProps> = ({ color }) => {
  return <Jelly size={30} speed={0.9} color={color ?? "var(--dark-green)"} />;
};

export default JellyLoader;
