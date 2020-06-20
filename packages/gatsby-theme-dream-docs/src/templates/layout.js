import React from 'react';
/** @jsx jsx */
import { jsx, Box, Heading, Flex, NavLink } from 'theme-ui';
import { Link } from 'gatsby';

const LayoutTemplate = ({ children }) => {
  return (
    <>
      <Flex
        as="header"
        sx={{ alignItems: 'center', boxShadow: 'rgba(0,0,0,0.5) 0px 0px 2px' }}
      >
        <Box p={2}>
          <Heading as="h1">Title</Heading>
        </Box>
        <Box p={2}>
          <NavLink to="/guides" as={Link}>
            Guides
          </NavLink>
        </Box>
        <Box p={2}>
          <NavLink to="/references/api" as={Link}>
            API Reference
          </NavLink>
        </Box>
        <Box p={2}>
          <NavLink to="/references/sdk" as={Link}>
            SDK Reference
          </NavLink>
        </Box>
      </Flex>

      {children}
    </>
  );
};

export default LayoutTemplate;
