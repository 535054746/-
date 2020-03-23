import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Form from '../views/nav1/Form.vue'
import Table from '../views/nav1/Table.vue'
import user from '../views/nav1/user.vue'
import page5 from '../views/nav2/page5.vue'
import page6 from '../views/nav2/page6.vue'
import page7 from '../views/nav3/page7.vue'
import pageErr from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    hidden: true
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    hidden: true
  },
  {
    path: '/',
    component: About,
    name: '导航一',
    iconCls: 'el-icon-message',
    children: [
      {path: '/table',component:Table, name: 'Table'},
      {path: '/form',component:Form, name: 'Form'},
      {path: '/user',component:user, name: '列表'}
    ]
  },
  {
    path: '/',
    component: About,
    name: '导航二',
    iconCls: 'el-icon-goods',
    children: [
      { path: '/page5',component: page5, name: 'page5'},
      { path: '/page6',component: page6, name: 'page6'}
    ]
  },
  {
    path: '/',
    component: About,
    name: '导航三',
    iconCls: 'el-icon-s-home',
    children: [
      {path: '/page7',component: page7, name: 'page7'}
    ]
  },
  {
    path: '/',
    component: About,
    name: '',
    iconCls: 'el-icon-message-solid',
    leaf: true,//只有一个节点
    children: [
        { path: '/404', component: pageErr, name: '404' }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
