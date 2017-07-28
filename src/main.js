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
// import 'xlsx/dist/jszip.js'

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(verify);
Vue.use(VueResource);
Vue.use(elementUI);
Vue.use(DataTables);
// Vue.use(XLSX);

const router = new VueRouter({
    routes
});

// 路由跳转

Vue.http.interceptors.push(function(request, next) {

    // modify method
    request.method = 'POST';

    // modify headers
    let _token = window.localStorage.getItem('scrftoken');
    request.headers.set('Token', _token);

    // continue to next interceptor
    next();
});

let language = window.localStorage.getItem('x-language');
if (!language) {
    window.localStorage.setItem('x-language', 'cn');
    language = 'cn'
};

const i18n = new VueI18n({
    locale: language, // set locale
    messages: i18ns // set locale i18ns
});

Vue.filter('convertDate', function(value) {
    let _old  = new Date(value * 60 * 1000);
    let _year = _old.getFullYear();
    let _month = _old.getMonth();
    _month = _month < 10 ? '0' + _month : _month;
    let _date = _old.getDate();
    _date = _date < 10 ? '0' + _date : _date;
    let _hour = _old.getHours();
    _hour = _hour < 10 ? '0' + _hour : _hour;
    let _minute = _old.getMinutes();
    _minute = _minute < 10 ? '0' + _minute : _minute;
    let _new = _year + '-' + _month + '-' + _date + ' ' + _hour + ':' + _minute;
    return _new;
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

Vue.prototype.$goRoute = function (index) {
    this.$router.push(index)
};

router.beforeEach((to, from, next) => {
    var domainBar = {
        one: ['基础功能'],
        two: [
            ['展示', '查询', 'localDNS', '配置', '告警']
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
