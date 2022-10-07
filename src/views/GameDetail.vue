<template>
  <a-affix :offset-top="0">
    <div class="top">
      <div class="left" @click="router.go(-1)">
        <span class="iconfont icon-zuojiantou topIcon"></span>
      </div>
      <div class="center">
        <span>{{ gameInfo.name }}</span>
      </div>
      <div class="right">
        <span class="iconfont icon-fenxiang topIcon"></span>
      </div>
    </div>
  </a-affix>
  <div style="background-color: #3d3d3d">
    <div class="showImg" style="width: 100%;height: 200px">
      <img :src="nowPic" alt="" style="" class="picStyle">
    </div>
    <div class="scrollPic">
      <div v-for="(pic,index) in pics" class="scrollOne" @click="getImgUrl(pic)" :key="index">
        <img :src="pic" alt="" class="picStyle" :class="pic===nowPic?'active':''">
      </div>
    </div>
    <div class="priceInfo">
      <div class="left" v-if="gameInfo.nowPrice!==0">
        <span class="nowPrice">￥{{ gameInfo.nowPrice }}</span>
        <div style="border-radius: 3px" v-if="gameInfo.nowPrice<gameInfo.originalPrice">
          <span style="background-color: #40d900;padding: 0 2px">
            -{{ Math.round(((gameInfo.originalPrice - gameInfo.nowPrice) / gameInfo.originalPrice) * 100) }}%
          </span>
          <span style="background-color: #888888;padding: 0 2px">
            <s>￥{{ gameInfo.originalPrice }}</s>
          </span>
        </div>
      </div>
      <div class="left" v-else>
        <span style="font-size: 20px;font-weight: 800;margin-right: 10px;margin-left: 10px;">免费</span>
      </div>
      <div class="right">
        <span class="priceQushi">
          全区价格/趋势
          <span class="iconfont icon-sanjiaoright"></span>
        </span>
      </div>
    </div>
  </div>
  <div class="game-name">
    <div class="left">
      <div style="font-size: 20px;font-weight: 550">{{ gameInfo.name }}</div>
      <div style="font-size: 14px;font-weight: 550;color: #939393">{{ gameInfo.enName }}</div>
    </div>
    <div class="right">
      <div class="score-top" :class="scoreColor">
        <area-chart-outlined/>
        {{ gameInfo.score }}
      </div>
      <div class="bottom">{{ gameInfo.scoreNum }}人评分</div>
    </div>
  </div>

  <div class="game-intro">
    <div class="title">
      <span>游戏简介</span>
      <div class="more">
        <span>更多</span>
        <span class="iconfont icon-arrow-right"></span>
      </div>
    </div>
    <p>{{ gameInfo.intro }}</p>
  </div>
  <div class="det-bott">
    <div class="guanzhu">
      <span class="iconfont icon-aixin" style="font-size: 25px;line-height: 24px"></span>
      <span>关注</span>
    </div>
    <div class="buy">
      <div @click="pay(gameInfo.id)">￥{{ gameInfo.nowPrice }}购买</div>
    </div>
  </div>
</template>

<script setup>
import {AreaChartOutlined} from '@ant-design/icons-vue';
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {Toast} from "../util/toast.js";

const router = useRouter();
const route = useRoute()
const store = useStore()

let gameInfo = ref({})
const pics = ref()
const nowPic = ref()
//当前轮播所显示的图片
const getImgUrl = (pic) => {
  nowPic.value = pic;
};

//挂载时获取游戏信息
onMounted(async () => {
  const res = store.state.gameList
  const game = res.filter((item) => item.id + '' === route.params.id)
  gameInfo.value = game[0]
  pics.value = game[0].covers
  nowPic.value = game[0].covers[0]
})
//判断登录状态
const isLogin = computed(() => {
  return store.state.userInfo;
})

//根据评分获得不同背景色
const scoreColor = computed(() => {
  const s = gameInfo.value.score;
  if (s >= 9) {
    return 'color2';
  } else if (s >= 7 && s < 9) {
    return 'color1';
  } else if (s >= 5 && s < 7) {
    return 'color3';
  } else {
    return 'color4';
  }
})

//付款时跳转
const pay = (id) => {
  //登录状态才能付款，否则提示未登录
  if (isLogin.value) {
    router.push({name: 'order', params: {id}})
  } else {
    Toast("您尚未登录，请先登录", 1000)
  }
}
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

.scrollPic {
  height: 60px;
  display: flex;
  width: 100%;
  overflow: scroll;
  background-color: #2c2c2c;
}

.scrollPic::-webkit-scrollbar {
  display: none
}

.scrollOne {
  margin: 5px 3px;
  white-space: nowrap;
  flex-basis: 85px;
  flex-shrink: 0;
}

.picStyle {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.active {
  border: 3px solid white;
}

.priceInfo {
  height: 55px;
  display: flex;
  align-items: center;
  color: white;
  justify-content: space-between;
}

.priceInfo .left {
  display: flex;
  align-items: center;
}

.priceInfo .left .nowPrice {
  font-size: 30px;
  font-weight: 800;
  margin-right: 10px;
  margin-left: 10px;
}

.priceInfo .right .priceQushi {
  display: flex;
  align-items: stretch;
  height: 24px;
  background-color: #626262;
  padding-left: 5px;
  margin-right: 10px;
}

.game-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*background-color: #55a532;*/
  padding: 20px 10px;
}

.game-name .right {
  text-align: center;
}

.game-name .right .score-top {
  color: white;
  font-weight: 800;
  padding: 0 10px;
  font-size: 25px;
  border-radius: 3px 3px 0 0;
}

.game-name .right .color1 {
  background-color: #EE00BE;
}

.game-name .right .color2 {
  background-color: #ff8e1e;
}

.game-name .right .color3 {
  background-color: #2b80fd;
}

.game-name .right .color4 {
  background-color: #63f142;
}

.game-name .bottom {
  background-color: #f3f3f3;
  border-radius: 0 0 3px 3px;
}

.game-intro {
  padding: 0 10px;
}

.game-intro p {
  margin: 10px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-overflow: ellipsis;
}

.game-intro .title {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 550;
  align-items: center;
}

.game-intro .title .more {
  font-size: 14px;
}


.det-bott {
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
}

.det-bott .guanzhu {
  width: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.buy {
  padding: 5px 10px;
  width: 85%;
}

.buy div {
  background-color: black;
  text-align: center;
  line-height: 45px;
  color: white;
  width: 100%;
  font-size: 20px;
  font-weight: 550;
  border-radius: 3px;
  cursor: pointer;
}
</style>