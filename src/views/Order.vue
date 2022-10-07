<template>
  <a-affix :offset-top="0">
    <div class="top">
      <div class="left" @click="router.go(-1)">
        <span class="iconfont icon-zuojiantou topIcon"></span>
      </div>
      <div class="center">
        <span>确认订单</span>
      </div>
      <div class="right">
        <span class="iconfont icon-more topIcon"></span>
      </div>
    </div>
  </a-affix>
  <div class="main">
    <div class="orderInfo">
      <div style="font-weight: 550">CDKEY（游戏）</div>
      <div class="gameInfo">
        <div class="cover">
          <img :src="pic" alt="">
        </div>
        <div style="display: flex;flex-direction: column;width: 66%">
          <div style="font-size: 16px;font-weight: 550">
            {{ orderInfo.name }}
          </div>
          <div style="font-size: 13px;color: #8f8f8f;white-space: nowrap;text-overflow: ellipsis;overflow: hidden">
            数量×1；{{ orderInfo.name }}；CKDKEY
          </div>
          <div style="font-size: 12px;color: #bbb">
            CDKEY国区账号激活
          </div>
          <div style="font-size: 17px;font-weight: 550">
            ￥{{ orderInfo.nowPrice }}
          </div>
        </div>
      </div>
    </div>

    <div class="orderInfo">
      <div style="font-weight: 550">支付方式</div>
      <a-radio-group v-model:value="value" style="width: 100%">
        <div class="payWay">
          <div style="display: flex;align-items: center">
            <span class="iconfont icon-zhifubao iconPay"></span>
            <span style="font-size: 16px;font-weight: 550">支付宝支付</span>
          </div>
          <div>
            <a-radio value="1"></a-radio>
          </div>
        </div>
        <div class="payWay">
          <div style="display: flex;align-items: center">
            <span class="iconfont icon-weixinzhifu iconWechat"></span>
            <span style="font-size: 16px;font-weight: 550">微信支付</span>
          </div>
          <div>
            <a-radio value="2"></a-radio>
          </div>
        </div>
      </a-radio-group>
    </div>

    <div class="orderInfo">
      <div style="font-weight: 550">价格明细</div>
      <div class="one">
        <span>商品总价</span>
        <span>￥{{ orderInfo.nowPrice }}</span>
      </div>
      <div class="one">
        <span>H币底现</span>
        <span style="color:black;">
          可抵￥{{ Math.round(orderInfo.nowPrice * 0.2 * 100) / 100 }}
          <span class="iconfont icon-arrow-right" style="font-size: 13px"></span>
        </span>
      </div>
      <div class="one">
        <span>专属福利</span>
        <span style="color: #8f8f8f">
          邀请Steam好友获得额外优惠
          <span class="iconfont icon-arrow-right" style="font-size: 13px"></span>
        </span>
      </div>
      <a-divider style="margin: 12px 0"/>
      <div class="one" style="margin: 10px 0 0 0">
        <span>实付款</span>
        <span style="color: black;font-size: 20px;font-weight: 800">
          ￥{{ Math.round((orderInfo.nowPrice - orderInfo.nowPrice * 0.2) * 100) / 100 }}
        </span>
      </div>
    </div>
    <div style="text-align:center;color: #aaa;margin-top: 20px">《小黑盒商城购买协议》</div>
  </div>

  <div class="order-bottom">
    <div class="left">共1件</div>
    <div style="display: flex;align-items: center">
      <div class="center">合计:
        <span class="orderPrice">
          ￥{{ Math.round((orderInfo.nowPrice - orderInfo.nowPrice * 0.2) * 100) / 100 }}
        </span>
      </div>
      <div class="right">
        <div @click="isShow">支付订单</div>
      </div>
    </div>
  </div>

  <a-drawer placement="bottom" :closable="false" v-model:visible="visible">
    <div style="display:flex;flex-direction: column;align-items: center;justify-content: center;">
      <img src="/ikun.png" width="250" height="250" alt="" style="margin-top: 20px">
      <div style="margin-top: 10px">
        <span class="hasPay" @click="payMoney">
          已扫码付款
        </span>
      </div>
    </div>
  </a-drawer>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {Toast2} from "../util/toast.js";

const router = useRouter()
const store = useStore()
const route = useRoute()

//付款二维码对话框是否显示
const visible = ref(false)

const pic = ref('')
const orderInfo = ref({});
//微信支付或支付宝支付
const value = ref('1');

//点击支付弹出二维码
const isShow = () => {
  //判断当前用户是否已拥有该游戏，是，则直接return，提示已拥有
  for (let item of store.state.userInfo.ownGames) {
    if (item.id === orderInfo.value.id) {
      Toast2("您已拥有该游戏！<br>请勿重复购买！", 1500)
      return;
    }
  }
  return visible.value = true //否则打开付款码
}
//点击已经付款弹出提示并跳转
const payMoney = () => {
  //构造购买的游戏信息
  let newGame = {
    id: orderInfo.value.id,
    totalTime: 0,
    recentTime: 0,
    myAchievements: 0,
    other: {}
  }
  store.commit("addGame", newGame); //在原有数据上追加该游戏
  visible.value = false; //关闭付款码
  Toast2("您 已 成 功 付 款<br>感 谢 您 的 购 买 ！", 1500)
  router.replace('/games')
}
//页面挂载时加载数据
onMounted(() => {
  const res = store.state.gameList
  const game = res.filter((item) => item.id + '' === route.params.id)
  orderInfo.value = game[0]
  pic.value = orderInfo.value.covers[0]
})
</script>

<style scoped>
.top {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px;
  font-size: 16px;
  font-weight: 550;
  background-color: white;
}

.topIcon {
  font-size: 24px;
  font-weight: 800;
}

.main {
  background-color: #f3f3f3;
  width: 100%;
  height: 93vh;
  padding: 10px;
}

.main .orderInfo {
  width: 100%;
  border-radius: 4px;
  background-color: white;
  padding: 10px 15px 13px 15px;
  margin-bottom: 10px;
}

.main .orderInfo .gameInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  margin-top: 10px;
}

.main .orderInfo .gameInfo .cover {
  width: 30%;
  height: 100px;
  border-radius: 3px;
  border: 1px solid #e9e9e9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main .orderInfo .gameInfo .cover img {
  width: 90%;
  height: 50%;
  object-fit: cover;

}

.orderInfo .payWay {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.orderInfo .payWay .iconPay {
  font-size: 40px;
  color: blue;
}

.orderInfo .payWay .iconWechat {
  font-size: 33px;
  margin: 0 5px;
  color: #00af00;
}

.orderInfo .one {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  color: #8d8d8d;
  font-weight: 550;
}

.order-bottom {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: 0 -1px 1px #f3f3f3;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0 10px;
  font-size: 16px;
  font-weight: 550;
  color: #6e6e6e;
}

.order-bottom .center {
  margin-right: 10px;
}

.order-bottom .right {
  background-color: black;
  text-align: center;
  line-height: 45px;
  color: white;
  width: 150px;
  font-size: 20px;
  font-weight: 550;
  border-radius: 3px;
  cursor: pointer;
}

.orderPrice {
  color: black;
  font-size: 20px;
  font-weight: 800;
}

.hasPay {
  font-size: 17px;
  background-color: black;
  color: white;
  padding: 10px 20px;
  font-weight: 550;
  border-radius: 4px;
  cursor: pointer;
}
</style>