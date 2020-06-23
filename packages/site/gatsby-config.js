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
          {
            title: 'More',
            path: 'content/guide2',
          },
        ],
        openApis: [
          {
            title: 'My API',
            url:
              'https://raw.githubusercontent.com/Redocly/redoc/master/demo/big-openapi.json',
          },
        ],
      },
    },
  ],
};
