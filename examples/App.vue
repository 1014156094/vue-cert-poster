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
      // 变量：{选手姓名}、{大赛名称}、{奖项}、{编号}、{YYYYMMDD}、{YYYY年MM月}
      // 如果 cert_style_setting 内 key 的值存在以上变量
      // enroll_name 会替换 {选手姓名}
      // match_name 会替换 {大赛名称}
      // cert_award_name 会替换 {奖项}
      // number 会替换 {编号}
      // 当前日期 会替换 {YYYYMMDD}，例：20200409
      // 当前日期 会替换 {YYYY年MM月}，例2020年04月
      // 例：我是{选手姓名}，我正在参加选美大赛。会将 “{选手姓名}” 替换为 enroll_name 的值
      currentCertDetail: {
        number: 7, // 选手编号
        match_name: '11', // 大赛名称
        enroll_name: 'VV', // 选手姓名
        enroll_mobile: '11111111111', // 选手手机号码
        cert_award_name: '22', // 获奖名称
        cert_style_setting: {
          title: '最佳渣男证书', // 证书标题
          background_url:
            'http://cdn.towinos.com/committee/cert/style/2/edit/20200407103146-2142379266903-cert-default-background.png?imageView2/2/w/1920', // 证书背景
          stamp_url:
            'http://cdn.towinos.com/committee/cert/style/2/edit/20200407023952-367736050162-c4cd5f047be86d3f1545fcf2defe5b09.png?imageView2/2/w/1920', // 证书盖章
          greeting: '亲爱的{选手姓名}', // 称呼
          content:
            'hi，小宝贝{编号}，我是{选手姓名}，我最帅，你最美。吃了没，早点睡，多穿点，喝热水。太晚了，去你家，啥也不干就吃瓜。没电了，在开会，忙了一天我很累。我爱你，别误会，那个女孩是我妹。你干啥，真没有，我们就是喝点儿酒。喝多了，乱说的，我们只是好朋友。别闹了，对不起，反正都是你有理。你很好，我不配，忘了我吧下一位。鉴于你的优秀表现，特发证书以此鼓励。', // 证书内容
          signature: '中国最渣学会\n深圳分会{YYYY年MM月}', // 证书署名
          number: 'ZHA-NAN-{YYYYMMDD}' // 证书编号
        }
      }
    }
  },

  methods: {
    onCreate() {
      this.$certPoster({
        certTitle: this.currentCertDetail.cert_style_setting.title,
        certBackground: this.currentCertDetail.cert_style_setting.background_url,
        certStamp: this.currentCertDetail.cert_style_setting.stamp_url,
        certGreet: this.currentCertDetail.cert_style_setting.greeting,
        certContent: this.currentCertDetail.cert_style_setting.content,
        certSignature: this.currentCertDetail.cert_style_setting.signature,
        certAwardName: this.currentCertDetail.cert_award_name,
        certNumber: this.currentCertDetail.cert_style_setting.number,
        playerNumber: this.currentCertDetail.number,
        playerName: this.currentCertDetail.enroll_name,
        matchName: this.currentCertDetail.match_name
      }).then(posterUrl => {
        this.posterUrl = posterUrl
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
