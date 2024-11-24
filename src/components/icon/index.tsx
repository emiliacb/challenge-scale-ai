import React from "react";
import { ForwardIcon } from "./icons/foward";
import { BackwardIcon } from "./icons/backward";
import { PlayIcon } from "./icons/play";
import { PauseIcon } from "./icons/pause";

type IconProps = {
  id: string;
  className?: string;
};

const icons = {
  forward: ForwardIcon,
  backward: BackwardIcon,
  play: PlayIcon,
  pause: PauseIcon,
} as Record<string, React.FC<IconProps>>;

export function Icon(props: IconProps) {
  const IconComponent = icons[props.id];

  if (!IconComponent) {
    console.warn(`Icon with id "${props.id}" not found`);
    return null;
  }

  return <IconComponent {...props} />;
}
