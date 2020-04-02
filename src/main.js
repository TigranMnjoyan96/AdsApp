import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import * as fb from 'firebase/app'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    fb.initializeApp({
      apiKey: "AIzaSyCEyXbc6is59HljpOV0rXJRy7FEpDGgg-s",
      authDomain: "adsproject-fe337.firebaseapp.com",
      databaseURL: "https://adsproject-fe337.firebaseio.com",
      projectId: "adsproject-fe337",
      storageBucket: "adsproject-fe337.appspot.com",
      messagingSenderId: "694318791211",
      appId: "1:694318791211:web:455d450973debd8ca8c86e"
    })
    fb.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.dispatch('AUTO_LOGIN_USER', user)
      }
    })
  this.$store.dispatch('FETCH_ADS')

  },
}).$mount('#app')
