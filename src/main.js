import Vue from 'vue'
import axios from 'axios' 
import SDialog from '@/components/tools/SDialog.vue';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import "bootstrap/dist/css/bootstrap.min.css"
import '@/scss/style.scss';

// import mixins
import filters from '@/mixins/filters';
import notify from '@/mixins/notify';
import exception_handler from '@/mixins/exception_handler';

Vue.config.productionTip = false

axios.defaults.headers.common['Accept'] = "application/json";
axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	(error.message === "Network Error") && alert("متاسفانه اتصال با اینترنت یا سرور برقرار نیست، لطفا اتصال خود به اینترنت را بررسی کرده و مجدد تلاش کنید");

	console.error(error, error.message);
	return Promise.reject(error);
});

Vue.mixin(filters);	
Vue.mixin(notify);
Vue.mixin(exception_handler);

Vue.component("s-dialog", SDialog);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
