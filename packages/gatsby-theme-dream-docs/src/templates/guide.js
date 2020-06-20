import React from 'react';
import LayoutTemplate from './layout';

const GuideTemplate = ({ children }) => {
  return (
    <LayoutTemplate>
      This is a guide!
      {children}
    </LayoutTemplate>
  );
};

export default GuideTemplate;
