import { Slide, Snackbar } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import React from "react";

export const SlidingUpTransition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
