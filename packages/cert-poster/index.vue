<!-- 生成证书海报组件 -->
<!-- eslint-disable vue/no-v-html -->

<template>
  <div
    ref="componentContainer"
    class="cert-poster"
    :style="{
      width,
      height
    }"
  >
    <img
      class="cert-poster__background"
      :src="certBackground"
    >
    <div class="cert-poster__title">
      {{ certTitle }}
    </div>
    <div
      v-if="showCertGreet"
      class="cert-poster__greet"
    >
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
import html2canvas from "html2canvas";

export default {
  name: "CertPoster",

  props: {
    value: {
      type: Boolean,
      default: false
    },

    // 证书宽
    width: {
      type: String,
      default: '600px'
    },

    // 证书高
    height: {
      type: String,
      default: '460px'
    },

    // 证书标题
    certTitle: {
      type: String,
      default: ""
    },

    // 证书背景
    certBackground: {
      type: String,
      default: ""
    },

    // 证书盖章
    certStamp: {
      type: String,
      default: ""
    },

    // 证书问候语
    certGreet: {
      type: String,
      default: ""
    },

    // 证书内容
    certContent: {
      type: String,
      default: ""
    },

    // 证书署名
    certSignature: {
      type: String,
      default: ""
    },

    // 证书编号
    certNumber: {
      type: String,
      default: ""
    },

    // 是否显示证书问候语
    showCertGreet: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    value(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.create()
        });
      }
    },

    certContent(newVal) {
      this.certContent = this.format(newVal);
    },

    certSignature(newVal) {
      this.certSignature = this.format(newVal);
    }
  },

  methods: {
    // 格式化内容
    format(str) {
      const list = [
        ()=> str.replace(/\n|↵/g, "<br>"), // 回车转为 HTML 换行
        ()=> str.replace(/\s/g, "&nbsp;") // 空格符转为 &nbsp;
      ]

      list.forEach(elm => {
        str = elm()
      })

      return str
    },

    // 生成海报
    create() {
      // 官方文档 http://html2canvas.hertzen.com/configuration/
      const opts = {
        scale: 3, // 【重要】画布像素大小倍数。默认为浏览器设备像素比。
        // logging: true, // 日志开关，便于查看 html2canvas 的内部执行流程
        useCORS: true, // 【重要】开启跨域配置
        allowTaint: true, // 【重要】开启画布污染
        backgroundColor: "#0000", // 背景颜色
        scrollY: 0 // 【重要】设为 0，修复 bug，https://github.com/niklasvh/html2canvas/issues/1878
      };

      // HTML 转成画布
      html2canvas(this.$refs.componentContainer, opts)
        .then(canvas => {
          const base64 = canvas.toDataURL("image/jpeg"); // 画布转为 base64 图片

          this.$emit("success", base64);
        })
        .catch(() => {
          this.$emit("fail");
        });
    },
  }
};
</script>

<style>
.cert-poster {
  position: fixed;
  top: -999999px;
  left: -999999px;
  padding: 104px 60px 38px;
  color: #444244;
  font-size: 12px;
  font-weight: 400;
  box-sizing: border-box;
  /* 参考自 Ant Design */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
  padding-bottom: 20px;
  font-size: 20px;
  font-weight: 800;
  text-align: center;
}

.cert-poster .cert-poster__greet {
  font-size: 16px;
  color: #b48d2c;
  font-weight: 800;
  text-align: center;
  padding-bottom: 10px;
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
  width: 220px;
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
