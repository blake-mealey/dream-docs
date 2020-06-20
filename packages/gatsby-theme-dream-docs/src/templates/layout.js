import React from 'react';
/** @jsx jsx */
import { jsx, Box, Heading, Flex, NavLink } from 'theme-ui';
import { Link, useStaticQuery, graphql } from 'gatsby';

const LayoutTemplate = ({ children }) => {
  const result = useStaticQuery(graphql`
    {
      allGuide {
        nodes {
          slug
          title
        }
      }
    }
  `);

  const guides = result.allGuide.nodes;

  return (
    <>
      <Flex
        as="header"
        sx={{ alignItems: 'center', boxShadow: 'rgba(0,0,0,0.5) 0px 0px 2px' }}
      >
        <Box p={2}>
          <Heading as="h1">Title</Heading>
        </Box>

        {guides.map((guide) => (
          <Box p={2}>
            <NavLink to={guide.slug} as={Link}>
              {guide.title}
            </NavLink>
          </Box>
        ))}
      </Flex>

      {children}
    </>
  );
};

export default LayoutTemplate;
