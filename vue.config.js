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
  }
})
