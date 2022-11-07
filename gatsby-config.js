module.exports = {
  siteMetadata: {
    title: `AmioTalio University`,
    description: `Social influencer and enterprenuer Amio Talio.`,
    author: `Amio Talio University`,
    siteUrl: `https://www.amiotalio.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: {
        prefixes: [
          `/account/*`
        ]
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: [
            'Montserrat:ital,wght@0,200;0,500;0,700;1,500',
            'Cousine:wght@700',
            'IBM+Plex+Mono:wght@300;700'
          ]
        }
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets/`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/`,
        name: `content`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              maintainCase: false,
              removeAccents: true,
              isIconAfterHeader: true,
              elements: ['h1', 'h2', 'h3']
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1024,
              showCaptions: true,
              linkImagesToOriginal: false,
              tracedSVG: true,
              loading: "lazy",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-DY8DPSW2Z2", // Google Analytics / GA
        ],
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: "294731222787783",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Amio Talio University`,
        short_name: `ATU`,
        start_url: `/`,
        background_color: `#181818`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `standalone`,
        icon: `src/assets/svg/favico.svg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//   if (stage === "build-html") {
//     /*
//      * During the build step, `auth0-js` will break because it relies on
//      * browser-specific APIs. Fortunately, we don’t need it during the build.
//      * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
//      * during the build. (See `src/utils/auth.js` to see how we prevent this
//      * from breaking the app.)
//      */
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /auth0-js/,
//             use: loaders.null(),
//           },
//         ],
//       },
//     })
//   }
// }