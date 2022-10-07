<template>
  <div class="loginPage">
    <div>
      <div style="margin-bottom: 30px">
        <span class="iconfont icon-chahao" style="font-size: 30px;cursor: pointer" @click="router.go(-1)"></span>
      </div>
      <div class="form-item">
        <input name="account" type="text" placeholder="输入您的帐号" v-model="user.account">
        <input name="password" type="password" placeholder="输入您的密码" v-model="user.password">
      </div>
      <div class="loginBtn" :class="isBlank" @click="login">
        登 录
      </div>
      <div class="tipContent">
        <span>账号1：<span class="tips">123</span>，密码1：<span class="tips">123</span></span>
        <span>账号2：<span class="tips">1111</span>，密码2：<span class="tips">1111</span></span>
      </div>
    </div>
    <div style="position: fixed;bottom: 0;margin-bottom: 30px;">
      <a-checkbox v-model:checked="radioVal" style="color: #8f8f8f">
        已同意《小黑盒服务及隐私条款》
      </a-checkbox>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {Toast} from "../util/toast.js";

const router = useRouter()
const store = useStore()

//隐私协议勾选状态
const radioVal = ref(false)
//表单是否留空，根据是否留空来判断按钮颜色
const isBlank = computed(() => {
  return user.value.account && user.value.password ? 'color1' : 'color2';
})

//用户表单信息
const user = ref({
  account: '',
  password: '',
})

//登录逻辑
const login = () => {
  //没有勾选隐私协议，进行提示
  if (!radioVal.value) {
    Toast("请先勾选同意用户协议", 1000)
    return;
  }
  //表单留空直接return
  if (isBlank.value === 'color2') {
    return;
  }
  //登录逻辑开始，根据账号密码查找用户信息
  const users = store.state.users
  const res = users.filter((item) => item.account === user.value.account && item.password === user.value.password)
  //找到，对userInfo赋值，登录成功，跳转
  if (res.length > 0) {
    store.commit('setUserInfo', res[0])
    router.replace('/user')
  } else {
    //否则提示账号密码错误
    Toast("账号或密码错误", 1000)
  }
}
</script>

<style scoped>
.loginPage {
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.form-item input {
  border-bottom: 1px solid #dbdbdb;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  outline: none;
  height: 50px;
  font-size: 25px;
  font-weight: 700;
  padding-left: 10px;
  margin-bottom: 10px;
}

.form-item input::placeholder {
  font-weight: 500;
  color: #d0d0d0;
  font-size: 26px;
}

.loginBtn {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: 550;
  margin-top: 40px;
  border-radius: 4px;
}

.color1 {
  background-color: black;
  color: white;
  cursor: pointer;
}

.color2 {
  background-color: #efefef;
  color: #9d9d9d;
}

.tips {
  color: blue;
  font-size: 25px;
  font-weight: 800;
}

.tipContent {
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
  font-weight: 550;
}
</style>