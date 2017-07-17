// import Vue from 'vue'
// import Router from 'vue-router'
// import Hello from '@/components/Hello'
//
// Vue.use(Router)
//
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Hello',
//       component: Hello
//     }
//   ]
// })


import Login from '@/components/Login'
import Panel from '@/components/Panel'

let routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/panel',
        name: 'Panel',
        meta: {
            requireAuth: true
        },
        component: Panel
    }
];

export default routes;

