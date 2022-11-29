const routes = [
    {
      path: '/auth',
      name: 'auth',
      component: () => import(/* webpackChunkName: "auth" */ '@/pages/auth.page.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/pages/login.page.vue')
    },
    {
      path: '/',
      name: 'homeLayout',
      component: () => import(/* webpackChunkName: "homeLayout" */ '@/layouts/home.layout.vue'),
      children: [
        {
          path: "",
          name: "home",
          component: () => import(/* webpackChunkName: "home" */ '@/pages/home.page.vue')
        },
        {
          path: "/instrument",
          name: "instrument",
          component: () => import(/* webpackChunkName: "instrument" */ '@/pages/instrument.page.vue')
        },
      ]
    }
]

export default routes