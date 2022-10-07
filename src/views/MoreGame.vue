<template>
  <a-affix :offset-top="0">
    <div class="top">
      <div class="left" @click="router.go(-1)">
        <span class="iconfont icon-zuojiantou topIcon"></span>
      </div>
      <div class="center">
        <span>{{ moreInfo.title }}</span>
      </div>
      <div/>
    </div>
  </a-affix>
  <!-- 列表内容 -->
  <div class="rankings" v-for="(game,index) in moreInfo.games" :key="index" @click="gameDetail(game.id)">
    <div class="left">
      <img :src="game.covers[0]" alt="">
      <div style="width: 65%;margin: auto 0">
        <div class="game-name">{{ game.name }}</div>
        <div style="padding: 0 5px;margin-top:10px;">
          <div style="display: flex;align-items: center;justify-content: space-between;">
            <div class="game-price2">
              <img src="/xhh.png" alt="" style="width: 20px;height: 20px;margin: 0">
              <span style="line-height: 20px" v-if="game.nowPrice!==0">
                ￥{{ game.nowPrice }}
                <s class="grey-color" v-if="game.nowPrice!==game.originalPrice">
                  ￥{{ game.originalPrice }}
                </s>
              </span>
              <span style="line-height: 20px" v-else>
                免费
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {computed} from "vue";
import {useStore} from "vuex";

const router = useRouter()
const store = useStore()
const moreInfo = computed(() => {
  return store.state.moreGame;
})
const gameDetail = (id) => {
  router.push({name: 'detail', params: {id: id}})
}
</script>

<style scoped>
.top {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 16px;
  font-weight: 550;
  background-color: white;
}

.topIcon {
  font-size: 24px;
  font-weight: 800;
}

.rankings {
  margin: 13px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rankings .left {
  width: 100%;
  display: flex;
}

.rankings .left img {
  width: 35%;
  height: 70px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 5px;
}

.game-price2 {
  background-color: #efefef;
  display: flex;
  align-items: center;
  padding-right: 5px;
}

.grey-color {
  color: #aaa;
}

.game-name {
  font-size: 18px;
  font-weight: 550;
}
</style>