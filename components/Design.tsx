import React, { FC } from 'react';

import { useMediaQuery } from '@material-ui/core';

const Design: FC = () => {
  const isBig = useMediaQuery((theme: any) => theme.breakpoints.up('sm'));
  
  return <>
      {isBig && <div className="design" id="left-image" />}
      <div className="design" id="right-image" />
  </>
};

export default Design;