export default {
    state: {
        loading: false,
        error: null
    },
    mutations: {
        LOADING_PHASE(state, payload) {
            state.loading = payload
        },
        ERROR_PHASE(state, payload) {
            state.error = payload
        },
        CLEAR_PHASE(state) {
            state.error = null
        }
    },
    actions: {
        LOADING_PHASE({commit}, payload) {
            commit('LOADING_PHASE', payload)
        },
        ERROR_PHASE({commit}, payload) {
            commit('ERROR_PHASE', payload)
        },
        CLEAR_PHASE({commit}) {
            commit('CLEAR_PHASE')
        }
    },
    getters: {
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        }
    }
}