<template>
  <a-affix :offset-top="0">
    <div class="top">
      <span class="iconfont icon-zuojiantou iconTop" style="width: 70px" @click="router.go(-1)"></span>
      <div class="center">
        <span style="margin-right: 20px;border-bottom: 2px solid black;padding: 10px 0">正文</span>
        <span style="color: #aaa">评论</span>
      </div>
      <div class="right">
        <span class="iconfont icon-fenxiang iconTop" style="margin-right: 10px"></span>
        <span class="iconfont icon-more iconTop"></span>
      </div>
    </div>
  </a-affix>
  <div class="content">
    <img :src="articleInfo.cover" alt="">
    <div class="title">{{ articleInfo.title }}</div>
    <div class="author">
      <div class="left">
        <img :src="articleInfo.author.avatar" alt="">
        <div>
          <div style="font-size: 16px;font-weight: 550">{{ articleInfo.author.name }}</div>
          <div style="color: #aaa">{{ articleInfo.author.time }}</div>
        </div>
      </div>
      <div class="right">
        <span class="iconfont icon-jia"></span>&nbsp;
        <div class="btn">关注</div>
      </div>
    </div>
  </div>

  <div class="text">
    <p>
      {{ articleInfo.text }}
    </p>

  </div>
  <div class="btnDashang">
    <span>打赏作者</span>
  </div>
  <br><br><br><br><br><br>
  <div class="bottom">
    <input type="text" placeholder="评论">
    <div class="right">
      <div class="oneIcon">
        <span class="iconfont icon-shoucang" style="font-size: 25px;padding:0;line-height: 20px"></span>
        <span style="padding: 0;font-size: 13px;align-content: center;">收藏</span>
      </div>
      <div class="oneIcon">
        <span class="iconfont icon-chongdian" style="font-size: 25px;padding:0;line-height: 20px"></span>
        <span style="padding: 0;font-size: 13px;align-content: center;">4</span>
      </div>
      <div class="oneIcon">
        <span class="iconfont icon-dianzan" style="font-size: 25px;padding:0;line-height: 20px"></span>
        <span style="padding: 0;font-size: 13px;align-content: center;">55</span>
      </div>
      <div class="oneIcon">
        <span class="iconfont icon-pinglun2" style="font-size: 25px;padding:0;line-height: 20px"></span>
        <span style="padding: 0;font-size: 13px;align-content: center;">评论</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";
import {useStore} from "vuex";

const router = useRouter()
const store = useStore()
const route = useRoute()

//根据ID获得对应文章所有信息
const articleInfo = computed(() => {
  const articleList = store.state.articleList
  for (let article of articleList) {
    if (article.id + '' === route.params.id) {
      return article;
    }
  }
})

</script>

<style scoped>
.top {
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  background-color: white;
}

.iconTop {
  font-size: 25px;
}

.content img {
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
}

.content .title {
  padding: 0 10px;
  font-size: 20px;
  font-weight: 550;
}

.content .author {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content .author .left {
  display: flex;
  align-items: center;
}

.content .author .left img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.content .author .right {
  background-color: black;
  padding: 5px 10px;
  color: white;
  display: flex;
  border-radius: 3px;
}

.text {
  padding: 0 10px;
  font-size: 17px;
  line-height: 200%;
  letter-spacing: 2px;
}

.bottom {
  padding: 0 10px;
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bottom input {
  padding-left: 10px;
  border-radius: 3px;
  border: 0;
  background-color: #ececec;
  height: 30px;
  margin-right: 10px;
  width: 45%;
}

.bottom .right {
  display: flex;
  width: 45%;
  justify-content: space-between;
}

.bottom .right .oneIcon {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #aaa;
}

.btnDashang {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btnDashang span {
  background-color: black;
  color: white;
  padding: 8px 15px;
  border-radius: 3px;
  font-size: 17px;
  font-weight: 550;
}
</style>