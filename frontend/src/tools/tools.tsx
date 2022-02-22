import { Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import React from "react";

export const SlidingUpTransition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string) {
  let fName = name.split(" ")[0][0].toUpperCase();
  let lName = "";
  if (name.split(" ").length > 1) lName = name.split(" ")[1][0].toUpperCase();
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${fName}${lName}`,
  };
}
