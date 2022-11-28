import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: "#364F6B",
            secondary: "#3FC1C9",
            error: "#FC5185",
            light: "#F5F5F5",
            success: "#4CAF50"
          },
        },
    },
    rtl: true
});
