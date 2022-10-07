<template>
  <div>
    <a-affix :offset-top="0">
      <Top :nav="topNav"></Top>
    </a-affix>
    <!-- 双列游戏展示 -->
    <div class="item" v-for="(list,index) in gameLists" :key="index">
      <!-- 大标题 -->
      <div class="title">
        <span>{{ list.type }}</span>
        <div class="more" @click="getMoreGames(list.type)">
          <span>更多</span>
          <span class="iconfont icon-arrow-right"></span>
        </div>
      </div>
      <!-- 列表内容 -->
      <div class="content">
        <div class="one-game" v-for="(games,index) in list.games" :key="index" @click="more(games.id)">
          <img :src="games.covers[0]" alt="">
          <div class="game-info">
            <div class="game-name">{{ games.name }}</div>
            <div class="game-price">
              <img src="/xhh.png" alt="" style="width: 20px;height: 20px">
              <span style="line-height: 20px" v-if="games.nowPrice!==0">
                ￥{{ games.nowPrice }}
                <s class="grey-color" v-if="games.nowPrice<games.originalPrice">
                  ￥{{ games.originalPrice }}
                </s>
              </span>
              <span style="line-height: 20px" v-else>
                免费
              </span>
            </div>
            <div style="font-size: 12px;margin-top: 5px">
              <span class="game-tag">{{ games.recomReason }}</span>
              <span class="grey-color" v-if="games.tag.length > 0">{{ games.tag[0] }} | {{ games.tag[1] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 单列游戏展示 -->
    <div class="item" v-for="(list,index) in rankingList" :key="index">
      <!-- 大标题 -->
      <div class="title">
        <span>{{ list.type }}</span>
        <div class="more" @click="getMoreGames(list.type)">
          <span>更多</span>
          <span class="iconfont icon-arrow-right"></span>
        </div>
      </div>
      <!-- 列表内容 -->
      <div class="rankings" v-for="(game,index) in list.games" :key="index" @click="more(game.id)">
        <div class="left">
          <img :src="game.covers[0]" alt="">
          <div style="width: 65%;margin: auto 0">
            <div class="game-name">{{ game.name }}</div>
            <div style="padding: 0 5px;margin-top:10px;">
              <div style="display: flex;align-items: center;justify-content: space-between;">
                <div class="game-price2">
                  <img src="/xhh.png" alt="" style="width: 20px;height: 20px;margin: 0">
                  <span style="line-height: 20px" v-if="game.nowPrice!==0">
                    ￥{{ game.nowPrice }}<s class="grey-color">￥{{ game.originalPrice }}</s>
                  </span>
                  <span style="line-height: 20px" v-else>
                    免费
                  </span>
                </div>

                <a-tag :color="getColor(game.score)" class="tag-style">
                  <template #icon>
                    <area-chart-outlined/>
                  </template>
                  <span style="padding: 0">{{ game.score }}</span>
                </a-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {AreaChartOutlined} from '@ant-design/icons-vue';
import Top from '/src/components/TopNav.vue'
import {useRouter} from "vue-router";
import {computed} from "vue";
import {useStore} from "vuex";

const router = useRouter()
const store = useStore()
//顶部导航信息
const topNav = [
  {
    text: '推荐',
    path: '#'
  },
  {
    text: '榜单',
    path: '#'
  }
]

//双列数据
const gameLists = computed(() => {
  const res = store.state.gameList
  const arr = [{type: '为您推荐', games: []}, {type: 'Steam促销', games: []}]
  const isLogin = store.state.userInfo;
  //推荐游戏数据筛选：根据登录状态，推荐的数据筛选条件不同：登录后会排除已拥有的游戏，不再推荐
  if (isLogin) {
    arr[0].games = res.filter(item => item.recommend && isLogin.ownGames.every(myGame => myGame.id !== item.id)).slice(0, 6)
  } else {
    arr[0].games = res.filter(item => item.recommend).slice(0, 6)
  }
  //Steam促销数据筛选：筛选现价小于原价且不为免费游戏，之后对结果进行促销力度的排序
  arr[1].games = res.filter(item => item.nowPrice < item.originalPrice && item.nowPrice !== 0).sort(compare2('originalPrice', 'nowPrice')).slice(0, 6)
  return arr;
})

//单列数据
const rankingList = computed(() => {
  const res = store.state.gameList
  const rankingArr = [{type: '销量榜', games: []}]
  //对游戏销量进行排序
  rankingArr[0].games = res.sort(compare('salesVolume')).slice(0, 6)
  return rankingArr
})

//根据评分获得不同背景色
const getColor = (score) => {
  if (score < 7.0) {
    return '#4B90F9';
  } else if (score > 7.0 && score < 9.0) {
    return '#EE00BE';
  } else {
    return '#FF9900';
  }
}

//更多游戏
const more = id => {
  router.push({name: 'detail', params: {id: id}})
}

//排序条件
function compare(property) {
  return function (a, b) {
    const value1 = a[property];
    const value2 = b[property];
    return value1 - value2;
  }
}

function compare2(p1, p2) {
  return function (a, b) {
    const value1 = (a[p1] - a[p2]) / a[p1]
    const value2 = (b[p1] - b[p2]) / b[p1]
    return -(value1 - value2);
  }
}

//跳转更多页面
const getMoreGames = (type) => {
  let res = store.state.gameList
  if (type === '为您推荐') {
    const isLogin = store.state.userInfo;
    //同样的，登录后会排除已拥有的游戏推荐
    if (isLogin) {
      res = res.filter((item) => item.recommend && isLogin.ownGames.every(myGame => myGame.id !== item.id))
    } else {
      res = res.filter((item) => item.recommend)
    }
  } else if (type === 'Steam促销') {
    res = res.filter((item) => item.nowPrice < item.originalPrice && item.nowPrice !== 0).sort(compare2('originalPrice', 'nowPrice'))
  } else if (type === '销量榜') {
    res = res.sort(compare('salesVolume'))
  }
  const g = {
    title: type,
    games: res,
  }
  store.commit('setMoreGame', g)
  router.push('/moreGame')
}
</script>

<style scoped>
.item {
  margin: 20px 10px 30px 10px;
}

.item .title {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 550;
  align-items: center;
}

.item .title .more {
  font-size: 14px;
}

.item .content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item .content .one-game {
  width: 47%;
  height: 150px;
  margin: 10px 0;
}

.item .content .one-game .game-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.item .content .one-game img {
  width: 100%;
  height: 58%;
  object-fit: cover;
  border-radius: 5px;
}

.item .rankings {
  width: 100%;
  margin: 13px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item .rankings .left {
  width: 100%;
  display: flex;
}

.item .rankings .left img {
  width: 35%;
  margin-right: 10px;
  border-radius: 5px;
}

.game-name {
  font-size: 15px;
  font-weight: 550;
}

.game-tag {
  background-color: #efefef;
  margin-right: 10px;
  padding: 0 5px;
}

.game-price {
  padding: 0 5px;
  display: flex;
  align-items: center;
  background-color: #efefef;
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

.tag-style {
  font-weight: 600;
  font-size: 15px;
  padding: 0 3px;
}
</style>