import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: "#61C0BF",
            secondary: "#BBDED6",
            error: "#FF9292",
            light: "#EAEAEA",
            success: "#EAEAEA"
          },
        },
    },
    rtl: true
});
