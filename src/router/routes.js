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
      component: () => import(/* webpackChunkName: "homeLayout" */ '@/layouts/home.layout.vue'),
      children: [
        {
          path: "admin-instrument",
          name: "adminInstrument",
          component: () => import(/* webpackChunkName: "adminInstrument" */ '@/pages/admin/instrument.page.vue')
        },
        {
          path: "admin-gift",
          name: "adminGift",
          component: () => import(/* webpackChunkName: "adminGift" */ '@/pages/admin/gift.page.vue')
        },
        {
          path: "admin-festival",
          name: "adminFestival",
          component: () => import(/* webpackChunkName: "adminFestival" */ '@/pages/admin/festival.page.vue')
        },
        {
          path: "admin-message",
          name: "adminMessage",
          component: () => import(/* webpackChunkName: "adminMessage" */ '@/pages/admin/message.page.vue')
        },
        {
          path: "admin-timegoal",
          name: "adminTimeGoal",
          component: () => import(/* webpackChunkName: "adminTimeGoal" */ '@/pages/admin/timeGoal.page.vue')
        },
        {
          path: "admin-practice",
          name: "adminPractice",
          component: () => import(/* webpackChunkName: "adminPractice" */ '@/pages/admin/practice.page.vue')
        },
        {
          path: "user-message",
          name: "userMessage",
          component: () => import(/* webpackChunkName: "userMessage" */ '@/pages/user/user.message.page.vue')
        },
        {
          path: "user-practice",
          name: "userPractice",
          component: () => import(/* webpackChunkName: "userPractice" */ '@/pages/user/user.practice.page.vue')
        },
        {
          path: "user-score",
          name: "userScore",
          component: () => import(/* webpackChunkName: "userScore" */ '@/pages/user/user.score.page.vue')
        },
        {
          path: "user-gift",
          name: "userGift",
          component: () => import(/* webpackChunkName: "userGift" */ '@/pages/user/user.gift.page.vue')
        },
        {
          path: "user-festival",
          name: "userFestival",
          component: () => import(/* webpackChunkName: "userFestival" */ '@/pages/user/user.festival.page.vue')
        },
      ]
    }
]

export default routes