import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        activeId: '',
        domainText: {
            one: '',
            two: ''
        },
        navStatus: true,
        loadingStatus: true
    },
    mutations: {
        menuActive(state, active) {
            state.activeId = active;
        },
        domainBarActive(state, active) {
            state.domainText.one = active.one;
            state.domainText.two = active.two;
        },
        navToggleActive(state, active) {
            state.navStatus = active;
        },
        loadingActive(state, active) {
            state.loadingStatus = active;
        }
    }
})