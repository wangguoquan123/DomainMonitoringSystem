// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import routes from '@/router/index.js';
import VueI18n from 'vue-i18n';
import i18ns from './lib/i18n.js';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(iView);

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
});

iView.LoadingBar.config({
    color: '#5cb85c',
    failedColor: '#f0ad4e',
    height: 5
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: { App }
});