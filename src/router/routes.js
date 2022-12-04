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
        {
          path: "/gift",
          name: "gift",
          component: () => import(/* webpackChunkName: "gift" */ '@/pages/gift.page.vue')
        },
        {
          path: "/festival",
          name: "festival",
          component: () => import(/* webpackChunkName: "festival" */ '@/pages/festival.page.vue')
        },
        {
          path: "/message",
          name: "message",
          component: () => import(/* webpackChunkName: "message" */ '@/pages/message.page.vue')
        },
      ]
    }
]

export default routes