import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '仪表盘', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/archive',
    component: Layout,
    children: [
      {
        path: 'branchGroup',
        component: () => import('@/views/archive/branch/branchGroup'),
        name: 'ArchiveBranchGroup',
        meta: { title: '机构组' }
      },
      {
        path: 'branch',
        component: () => import('@/views/archive/branch/branch'),
        name: 'ArchiveBranch',
        meta: { title: '机构档案' }
      },
      {
        path: 'supplierRegion',
        component: () => import('@/views/archive/supplier/supplierRegion'),
        name: 'ArchiveSupplierRegion',
        meta: { title: '供应商区域' }
      },
      {
        path: 'supplier',
        component: () => import('@/views/archive/supplier/supplier'),
        name: 'ArchiveSupplier',
        meta: { title: '供应商' }
      },
      {
        path: 'itemCls',
        component: () => import('@/views/archive/item/itemCls'),
        name: 'ArchiveItemCls',
        meta: { title: '商品类别' }
      },
      {
        path: 'itemBrand',
        component: () => import('@/views/archive/item/itemBrand'),
        name: 'ArchiveItemBrand',
        meta: { title: '商品品牌' }
      },
      {
        path: 'itemDepartment',
        component: () => import('@/views/archive/item/itemDepartment'),
        name: 'ArchiveItemDepartment',
        meta: { title: '商品部门' }
      },
      {
        path: 'itemUnit',
        component: () => import('@/views/archive/item/itemUnit'),
        name: 'ArchiveItemUnit',
        meta: { title: '商品单位' }
      },
      {
        path: 'item',
        component: () => import('@/views/archive/item/item'),
        name: 'ArchiveItem',
        meta: { title: '商品' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    children: [
      {
        path: 'role',
        component: () => import('@/views/system/role/index'),
        name: 'SystemRole',
        meta: { title: '系统角色', icon: 'bug' }
      },
      {
        path: 'user',
        component: () => import('@/views/system/user/index'),
        name: 'SystemUser',
        meta: { title: '用户', icon: 'bug' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
