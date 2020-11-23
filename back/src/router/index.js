import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'

// 封装一个函数，用来检测是否存在该地址
//some 有一个真就返回真
function hasUrl(url) {
  return Store.state.userInfo.menus_url.some(item => item == url)
}

Vue.use(Router)

export let indexRouter = [
  {
    path: '/menu',
    component: () => import('@/views/menu/menu'),
    name: "菜单列表",
    beforeEnter: (to, from, next) => {
      hasUrl('/menu') ? next() : next('/home')
    }
  },
  {
    path: '/role',
    component: () => import('@/views/role/role'),
    name: "角色列表",
    beforeEnter: (to, from, next) => {
      hasUrl('/role') ? next() : next('/home')
    }

  },
  {
    path: '/user',
    component: () => import('@/views/user/user'),
    name: "管理员列表",
    beforeEnter: (to, from, next) => {
      hasUrl('/user') ? next() : next('/home')
    }
  },
  {
    path: '/cate',
    component: () => import('@/views/cate/cate'),
    name: "商品分类",
    beforeEnter: (to, from, next) => {
      hasUrl('/cate') ? next() : next('/home')
    }
  },
  {
    path: '/specs',
    component: () => import('@/views/specs/specs'),
    name: "商品规格",
    beforeEnter: (to, from, next) => {
      hasUrl('/specs') ? next() : next('/home')
    }
  },
  {
    path: '/goods',
    component: () => import('@/views/goods/goods'),
    name: "商品管理",
    beforeEnter: (to, from, next) => {
      hasUrl('/goods') ? next() : next('/home')
    }
  },
  {
    path: '/member',
    component: () => import('@/views/member/member'),
    name: "会员管理",
    beforeEnter: (to, from, next) => {
      hasUrl('/member') ? next() : next('/home')
    }
  },
  {
    path: '/banner',
    component: () => import('@/views/banner/banner'),
    name: "轮播图管理",
    beforeEnter: (to, from, next) => {
      hasUrl('/banner') ? next() : next('/home')
    }
  },
  {
    path: '/seck',
    component: () => import('@/views/seck/seck'),
    name: "秒杀管理",
    beforeEnter: (to, from, next) => {
      hasUrl('/seck') ? next() : next('/home')
    }
  },
]


const router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/pages/login')
    },
    {
      path: '/index',
      component: () => import('@/pages/index'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/home'),
        },
        ...indexRouter,
        {//二级路由重定向
          path: '',
          redirect: '/menu'
        }
      ]
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
    return
  }

  if (sessionStorage.getItem('userInfo')) {
    next()
    return
  }

  next('/login')
})

// 导出路由
export default router