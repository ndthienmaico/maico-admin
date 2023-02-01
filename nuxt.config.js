// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "MAICO ADMIN",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "https://maico.vn/favicon.png",
        },
      ],
    },
  },

  modules: [
    "@nuxtjs/apollo",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxtjs/supabase",
  ],

  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://api-listing-staging.maico.vn/graphql",
      },
    },
  },

  loaders: [
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: "url-loader",
      query: {
        limit: 1000, // 1KO
        name: "img/[name].[hash:7].[ext]",
      },
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: "url-loader",
      query: {
        limit: 1000, // 1 KO
        name: "fonts/[name].[hash:7].[ext]",
      },
    },
    {
      test: /.json$/,
      loaders: ["json-loader"],
    },
  ],
});
