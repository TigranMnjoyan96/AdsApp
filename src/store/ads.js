import * as fb from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'


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
        },
        UPDATE_ADS(state, {title, description, id}) {
            const ads = state.ads.find(i => i.id === id)
            ads.title = title
            ads.description = description
        }
    },
    actions: {
        async ADD_ITEMS({commit, getters}, payload) {
            commit('CLEAR_PHASE')
            commit('LOADING_PHASE', true)

            const image = payload.image

            try {
                const newAd = new Ad(payload.title, payload.description, getters.user.id, payload.promo, '')
                const fbValue = await fb.database().ref('adsproject').push(newAd)

                const imgExt = image.name.slice(image.name.lastIndexOf('.'))

                const fileData = await fb.storage().ref(`ads/${fbValue.key}.${imgExt}`).put(image)
                // const src = fileData.metadata.downloadURLs[0]
                const src = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
                await fb.database().ref('ads').child(fbValue.key).update({
                    src
                })


                commit('LOADING_PHASE', false)
                commit('ADD_ITEMS', {
                    ...newAd,
                    id: fbValue.key,
                    src
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
        },
        async UPDATE_ADS({commit}, {title, description, id}) {
            commit('CLEAR_PHASE')
            commit('LOADING_PHASE', true)

            try {

                await fb.database().ref('ads').child(id).update({
                    title, description
                })
                commit('UPDATE_ADS', {title, description, id})
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
        myAds(state, getters) {
            return state.ads.filter(ad => {
                return ad.ownerId === getters.user.id
            })
        },
        getById(state) {
            return adId => {
                return state.ads.find(a => a.id === adId)
            }
        }
    }
}
