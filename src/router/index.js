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

