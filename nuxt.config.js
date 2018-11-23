require('dotenv').config()

const pkg = require('./package')

module.exports = {
  mode: 'universal',
  debug: true,
  
  env: {
    baseUrl: process.env.BASE_URL,
    node_env: process.env.NODE_ENV
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: process.env.BASE_URL + '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Fredoka+One|Montserrat:200,400,500,700,800&amp;subset=cyrillic' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: false,

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss'
  ],

  /*
  ** Router middlewares
  */
  router: {
    middleware: 'i18n'
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/i18n.js', ssr: true },
    { src: '~/plugins/vue-select.js', ssr: false },
    { src: '~/plugins/vue-flux.js', ssr: false },
    { src: '~plugins/ga.js', ssr: false },
    { src: '~plugins/socket.io.js', ssr: false }
  ],

  /*
  ** Generate dynamic routes
  */
  // generate: {
  //   routes: [
  //     '/ru/login',
  //     '/uz/login',
  //     '/ru/chat',
  //     '/uz/chat'
  //   ]
  // },

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/router',
    '@nuxtjs/sitemap',
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 60
    }],
    ['@nuxtjs/google-analytics', {
      id: 'UA-129371850-1'
    }],
    // '~/modules/express-routes.js'
  ],

  /*
  ** Generates sitemap
  */
  // sitemap: {
  //   path: '/sitemap.xml',
  //   hostname: 'http://chateg.com',
  //   cacheTime: 1000 * 60 * 15,
  //   gzip: true,
  //   generate: false, // Enable me when using nuxt generate
  //   exclude: [
  //     '/secret',
  //     '/admin/**'
  //   ],
  //   routes: [
  //     '/ru/login',
  //     '/uz/login',
  //     '/ru/chat',
  //     '/uz/chat'
  //   ]
  // },

  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: process.env.BASE_URL
  },

  /*
  ** Build configuration
  */
  build: {
    // analyze: true,
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // config.resolve.alias['vue'] = 'vue/dist/vue.common'
      
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
