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


## 特性
- 从争流科技后台和 H5 业务中抽离出来的组件
- 原生 CSS，支持 Less、Scss 等预编译语言
- 桌面端和移动端效果一致

## 使用
1. 安装

``` bash
npm i -S vue-cert-poster
```

2. 引入组件

``` bash
import CertPoster from 'vue-cert-poster'

Vue.use(CertPoster)
```

3. 调用示例

``` bash
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
            '在 2020 年 12 月中，工作认真、能力突出、表现优异，被评为“最佳员工”，特发此证，以资鼓励。', // 证书内容
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
        certNumber: this.certDetail.number,
        width: '600px',
        height: '460px'
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
```
或者
```
<template>
  <div id="app">
    <button @click="onCreate">
      生成证书海报
    </button>

    <img
      :src="posterUrl"
    >

    <cert-poster
      ref="certPoster" 
      width="600px"
      height="460px"
      :cert-title="certDetail.title"
      :cert-background="certDetail.background"
      :cert-stamp="certDetail.stamp"
      :cert-content="certDetail.content"
      :cert-signature="certDetail.signature"
      :cert-number="certDetail.number"
      @success="onSuccess"
    />
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
    onSuccess(posterUrl){
      this.posterUrl = posterUrl // 海报 base64 地址
    },

    onCreate() {
      this.$refs.certPoster.create()
    }
  }
}
</script>
```

## Prop
| 参数 | 说明 | 类型 | 默认值 |
| - | - | - | - |
| width | 证书宽，为保证清晰度，生成成功后会放大三倍 | `String` | `600px` |
| height | 证书高，为保证清晰度，生成成功后会放大三倍 | `String` | `460px` |
| certTitle | 证书标题 | `String` | `''` |
| certBackground | 证书背景 | `String` | `''` |
| certStamp | 证书盖章 | `String` | `''` |
| certGreet | 证书问候语 | `String` | `''` |
| certContent | 证书内容，回车符（`\n` 或 `↵`）自动转为 `<br>`，空格符自动转为 `&nbsp;` | `HTML` | `''` |
| certSignature | 证书署名，回车符（`\n` 或 `↵`）自动转为 `<br>`，空格符自动转为 `&nbsp;` | `HTML` | `''` |
| certNumber | 证书编号 | `String` | `''` |
| showCertGreet | 是否显示证书问候语 | `Boolean` | `false` |

## Event
| 事件 | 说明 | 回调 |
| - | - | - |
| success | 生成成功后触发 | imageUrl |
| fail | 生成失败后触发 | - |

## 许可证
`MIT`

## 最后
使用过程中发现任何问题都可以提 `Issue`，也非常欢迎提 `PR`
