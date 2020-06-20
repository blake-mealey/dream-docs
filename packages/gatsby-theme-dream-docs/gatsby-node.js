const path = require('path');
const Case = require('case');

exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Guide implements Node {
      slug: String!
      title: String!
    }
    type GuideArticle implements Node {
      slug: String!
      title: String
    }
  `);
};

async function getFiles(graphql) {
  const result = await graphql(`
    {
      allMdx {
        nodes {
          id
          fileAbsolutePath
          body
          internal {
            contentDigest
          }
          frontmatter {
            title
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  return result.data.allMdx.nodes;
}

function getGuideForFile(guides, file) {
  return guides.find((guide) => {
    const relativePath = path.relative(guide.path, file.fileAbsolutePath);
    return !relativePath.startsWith('..');
  });
}

function slugify(str) {
  return encodeURIComponent(Case.kebab(str.toLowerCase()));
}

function joinSlugs(...slugs) {
  return slugs.join('/').replace(/\/\//g, '/');
}

exports.createPages = async (
  {
    actions: { createPage, createNode },
    createNodeId,
    createContentDigest,
    graphql,
  },
  options
) => {
  const basePath = options.basePath || '/';
  const guides = options.guides || [];

  const files = await getFiles(graphql);

  const guideTemplate = require.resolve(`./src/templates/guide.js`);

  function getGuideId(guide) {
    return createNodeId(`Guide:${guide.path}`);
  }

  files.forEach((file) => {
    const guide = getGuideForFile(guides, file);

    if (guide) {
      const name = path.basename(file.fileAbsolutePath, '.mdx');
      const slug = joinSlugs(basePath, slugify(guide.title), slugify(name));

      const nodeId = createNodeId(`GuideArticle:${file.id}`);
      createNode({
        id: nodeId,
        children: [file.id],
        internal: {
          type: 'GuideArticle',
          contentDigest: file.internal.contentDigest,
        },
        title: file.frontmatter.title,
        slug,
      });

      guide.articles = guide.articles ? [...guide.articles, nodeId] : [nodeId];

      createPage({
        path: slug,
        component: guideTemplate,
        context: {
          mdx: file,
          articleId: nodeId,
          guideId: getGuideId(guide),
        },
      });
    }
  });

  guides.forEach((guide) => {
    createNode({
      id: getGuideId(guide),
      title: guide.title,
      slug: joinSlugs(basePath, slugify(guide.title)),
      children: guide.articles,
      internal: {
        type: 'Guide',
        contentDigest: createContentDigest(JSON.stringify(guide)),
      },
    });
  });
};
