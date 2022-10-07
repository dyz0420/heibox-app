<template>
  <div class="footer">
    <router-link to="/index" class="item" :class="path==='/index'||path==='/'?'active':''">
      <span class="iconfont icon-xingzhuang-sanjiaoxing"></span>
      <span class="nav-name">首页</span>
    </router-link>
    <router-link to="#" class="item" :class="path==='/soc'?'active':''">
      <span class="iconfont icon-tuoyuanxing"></span>
      <span class="nav-name">社区</span>
    </router-link>
    <router-link to="/games" class="item" :class="path==='/games'?'active':''">
      <span class="iconfont icon-chahao"></span>
      <span class="nav-name">游戏库</span>
    </router-link>
    <router-link to="user" class="item" :class="path==='/user'?'active':''">
      <span class="iconfont icon-checkbox"></span>
      <span class="nav-name">我</span>
    </router-link>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {computed} from "vue";

const router = useRouter()

//取得当前页面的路由路径
const path = computed(() => {
  return router.currentRoute.value.path;
})
</script>

<style scoped>
.footer {
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
}

.footer .item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #989898;
}

.footer .item .nav-name {
  font-size: 13px;
}

.footer .item .iconfont {
  font-size: 24px;
  line-height: 35px;
  font-weight: 800;
}

.footer .active {
  color: black;
}
</style>