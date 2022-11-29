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

Vue.config.productionTip = false;

axios.defaults.headers.common['Accept'] = "application/json";
axios.defaults.baseURL = "http://localhost:5000"
axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	(error.message === "Network Error") && alert("متاسفانه اتصال با اینترنت یا سرور برقرار نیست، لطفا اتصال خود به اینترنت را بررسی کرده و مجدد تلاش کنید");

	console.error(error, error.message);
	return Promise.reject(error);
});

// router.beforeEach((to, from, next) => {
//   const user = store.getters.get_state("user")
//   const path = to.path

//   if(path == "/auth" && user) return next({path: '/'})
//   else if(path == "/auth" && !user) return next()

//   else if(path == "/login" && user) return next({path: '/'})
//   else if(path == "/login" && !user) return next()

//   else if(!user) return next({path: "/login"})
//   else next()
// })

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
