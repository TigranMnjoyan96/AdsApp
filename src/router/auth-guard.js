import store from '../store'


export default function(to, from, next) {
    if(store.getters.user) {
        next()
        console.log('slsllsl')
    } else {
        next('/login?loginError=true')
        console.log('lsssll')
    }
}