import * as fb from 'firebase/app'
import 'firebase/database'


class Ad {
    constructor(title, description,ownerId, promo = false, src = '', id = null) {
        this.title = title
        this.description = description
        this.ownerId = ownerId
        this.promo = promo
        this.src = src
        this.id = id
    }
}


export default {
    state: {
        ads: []
    },
    mutations: {
        ADD_ITEMS(state, payload) {
            state.ads.push(payload)
        },
        LOAD_ADS(state, payload) {
            state.ads = payload
        }
    },
    actions: {
        async ADD_ITEMS({commit, getters}, payload) {
            commit('CLEAR_PHASE')
            commit('LOADING_PHASE', true)

            try {
                const newAd = new Ad(payload.title, payload.description, getters.user.id, payload.promo, payload.src)
                const fbValue = await fb.database().ref('adsproject').push(newAd)
                commit('LOADING_PHASE', false)
                commit('ADD_ITEMS', {
                    ...newAd,
                    id: fbValue.key
                })
            } catch(err) {
                commit('ERROR_PHASE', err.message)
                commit('LOADING_PHASE', false)
                throw err
            }
        },
        async FETCH_ADS({commit}) {
            commit('CLEAR_PHASE')
            commit('LOADING_PHASE', true)

            const result = []

            try {
                const fbVal = await fb.database().ref('adsproject').once('value')
                const ads = fbVal.val()


                Object.keys(ads).forEach(key => {
                    const ad = ads[key]
                    result.push(
                        new Ad(ad.title, ad.description, ad.ownerId, ad.promo, ad.src, key)
                    )
                })
                commit('LOAD_ADS', result)
                commit('LOADING_PHASE', false)

            } catch(err) {
                commit('ERROR_PHASE', err.message)
                commit('LOADING_PHASE', false)
                throw err
            }
        }
    },
    getters: {
        ads(state) {
            return state.ads
        },
        promoAds(state) {
            return state.ads.filter(p => p.promo)
        },
        myAds(state) {
            return state.ads
        },
        getById(state) {
            return adId => {
                return state.ads.find(a => a.id === adId)
            }
        }
    }
}
