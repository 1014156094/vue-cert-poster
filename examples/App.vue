<template>
  <div id="app">
    <button @click="onCreate">
      生成证书海报
    </button>

    <img
      :src="posterUrl"
      width="100%"
    >
  </div>
</template>

<script>
export default {
  name: 'App',
  
  data() {
    return {
      posterUrl: '',
      certDetail: {
          title: '最佳员工奖', // 证书标题
          background:
            'http://cdn.towinos.com/committee/cert/style/2/edit/20200407103146-2142379266903-cert-default-background.png?imageView2/2/w/1920', // 证书背景
          stamp:
            'http://cdn.towinos.com/committee/cert/style/2/edit/20200407023952-367736050162-c4cd5f047be86d3f1545fcf2defe5b09.png?imageView2/2/w/1920', // 证书盖章
          greet: '亲爱的小七哥同志', // 称呼
          content:
            '在 2020 年 12 月中，工作认真、能力突出、表现优异，被评为“最佳员工”。↵↵                                                                                    —— 特发此证，以资鼓励', // 证书内容
          signature: '深圳市某科技有限公司↵2020年12月12日', // 证书署名
          number: 'SHEN-ZHEN-20200415' // 证书编号
      }
    }
  },

  methods: {
    onCreate() {
      this.$certPoster({
        certTitle: this.certDetail.title,
        certBackground: this.certDetail.background,
        certStamp: this.certDetail.stamp,
        certContent: this.certDetail.content,
        certSignature: this.certDetail.signature,
        certNumber: this.certDetail.number
      }).then(posterUrl => {
        // 生成成功
        this.posterUrl = posterUrl // 海报 base64 地址
      }).catch(()=>{
        // 生成失败
      })
    }
  }
}
</script>

<style>
</style>
