<template>
  <a-affix :offset-top="0">
    <Top :nav="topNav"></Top>
  </a-affix>
  <a-carousel class="lunbo" autoplay>
    <img v-for="(img,index) in lbImg" :src="img" :key="index" alt=""
         @click="router.push('/articleDetail/'+ranNum)"/>
  </a-carousel>
  <div v-for="(article,index) in articleList" :key="index">
    <index-article :articleInfo="article" @click="goArticleDetail(article.id)"></index-article>
  </div>
</template>

<script setup>
import Top from '/src/components/TopNav.vue'
import IndexArticle from '/src/components/IndexArticle.vue'
import {useRouter} from "vue-router";
import {computed} from "vue";
import {useStore} from "vuex";

const router = useRouter()
const store = useStore()
const lbImg = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/8.jpg",
  "/7.jpg",
  "/6.jpg",
]
const ranNum = computed(() => {
  return Math.round(Math.random() * 5) + 1
})
const topNav = [
  {
    text: '推荐',
    path: '#'
  },
  {
    text: '热点',
    path: '#'
  }
]
//写死
const articleList = computed(() => {
  return store.state.articleList
})
const goArticleDetail = (id) => {
  router.push({name: 'articleDetail', params: {id: id}})
}
</script>

<style scoped>
.lunbo {
  height: 200px;
  width: 100%;
}

.lunbo img {
  height: 200px;
  width: 100%;
  object-fit: cover;
}
</style>