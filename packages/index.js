import CertPoster from './cert-poster/index.js'

const components = [
  CertPoster
]

const install = (Vue) => {
  components.forEach(Component => {
    Vue.use(Component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  CertPoster
}

export default {
  install
}