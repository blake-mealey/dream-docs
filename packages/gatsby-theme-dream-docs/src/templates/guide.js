import React from 'react';
import LayoutTemplate from './layout';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Flex, Box, NavLink } from 'theme-ui';
import { useStaticQuery, graphql, Link } from 'gatsby';

const GuideTemplate = ({ pageContext }) => {
  const { guideId, articleId, mdx } = pageContext;

  const result = useStaticQuery(graphql`
    {
      allGuide {
        nodes {
          id
          children {
            ... on GuideArticle {
              id
              slug
              title
            }
          }
        }
      }
    }
  `);

  const { children: articles } = result.allGuide.nodes.find(
    (guide) => guide.id === guideId
  );

  return (
    <LayoutTemplate activeGuide={guideId}>
      <Flex>
        <Flex
          p={3}
          sx={{ flexDirection: 'column', width: '256px', minWidth: '256px' }}
        >
          {articles.map((article) => (
            <NavLink
              key={article.id}
              as={Link}
              to={article.slug}
              className={articleId === article.id ? 'active' : ''}
            >
              {article.title}
            </NavLink>
          ))}
        </Flex>
        <Box sx={{ maxWidth: '800px', width: '800px', margin: '0 auto' }}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Box>
      </Flex>
    </LayoutTemplate>
  );
};

export default GuideTemplate;
