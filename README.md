<h3 align="center" style="margin: 30px 0 35px;">Vue 生成证书海报组件</h3>

<p align="center">
    <img src="https://img.shields.io/npm/v/vue-cert-poster.svg" alt="npm version" />
    <img src="https://img.shields.io/bundlephobia/minzip/vue-cert-poster.svg" alt="Build Status" />
    <img src="https://img.shields.io/github/license/1014156094/vue-cert-poster" alt="Build Status" />
    <img src="https://img.shields.io/github/forks/1014156094/vue-cert-poster" alt="Build Status" />
    <img src="https://img.shields.io/github/issues/1014156094/vue-cert-poster" alt="Build Status" />
    <img src="https://img.shields.io/github/stars/1014156094/vue-cert-poster" alt="Build Status" />
</p>

---

## 最终效果
![image](https://github.com/1014156094/vue-cert-poster/blob/master/public/result.png?raw=true)


## 说明
- 从争流科技后台和 H5 业务中抽离出来的组件，可能不适用您的业务
- 原生 CSS，支持 Less、Scss 等预编译语言

## 使用
1. 安装

``` bash
npm i -S vue-cert-poster
```

2. 引入组件

``` bash
import CertPoster from 'vue-cert-poster'
import 'vue-cert-poster/lib/vue-cert-poster.css'

Vue.use(CertPoster)
```

3. 调用示例

``` bash
<template>
  <div>
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
        certStyleSetting: this.currentCertDetail.cert_style_setting,
        certAwardName: this.currentCertDetail.cert_award_name,
        certNumber: this.currentCertDetail.number,
        enrollName: this.currentCertDetail.enroll_name
      }).then(posterUrl => {
        this.posterUrl = posterUrl
      })
    }
  }
}
</script>
```

## Prop
| 参数 | 说明 | 类型 | 默认值 |
| - | - | - | - |
| certTitle | 证书标题 | `String` | '' |
| certBackground | 证书背景 | `String` | '' |
| certStamp | 证书盖章 | `String` | '' |
| certGreet | 证书问候语 | `String` | '' |
| certContent | 证书内容 | `String` | '' |
| certSignature | 证书署名 | `String` | '' |
| certNumber | 证书编号 | `String` | '' |

## 许可证
`MIT`

## 最后
使用过程中发现任何问题都可以提 `Issue`，也非常欢迎提 `PR`
