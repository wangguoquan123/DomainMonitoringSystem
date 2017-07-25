// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import DataTables from 'vue-data-tables';
import routes from '@/router/index.js';
import VueI18n from 'vue-i18n';
import i18ns from '@/lib/i18n.js';
import menuId from '@/lib/menuId.js';
import verify from 'vue-verify-plugin/src/verify';
import elementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
import store from '@/vuex/store.js'

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(verify);
Vue.use(VueResource);
Vue.use(elementUI);
Vue.use(DataTables);

const router = new VueRouter({
    routes
});

Vue.http.interceptors.push(function(request, next) {

    // modify method
    request.method = 'POST';

    // modify headers
    let _token = window.localStorage.getItem('scrftoken');
    request.headers.set('Token', _token);

    // continue to next interceptor
    next();
});

router.beforeEach((to, from, next) => {
    var domainBar = {
        one: ['基础功能'],
        two: [
            ['展示', '查询', '配置', '告警']
        ]
    };
    store.commit('menuActive', menuId[to.fullPath]);
    window.localStorage.setItem('activeId', store.state.activeId);
    if (to.fullPath !== '/') {
        let value = store.state.activeId;
        let _oneNum = value.split('-')[0];
        let _twoNum = value.split('-')[1];
        store.commit('domainBarActive', {
            one: domainBar.one[_oneNum-1],
            two: domainBar.two[_oneNum-1][_twoNum-1]
        });
    }
    next();
});

router.afterEach((to, from, next) => {

});

// 路由跳转
Vue.prototype.$goRoute = function (index) {
    this.$router.push(index)
};

let language = window.localStorage.getItem('x-language');
if (!language) {
    window.localStorage.setItem('x-language', 'cn');
    language = 'cn'
};

const i18n = new VueI18n({
    locale: language, // set locale
    messages: i18ns // set locale i18ns
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    menuId,
    template: '<App/>',
    components: { App }
});
