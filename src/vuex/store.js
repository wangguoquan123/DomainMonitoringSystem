import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        activeId: '',
        domainBar: {
            one: '',
            two: ''
        }
    },
    mutations: {
        menuActive(state, active) {
            state.activeId = active;
        },
        domainBarActive(state, active) {
            state.domainBar.one = active.one;
            state.domainBar.two = active.two;
        }
    }
})