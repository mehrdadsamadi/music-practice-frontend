const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: "MP Apps",
    themeColor: "#EAEAEA",
    backgroundColor: "#61C0BF",
    startUrl: ".",
    display: "standalone",
    dir: "rtl",
    lang: "fa-IR",
    icons: {
      faviconSVG: 'img/icons/favicon.svg',
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
    }
  }
})
