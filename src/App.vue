<template>
  <div class="module">
    <div class="fle">
      <span>按钮组件：1 size: small medium large 控制大小
                     2 radius: "15px" 控制圆角
                     3 type: success warning danger 控制按钮类型</span>
      <c-button size="default" radius="15px" type="success">成功</c-button>
    </div>
  </div>
  <div class="fle">
    <span>输入组件：1 width、height: number 控制输入框大小 2 placeHoder: String 控制默认输入内容 3 fontSize: Number 控制输入字体大小</span>
    <c-input />
  </div>
  <div class="fle">
    <span>3D轮播图组件：1 size: small medium large 控制轮播图组件的大小 2 img: Array[(URL string)] 轮播图图片URL</span>
    <c-carousel3-d />
  </div>
  <div class="fle">
    <span>对话框组件: 1 title: String 对话框提示 2 需要一个v-model变量双向控制对话框的打开和关闭 3 @submit 指定回调函数完成对话</span>
    <button @click="changeModal">open</button>
    <c-dialog v-model="op" @submit="handleClick"></c-dialog>
  </div>
  <div class="fle">
    <span>抽屉组件：1 title: String 抽屉内容提示 2 position: left right top bottom 控制抽屉打开位置 3 同样需要一个v-model变量进行
      双向组件控制</span>
    <button @click="changeModal2">open</button>
    <c-drawer v-model="ed" position="left"></c-drawer>
  </div>
</template>

<script setup>
import CButton from "../packages/button/index.vue";
import CInput from "../packages/input/index.vue";
import {ref} from "vue";
import CCarousel3D from "../packages/carousel3D/index.vue";
import CDialog from "../packages/dialog/index.vue";
import CDrawer from "../packages/drawer/index.vue";
const inpVal = ref('')
let op = ref(false)
let ed = ref(false)

function changeModal(){
  op.value = true
}

function handleClick(){
  console.log('click')
}

function changeModal2(){
  ed.value = true
}
</script>

<style scoped lang="less">
.module{
  display: flex;
  flex-direction: column;
}
.fle{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span{
    max-width: 250px;
  }
}
</style>
