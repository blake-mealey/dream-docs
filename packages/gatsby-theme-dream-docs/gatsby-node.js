const path = require('path');
const Case = require('case');

function getGuideForPage(guides, page) {
  return guides.find((guide) => {
    const relativePath = path.relative(guide.path, page.componentPath);
    return !relativePath.startsWith('..');
  });
}

exports.onCreatePage = (
  { page, actions: { createPage, deletePage } },
  options
) => {
  const basePath = options.basePath || '/';
  const guides = options.guides || [];

  const guide = getGuideForPage(guides, page);
  if (guide) {
    deletePage(page);
    createPage({
      ...page,
      path: `${basePath}/${Case.kebab(guide.title)}/${page.path}`.replace(
        /\/\//g,
        '/'
      ),
    });
  }
};
