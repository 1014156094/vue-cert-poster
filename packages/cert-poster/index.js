import Vue from 'vue'
import VueCertPoster from './index.vue'

let instance

function CertPoster (options = {}) {
  return new Promise((resolve, reject) => {
    if (!instance) {
      instance = new (Vue.extend(VueCertPoster))({
        el: document.createElement('div') // 挂载到一个 div 内，相当于 instance.$mount()
      })

      document.body.appendChild(instance.$el) // 添加到 body 尾部
    }

    Object.assign(instance, options, {
      resolve,
      reject
    }) // 合并数据

    instance.value = true // 显示弹窗

    // 生成海报成功后 emit 触发
    instance.$on('success', posterUrl => {
      instance.resolve && instance.resolve(posterUrl) // resolve 一个海报地址
    })

    // 生成海报失败后 emit 触发
    instance.$on('fail', () => {
      instance.reject && instance.reject()
    })

    // 切换弹窗显示状态后 emit 触发
    instance.$on('input', value => {
      instance.value = value
    })
  })
}

CertPoster.install = () => {
  Vue.component(VueCertPoster.name, VueCertPoster)
}

Vue.prototype.$certPoster = CertPoster

export default CertPoster
