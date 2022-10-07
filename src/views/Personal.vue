<template>
  <div>
    <a-affix :offset-top="0">
      <Top :nav="topNav"></Top>
    </a-affix>
    <div class="user-head" @click="goLogin">
      <img :src="userInfo.avatar" alt="" style="background-color: #e1e1e1">
      <div class="user-info">
        <div>
          <span class="user-name">{{ userInfo.name }}</span>
          <span class="level" v-show="isLogin">Lv.{{ userInfo.level }}</span>
        </div>
        <span style="color: #777777;letter-spacing: 2px">{{ userInfo.signature }}</span>
      </div>
    </div>
    <div class="other-info" v-if="isLogin">
      <div class="one">
        <span style="font-size: 25px;font-weight: 600">{{ userInfo.atten.length }}</span>
        <span style="color: #777">关注</span>
      </div>
      <div class="one">
        <span style="font-size: 25px;font-weight: 600">{{ userInfo.fans.length }}</span>
        <span style="color: #777">粉丝</span>
      </div>
      <div class="one">
        <span style="font-size: 25px;font-weight: 600">{{ userInfo.praise }}</span>
        <span style="color: #777">获赞</span>
      </div>
      <div class="one">
        <span style="font-size: 25px;font-weight: 600">{{ userInfo.browse }}</span>
        <span style="color: #777">历史浏览</span>
      </div>
    </div>

    <div class="user-game" v-if="isLogin">
      <div class="nav">
        <ul>
          <li>关注游戏</li>
          <li class="active">拥有游戏</li>
          <li>完美通关</li>
          <li>我的评分</li>
        </ul>
      </div>
      <div class="explain">
        <input type="text" placeholder="搜索">
        <span style="width: 100px">总时长</span>
        <span>两周时长</span>
        <span>成就</span>
      </div>
      <div class="game-list">
        <div class="one-game" v-for="game in myGame" :key="game.id" @click="gameDetail(game.id)">
          <img :src="game.other.covers[0]" alt="">
          <div class="other">
            <div class="center">
              <span style="font-size: 16px;font-weight: 600">{{ game.other.name }}</span>
              <span class="game-time">
                  <span style="font-weight: 600">{{ game.totalTime }}h</span>
                  <span style="color: #aaa">{{ game.recentTime }}h</span>
                </span>
              <a-progress
                  :percent="Math.round(game.totalTime/game.other.avgTime*100)"
                  size="small" :show-info="false"
                  style="line-height: 3px"
                  :stroke-color="getColor(Math.round(game.totalTime/game.other.avgTime*100))"
              />
            </div>
            <div class="right">
              {{ game.myAchievements }} / {{ game.other.achievements }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Top from '/src/components/TopNav.vue'
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore()
const router = useRouter()

//判断当前登录状态
const isLogin = computed(() => {
  return store.state.userInfo;
})

const topNav = [
  {
    text: '数据',
    path: '#'
  },
  {
    text: '动态',
    path: '#'
  }
]

//用户拥有的游戏列表
const myGame = ref([])

//当前用户信息
const userInfo = computed(() => {
  //已登录获得信息，否则写死数据提示用户登录
  if (isLogin.value) {
    return store.state.userInfo
  } else {
    return {
      name: '点击登录',
      signature: '登录解锁更多精彩内容~',
      avatar: '/head2.png',
    }
  }
})

//降序排序条件
function compare(property) {
  return function (a, b) {
    const value1 = a[property];
    const value2 = b[property];
    return -(value1 - value2);
  }
}

onMounted(() => {
  //判断是否在已登录状态
  if (isLogin.value) {
    const user = store.state.userInfo
    const games = store.state.gameList;
    //过滤并拼接数据
    for (const ownGame of user.ownGames) {
      ownGame.other = games.filter((item) => item.id === ownGame.id)[0]
    }
    //按照recentTime字段排序并得出最终结果
    myGame.value = user.ownGames.sort(compare('recentTime'))
  }
})
//去登录
const goLogin = () => {
  //如果已经登录，则直接return，不跳转
  if (isLogin.value) {
    return;
  }
  router.push('/login')
}

//根据游玩时常，进度条色彩不同
const getColor = (s) => {
  if (s >= 90) {
    return '#ff8e1e';
  } else if (s >= 70 && s < 90) {
    return '#EE00BE';
  } else if (s >= 50 && s < 70) {
    return '#2b80fd';
  } else {
    return '#63f142';
  }
}

const gameDetail = (id) =>{
  router.push({name: 'detail', params: {id: id}})
}
</script>

<style scoped>
.user-head {
  height: 80px;
  margin: 10px 10px 0 10px;
  display: flex;
}

.user-head img {
  height: 80px;
  width: 80px;
  border-radius: 50%;
}

.user-head .user-info {
  padding: 9px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.user-head .user-info .user-name {
  font-size: 20px;
  font-weight: 700;
}

.user-head .user-info .level {
  background-color: black;
  color: white;
  margin-left: 5px;
  padding: 0 5px;
  font-size: 12px;
  border-radius: 3px;
}

.other-info {
  height: 60px;
  margin: 10px;
  display: flex;
}

.other-info .one {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 25%;
}

.user-game .nav {
  margin: 0 10px;
}

.user-game .nav ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f8f8;
  height: 37px;
  border-radius: 3px;
  color: #7a7a7a;
  font-weight: 550;
  font-size: 15px;
}

.user-game .nav ul li {
  width: 25%;
  text-align: center;
  cursor: pointer;
}

.user-game .nav ul li.active {
  background-color: white;
  padding: 4px 0;
  color: black;
  border-radius: 3px;
}

.user-game .explain {
  padding: 0 10px;
  display: flex;
  justify-content: left;
  align-content: center;
}

.user-game .explain input {
  padding-left: 3px;
  width: 100px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  outline: none;
}

.user-game .explain input::placeholder {
  color: #d3d3d3;
}

.user-game .explain span {
  margin-left: 20px;
}

.game-list {
  margin: 0 10px;
}

.game-list .one-game {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.game-list .one-game img {
  width: 30%;
  /*height: 70px;*/
  object-fit: cover;
  border-radius: 4px;
}

.game-list .one-game .other {
  width: 68%;
  height: 70px;
  /*border-bottom: 1px solid #e0e0e0;*/
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.game-list .one-game .other .center {
  width: 70%;
  height: 100%;
  padding: 0 0 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.game-list .one-game .other .center .game-time {
  display: flex;
  justify-content: space-between;
}

.game-list .one-game .other .right {
  font-size: 16px;
  font-weight: 550;
}
</style>