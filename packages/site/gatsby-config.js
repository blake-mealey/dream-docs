module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-dream-docs`,
      options: {
        guides: [
          {
            title: 'Guide',
            path: 'content/guide',
          },
        ],
      },
    },
  ],
};
