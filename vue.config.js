const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: "اپلیکیشن تمرین موسیقی",
    themeColor: "#EAEAEA",
    backgroundColor: "#61C0BF",
    startUrl: ".",
    display: "standalone",
    dir: "rtl",
    lang: "fa-IR",
    icons: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-icon-152x152.png',
      msTileImage: 'img/icons/ms-icon-144x144.png'
    }
  }
})
