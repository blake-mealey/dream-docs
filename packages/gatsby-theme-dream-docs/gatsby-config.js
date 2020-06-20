module.exports = ({
  basePath = `/`,
  guides = [],
  themeUi = {
    prismPreset: `night-owl`,
    preset: `@theme-ui/preset-base`,
  },
}) => ({
  plugins: [
    {
      resolve: `gatsby-plugin-theme-ui`,
      options: themeUi,
    },
    ...guides.map((guide) => ({
      resolve: `gatsby-source-filesystem`,
      options: {
        path: guide.path,
        name: guide.path,
      },
    })),
    ...guides.map((guide) => ({
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: guide.path,
      },
    })),
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve('./src/templates/layout.js'),
          ...Object.fromEntries(
            guides.map((guide) => [
              guide.path,
              require.resolve('./src/templates/guide.js'),
            ])
          ),
        },
      },
    },
  ],
});
