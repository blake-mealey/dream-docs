import React from 'react';
import LayoutTemplate from './layout';
// import { RedocStandalone } from 'redoc';

const GuideTemplate = ({ pageContext }) => {
  const { openApi } = pageContext;

  return (
    <LayoutTemplate>
      Open API
      {/* <RedocStandalone specUrl={openApi.url} /> */}
    </LayoutTemplate>
  );
};

export default GuideTemplate;
