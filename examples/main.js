import Vue from 'vue'
import App from './App.vue'
// import CertPoster from 'vue-cert-poster'
// import 'vue-cert-poster/lib/vue-cert-poster.css'
import CertPoster from '../packages'

Vue.use(CertPoster)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
