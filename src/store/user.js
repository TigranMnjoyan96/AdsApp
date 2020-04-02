import * as fb from 'firebase/app'
import 'firebase/auth'


class User {
    constructor(id) {
        this.id = id
    }
}

export default {
    state: {
        user: null
    },
    mutations: {
        SET_USER_REGISTRATION(state, payload) {
            state.user = payload
        }
    },
    actions: {
        async REGISTER_USER({commit}, {email, password}) {
            commit('CLEAR_PHASE')
            commit('LOADING_PHASE', true)
            try {
                const user = await fb.auth().createUserWithEmailAndPassword(email, password)
                commit('SET_USER_REGISTRATION', new User(user.uid))
                commit('LOADING_PHASE', false)
            } catch(err) {
                commit('LOADING_PHASE', false)
                commit('ERROR_PHASE', err.message)
                throw err
            }
        },
        async login({commit}, {email, password}) {
            commit('CLEAR_PHASE')
            commit('LOADING_PHASE', true)
            try {
                const user = await fb.auth().signInWithEmailAndPassword(email, password)
                commit('SET_USER_REGISTRATION', new User(user.uid))
                commit('LOADING_PHASE', false)
            } catch(err) {
                commit('LOADING_PHASE', false)
                commit('ERROR_PHASE', err.message)
                throw err
            }
        },
        AUTO_LOGIN_USER({commit}, payload) {
            commit('SET_USER_REGISTRATION', new User(payload.uid))
        },
        ON_LOG_OUT({commit}) {
            fb.auth().signOut()
            commit('SET_USER_REGISTRATION', null)
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        isUserLoggedIn(state) {
            return state.user !== null
        }
    }
}
