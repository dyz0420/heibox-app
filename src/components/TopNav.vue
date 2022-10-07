<template>
  <div class="top-nav">
    <div class="left">
      <span v-for="(n,index) in props.nav" :class="index===0?'big':''" :key="index">{{ n.text }}</span>
    </div>
    <div class="right">
      <span class="iconfont icon-tuichu" v-show="isUser && isLogin" @click="modal=true"></span>
      <span class="iconfont icon-sousuo" v-show="!isUser"></span>
      <span class="iconfont icon-youjian"></span>
    </div>
  </div>

  <a-modal v-model:visible="modal" :footer="null" :closable="false" centered width="80%" style="border-radius: 5px">
    <div class="my-modal">
      <p>确认登出</p>
      <div class="modal-btn">
        <span class="btn1" @click="logout">确定</span>
        <span class="btn2" @click="modal=false">取消</span>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {Toast} from "../util/toast.js";

const router = useRouter()
const route = useRoute()
const store = useStore()
const modal = ref(false)

const props = defineProps({
  nav: Array
})
//判断当前是否为用户页
const isUser = computed(() => {
  return router.currentRoute.value.path === '/user'
})
//判断当前是否为登录状态
const isLogin = computed(() => {
  return store.state.userInfo;
})
//退出登录
const logout = () => {
  //清空用户信息
  store.commit('setUserInfo', null)
  //关闭对话框
  modal.value = false
  //提示登出成功
  Toast("您已退出登录", 1000)
}
</script>

<style scoped>
.top-nav {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: white;
}

.top-nav span {
  margin-right: 10px;
  font-size: 16px;
}

.top-nav .big {
  font-size: 19px;
  font-weight: 550;
}

.top-nav .right span {
  font-size: 25px;
  font-weight: 700;
}

.my-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.my-modal p {
  font-size: 20px;
  font-weight: 550;
}

.modal-btn {
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.modal-btn span {
  font-size: 16px;
  padding: 4% 15%;
  border-radius: 4px;
}

.modal-btn .btn1 {
  background-color: black;
  color: white;
}

.modal-btn .btn2 {
  background-color: #efefef;
  color: #aaa;
}
</style>
<style>
.ant-modal-content {
  border-radius: 10px;
}

.ant-modal-body {
  padding: 40px 0 24px 0;
}
</style>