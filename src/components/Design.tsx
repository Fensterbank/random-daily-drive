import { useMediaQuery } from "@material-ui/core";
import { FC } from "react";

export const Design: FC = () => {
  const isBig = useMediaQuery((theme: any) => theme.breakpoints.up('sm'));
  
  return <>
      {isBig && <div className="design" id="left-image" />}
      <div className="design" id="right-image" />
  </>
};