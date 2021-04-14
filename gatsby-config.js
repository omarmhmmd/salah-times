module.exports = {
  siteMetadata: {
    title: "salah-times",
  },
  plugins: [
    {
      resolve: "gatsby-source-custom-api",
      options: {
        url: "http://ip-api.com/json/",
      },
      schemas: {
        position: `
          lat: Int
          lon: Int
        `,
      },
    },
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: " G-ZL5B0MLFPF",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
