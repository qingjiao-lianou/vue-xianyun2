<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{orderInfo.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
import { setInterval, clearInterval } from "timers";
export default {
  data() {
    return {
      orderInfo: {}, //订单详情
      timer: null //定时器变量
    };
  },
  // 请求订单详情
  mounted() {
    this.$axios({
      url: `/airorders/${this.$route.query.id}`,
      headers: {
        Authorization: `Bearer ${this.$store.state.userInfo.token}`
      }
    }).then(res => {
      console.log(res);
      this.orderInfo = res.data;
      // 获取canvas元素
      const canvas = document.getElementById("qrcode-stage");
      // 二维码链接
      const { code_url } = res.data.payInfo;
      QRCode.toCanvas(canvas, code_url, {
        width: 200
      });
      this.timer = setInterval(() => {
        this.getPaying();
      }, 3000);
    });
  },
  //   组件离开时触发方法
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    //   查询付款结果
    getPaying() {
      this.$axios({
        url: "/airorders/checkpay",
        method: "post",
        headers: {
          Authorization: `Bearer ${this.$store.state.userInfo.token}`
        },
        data: {
          id: this.$route.query.id,
          nonce_str: this.orderInfo.price,
          out_trade_no: this.orderInfo.orderNo
        }
      }).then(res => {
        console.log(res);
        const { statusTxt } = res.data;
        if (statusTxt === "支付完成") {
          clearInterval(this.timer);
          this.timer = null;
          this.$alert("支付成功", "提示");
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>