import Login from '@/components/Login';
import Panel from '@/components/Panel';

import domainQuery from '@/components/base/domainQuery';
import domainConfigure from '@/components/base/domainConfigure';
import domainShow from '@/components/base/domainShow';
import domainAlarm from '@/components/base/domainAlarm';

import Err404 from '@/components/Err404';

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
        component: Panel,
        children: [
            {
                path: 'query',
                name: 'query',
                component: domainQuery
            },
            {
                path: 'configure',
                name: 'configure',
                component: domainConfigure
            },
            {
                path: 'show',
                name: 'show',
                component: domainShow
            },
            {
                path: 'alarm',
                name: 'alarm',
                component: domainAlarm
            }
        ]
    },
    { path: '/404', component: Err404, hidden: true },
    { path: '*', redirect: '/404', hidden: true }
];

export default routes;