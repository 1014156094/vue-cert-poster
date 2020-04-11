<!-- 生成证书海报组件 -->
<!-- eslint-disable vue/no-v-html -->

<template>
  <div
    v-if="show"
    ref="componentContainer"
    class="cert-poster"
  >
    <img
      class="cert-poster__background"
      :src="certBackground"
    >
    <div class="cert-poster__title">
      {{ certTitle }}
    </div>
    <div class="cert-poster__name">
      {{ certGreet }}
    </div>
    <div
      class="cert-poster__content"
      v-html="certContent"
    />
    <div class="cert-poster__no">
      证书编号：{{ certNumber }}
    </div>
    <div
      class="cert-poster__signature"
      v-html="certSignature"
    />
    <img
      class="cert-poster__stamp"
      :src="certStamp"
    >
  </div>
</template>

<script>
import dayjs from 'dayjs'
import html2canvas from 'html2canvas'

export default {
  name: 'CertPoster',

  props: {
    value: {
      type: Boolean,
      default: false
    },

    // 证书标题
    certTitle: {
      type: String,
      default: ''
    },

    // 证书背景
    certBackground: {
      type: String,
      default: ''
    },

    // 证书盖章
    certStamp: {
      type: String,
      default: ''
    },

    // 证书问候语
    certGreet: {
      type: String,
      default: ''
    },

    // 证书内容
    certContent: {
      type: String,
      default: ''
    },

    // 证书署名
    certSignature: {
      type: String,
      default: ''
    },

    // 证书奖项名称
    certAwardName: {
      type: String,
      default: ''
    },

    // 证书编号
    certNumber: {
      type: String,
      default: ''
    },

    // 选手编号
    playerNumber: {
      type: Number,
      default: 0
    },

    // 选手姓名
    playerName: {
      type: String,
      default: ''
    },

    // 大赛名称
    matchName: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      show: this.value,
      date: new Date()
    }
  },

  watch: {
    value(newVal) {
      this.show = newVal

      if (newVal) {
        this.$nextTick(() => {
          this.createPoster()
        })
      }
    },

    certTitle: {
      handler: 'updateFieldValue',
      immediate: true
    },

    certBackground: {
      handler: 'updateFieldValue',
      immediate: true
    },

    certStamp: {
      handler: 'updateFieldValue',
      immediate: true
    },

    certGreet: {
      handler: 'updateFieldValue',
      immediate: true
    },

    certContent: {
      handler: 'updateFieldValue',
      immediate: true
    },

    certSignature: {
      handler: 'updateFieldValue',
      immediate: true
    },

    certAwardName: {
      handler: 'updateFieldValue',
      immediate: true
    },

    certNumber: {
      handler: 'updateFieldValue',
      immediate: true
    },

    playerNumber: {
      handler: 'updateFieldValue',
      immediate: true
    },

    playerName: {
      handler: 'updateFieldValue',
      immediate: true
    },

    matchName: {
      handler: 'updateFieldValue',
      immediate: true
    }
  },

  methods: {
    /**
    * 前面补 0
    * @param num 被操作数
    * @param n 固定的总位数
    */
    prefixZero(num, n) {
      return (Array(n).join(0) + num).slice(-n)
    },

    // 内容格式化
    contentFormat(str) {
      // 争流赛事系统的需求，将{编号}等等的变量替换掉
      const list = [
        () => this.playerNumber ? str.replace(/{编号}/g, String(this.playerNumber).length < 6 ? this.prefixZero(this.playerNumber, 5) : this.playerNumber) : str, // 替换为编号
        () => str.replace(/{YYYYMMDD}/g, dayjs(this.date).format('YYYYMMDD')), // 替换为日期
        () => str.replace(/{YYYY年MM月}/g, dayjs(this.date).format('YYYY年MM月')), // 替换为日期
        () => this.certAwardName ? str.replace(/{奖项}/g, this.certAwardName) : str, // 替换为奖项名称
        () => this.playerName ? str.replace(/{选手姓名}/g, this.playerName) : str, // 替换为选手姓名
        () => this.matchName ? str.replace(/{大赛名称}/g, this.matchName) : str, // 替换为大赛名称
        () => str.replace(/\n/g, '<br>') // 回车替换为 HTML 换行
      ]

      list.forEach(elm => {
        str = elm()
      })

      return str
    },

    // 更新字段值
    updateFieldValue() {
      this.certTitle = this.contentFormat(this.certTitle) // 证书标题
      this.certContent = this.contentFormat(this.certContent) // 证书内容
      this.certGreet = this.contentFormat(this.certGreet) // 证书问候语
      this.certNumber = this.contentFormat(this.certNumber) // 证书编号
      this.certSignature = this.contentFormat(this.certSignature) // 证书署名
    },

    // 生成海报
    createPoster() {
      // 官方文档 http://html2canvas.hertzen.com/configuration/
      const opts = {
        scale: 3, // 【重要】画布像素大小倍数。默认为浏览器设备像素比。
        // logging: true, // 日志开关，便于查看 html2canvas 的内部执行流程
        useCORS: true, // 【重要】开启跨域配置
        allowTaint: true, // 【重要】开启画布污染
        backgroundColor: '#0000', // 背景颜色
        scrollY: 0 // 【重要】设为 0，修复 bug，https://github.com/niklasvh/html2canvas/issues/1878
      }

      // HTML 转成画布
      html2canvas(this.$refs.componentContainer, opts)
        .then(canvas => {
          const base64 = canvas.toDataURL('image/jpeg') // 画布转为 base64 图片

          this.$emit('success', base64)
          this.close()
        })
        .catch(() => {
          this.$emit('fail')
          this.close()
        })
    },

    close() {
      this.$emit('input', false)
    }
  }
}
</script>

<style>
.cert-poster {
  position: fixed;
  top: -9999999px;
  left: -9999999px;
  width: 600px;
  height: 460px;
  padding: 104px 60px 38px;
  color: #444244;
  font-size: 12px;
  font-weight: 400;
  box-sizing: border-box;
}

.cert-poster .cert-poster__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.cert-poster .cert-poster__title {
  font-size: 20px;
  font-weight: 800;
  text-align: center;
}

.cert-poster .cert-poster__name {
  font-size: 16px;
  color: #b48d2c;
  padding-top: 19px;
  padding-bottom: 10px;
  font-weight: 800;
  text-align: center;
}

.cert-poster .cert-poster__content {
  line-height: 20px;
  text-indent: 24px;
}

.cert-poster .cert-poster__no {
  position: absolute;
  bottom: 38px;
  left: 60px;
}

.cert-poster .cert-poster__signature {
  position: absolute;
  right: 60px;
  bottom: 38px;
  width: 192px;
  line-height: 20px;
  text-align: right;
}

.cert-poster .cert-poster__stamp {
  position: absolute;
  right: 60px;
  bottom: 29px;
  width: 88px;
  height: 88px;
}
</style>
