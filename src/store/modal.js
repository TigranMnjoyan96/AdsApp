import fb from 'firebase/app'



class Order {
    constructor(name, phone, adId, done = false, id = null) {
        this.name = name
        this.phone = phone
        this.adId = adId
        this.done = done
        this.id = id
    }
}


export default {
    state: {
        orders: []
    },
    mutations: {
        LOAD_ORDERS(state, payload) {
            state.orders = payload
        }
    },
    actions: {
        async CREATE_ORDER({commit}, {name, phone, adId, ownerId}) {
            const order =  new Order(name, phone, adId)
            commit('CLEAR_PHASE')

            try {
                await fb.database().ref(`users/${ownerId}/orders`).push(order)

            } catch(err) {
                commit('ERROR_PHASE', err.message)
                throw err
            }
        },
        async FETCH_ORDERS({commit, getters}) {
            commit('LOADING_PHASE', true)
            commit('CLEAR_PHASE')

            const resultOrders = []

            try {
                commit('LOADING_PHASE', false)
                const fbVal = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value')
                const orders = fbVal.val()
                Object.keys(orders).forEach(key => {
                    const o = orders[key]
                    resultOrders.push(
                        new Order(o.name, o.phone, o.adId, o.done, key)
                    )
                })
                commit('LOAD_ORDERS', resultOrders)

            } catch(err) {
                commit('ERROR_PHASE', err.message)
                commit('LOADING_PHASE', false)
            }
        },
        async MARK_DONE_ORDER({commit, getters}, payload) {
            commit('CLEAR_PHASE')
            try {
                await fb.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
                    done: true
                })
            } catch (err) {
                commit('ERROR_PHASE', err.message)
                throw err
            }
        }
    },
    getters: {
        doneOrders(state) {
            return state.orders.filter(o => o.done)
        },
        unDoneOrders(state) {
            return state.orders.filter(o => !o.done)
        },
        orders(state, getters) {
            return getters.unDoneOrders.concat(getters.doneOrders)
        }
    },
}
