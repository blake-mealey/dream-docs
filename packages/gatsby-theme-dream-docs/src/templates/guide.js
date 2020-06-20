import React from 'react';
import LayoutTemplate from './layout';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const GuideTemplate = ({ pageContext }) => {
  const { mdx } = pageContext;

  return (
    <LayoutTemplate>
      This is a guide!
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </LayoutTemplate>
  );
};

export default GuideTemplate;
