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
  const guides = (options.guides || []).map((guide) => ({
    ...guide,
    id: createNodeId(`Guide:${guide.path}`),
    slug: joinSlugs(basePath, slugify(guide.title)),
  }));

  const files = await getFiles(graphql);

  const guideTemplate = require.resolve(`./src/templates/guide.js`);

  files.forEach((file) => {
    const guide = getGuideForFile(guides, file);

    if (guide) {
      const isFirst = !guide.articles;

      const name = path.basename(file.fileAbsolutePath, '.mdx');
      const slug = isFirst ? guide.slug : joinSlugs(guide.slug, slugify(name));

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
          guideId: guide.id,
        },
      });
    }
  });

  guides.forEach((guide) => {
    createNode({
      id: guide.id,
      title: guide.title,
      slug: guide.slug,
      children: guide.articles,
      internal: {
        type: 'Guide',
        contentDigest: createContentDigest(JSON.stringify(guide)),
      },
    });
  });
};
