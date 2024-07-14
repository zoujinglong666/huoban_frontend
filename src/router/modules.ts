import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

const routeModuleList: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/index',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'i-simple-icons:atlassian',
    },
    children: [
      {
        path: 'index',
        name: 'DashboardPage',
        meta: {
          keepAlive: true,
        },
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
  {
    path: '/team',
    name: 'Team',
    redirect: '/team/index',
    component: Layout,
    meta: {
      title: '队伍',
      icon: 'i-material-symbols:award-star',
      hiddenHeader: true,
    },
    children: [
      {
        path: 'index',
        name: 'ExamplePage',
        meta: {
          keepAlive: false,
        },
        component: () => import('@/views/team/index.vue'),
      },
    ],



  },
  {
    path: '/team/add',
    name: 'TeamAdd',
    meta: {
      title: '添加队伍',
      innerPage: true,
    },
    component: () => import('@/views/team/add/index.vue'),
  },

  {
    path: '/team/update/:id',
    name: 'TeamUpdate',
    meta: {
      title: '队伍详情',
      innerPage: true,
    },
    component: () => import('@/views/team/update/index.vue'),
  },

  {
    path: '/my',
    name: 'My',
    redirect: '/my/index',
    component: Layout,
    meta: {
      title: '我的',
      icon: 'i-simple-icons:docsify',
    },
    children: [
      {
        path: 'index',
        name: 'MyPage',
        meta: {
          keepAlive: false,
          hiddenHeader: true,
        },
        component: () => import('@/views/my/index.vue'),
      },
    ],
  },

  // my innerPage
  {
    path: '/editUserInfo',
    name: 'EditUserInfo',
    meta: {
      title: '编辑个人信息',
      innerPage: true,
    },
    component: () => import('@/views/my/EditUserInfo.vue'),
  },
  {
    path: '/editNickname',
    name: 'EditNickname',
    meta: {
      title: '修改昵称',
      innerPage: true,
      keepAlive: true,
    },
    component: () => import('@/views/my/EditNickname.vue'),
  },
  {
    path: '/editSign',
    name: 'EditSign',
    meta: {
      title: '修改签名',
      innerPage: true,
    },
    component: () => import('@/views/my/EditSign.vue'),
  },
  {
    path: '/accountSetting',
    name: 'AccountSetting',
    meta: {
      title: '账号与安全',
      innerPage: true,
    },
    component: () => import('@/views/my/AccountSetting.vue'),
  },
  {
    path: '/changePassword',
    name: 'ChangePassword',
    meta: {
      title: '修改登录密码',
      innerPage: true,
    },
    component: () => import('@/views/my/ChangePassword.vue'),
  },
  {
    path: '/themeSetting',
    name: 'ThemeSetting',
    meta: {
      title: '主题设置',
      innerPage: true,
    },
    component: () => import('@/views/my/ThemeSetting.vue'),
  },

  {
    path: '/search/index',
    name: 'Search',
    meta: {
      title: '搜索页面',
      innerPage: true,
    },
    component: () => import('@/views/search/index.vue'),
  },

  {
    path: '/search/result',
    name: 'SearchResult',
    meta: {
      title: '搜索结果',
      innerPage: true,
    },
    component: () => import('@/views/search/result.vue'),
  },
]

export default routeModuleList
