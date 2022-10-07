<template>
  <div class="container">
    <div class="left">
      <div class="title">{{ articleInfo.title }}</div>
      <div class="other">
        <span>{{ articleInfo.tag }}</span>
        <span class="cnum">
          <span class="iconfont icon-pinglun2"></span>
          {{ articleInfo.commentsNum }}
        </span>
      </div>
    </div>
    <div class="right">
      <img :src="articleInfo.cover" alt="">
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

defineProps({
  articleInfo: Object
})
const router = useRouter()
</script>

<style scoped>
.container {
  width: 100%;
  height: 120px;
  display: flex;
  padding: 12px 10px;
  border-bottom: 1px solid #aaa;
}

.container:hover {
  background-color: #fafafa;
}

.container .left {
  width: 60%;
  display: flex;
  margin-right: 10px;
  flex-direction: column;
  justify-content: space-between;
}

.container .left .title {
  font-size: 17px;
  font-weight: 550;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.container .left .other {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #aaa;
}

.container .left .other .cnum {
  display: flex;
  align-items: stretch;
}

.container .right {
  width: 40%;
}

.container .right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px;
}
</style>