<template>
  <div class="container">
    <button class="btn" id="left_btn" @click="handleLeft">
      <img :class="data.leftBtn?'leftSpin':''" src="../../public/cinnamoroll/cinnacute-left.png" alt="left"/>
    </button>
    <button class="btn" id="right_btn" @click="handleRight">
      <img :class="data.rightBtn?'rightSpin':''" src="../../public/cinnamoroll/cinnacute-right.png" alt="right"/>
    </button>
    <div class="stage">
      <div class="item"><img :src="props.img[0]"  alt="one"/></div>
      <div class="item"><img :src="props.img[1]" alt="two"/></div>
      <div class="item"><img :src="props.img[2]" alt="three"/></div>
      <div class="item"><img :src="props.img[3]" alt="four"/></div>
    </div>
    <div class="bottom">
      <button @click="handleIndexClick(0)">
        <img :class="data.oneBtn?'clickBottomBtn':''" src="../../public/cinnamoroll/cinOne.png" alt="one"/>
      </button>
      <button @click="handleIndexClick(1)">
        <img :class="data.twoBtn?'clickBottomBtn':''" src="../../public/cinnamoroll/cinTwo.png" alt="two"/>
      </button>
      <button @click="handleIndexClick(2)">
        <img :class="data.threeBtn?'clickBottomBtn':''" src="../../public/cinnamoroll/cinThree.png" alt="three"/>
      </button>
      <button @click="handleIndexClick(3)">
        <img :class="data.fourBtn?'clickBottomBtn':''" src="../../public/cinnamoroll/cinFour.png" alt="four"/>
      </button>
    </div>
  </div>
</template>
<script>
export default {name: 'cCarousel3D'}
</script>
<script setup>

import {computed, onBeforeUnmount, onMounted, reactive, ref, watch} from "vue";

const props = defineProps({
  size: {
    type: String,
    default: 'default'
  },
  img: {
    type: Array,
    default: () => ['../../public/cinnamoroll/re1.jpeg', '../../public/cinnamoroll/re2.jpeg', '../../public/cinnamoroll/re3.jpeg', '../../public/cinnamoroll/re4.jpeg']
  }
})

let data = reactive({
  boxDeg:0,
  leftBtn:false,
  rightBtn:false,
  oneBtn:false,
  twoBtn:false,
  threeBtn:false,
  fourBtn:false
})

onMounted(()=>{
  // 监听动画结束，重置动画
  document.querySelector('#left_btn > img').addEventListener('webkitAnimationEnd', ()=>{
    data.leftBtn = false
  })
  document.querySelector('#right_btn > img').addEventListener('webkitAnimationEnd', ()=>{
    data.rightBtn = false
  })
  document.querySelectorAll('.bottom > button > img').forEach(item => item.addEventListener('webkitAnimationEnd', ()=>{
    data.oneBtn = false
    data.twoBtn = false
    data.threeBtn = false
    data.fourBtn = false
  }))
  // 设值大小
  changeScale(props.size)
})

onBeforeUnmount(()=>{
  // 删除监听器
  document.querySelector('#left_btn > img').removeEventListener('webkitAnimationEnd', ()=>{
    data.leftBtn = false
  })
  document.querySelector('#right_btn > img').removeEventListener('webkitAnimationEnd', ()=>{
    data.rightBtn = false
  })
  document.querySelectorAll('.bottom > button > img').forEach(item => item.removeEventListener('webkitAnimationEnd', ()=>{
    data.oneBtn = false
    data.twoBtn = false
    data.threeBtn = false
    data.fourBtn = false
  }))
})

// 点击左右按钮，改变boxDeg，然后调用spin函数，实现旋转
function handleLeft(){
  data.boxDeg += 90
  data.leftBtn = true
  spin()
}

function handleRight(){
  data.boxDeg -= 90
  data.rightBtn = true
  spin()
}

function handleIndexClick(index){
  switch (index) {
    case 0:
      data.oneBtn = true
      break
    case 1:
      data.twoBtn = true
      break
    case 2:
      data.threeBtn = true
      break
    case 3:
      data.fourBtn = true
      break
  }
  let temp_deg = Math.abs(data.boxDeg) % 360
  let current_index = (temp_deg) => {
    switch (temp_deg){
      case 0:
        return 0
      case 90:
        return 1
      case 180:
        return 2
      case 270:
        return 3
    }
  }
  if (data.boxDeg > 0){
    data.boxDeg += (index-current_index(temp_deg))*90
  }else if (data.boxDeg < 0){
    data.boxDeg -= (index-current_index(temp_deg))*90
  }else {
    // 处理当前角度等于0的情况
    data.boxDeg = -index*90
  }
  spin()
}

function spin(){
  document.querySelector('.stage').style.transform = 'rotateY(' + (data.boxDeg) + 'deg)'
}

function changeScale(scale) {
  let width = 400
  let height = 200
  switch (scale) {
    case 'small' || 'default':
      width = 400
      height = 200
      break
    case 'medium':
      width = 600
      height = 300
      break
    case 'large':
      width = 800
      height = 400
  }
  // 修改容器的大小
  document.querySelector('.container').style.width = width + 'px'
  document.querySelector('.container').style.height = height + 'px'
  // 修改舞台的变换基点
  document.querySelector('.stage').style.transformOrigin = 'center center ' + '-' + (width/2) + 'px'
  // 修改子组件的3d变换
  document.querySelector('.stage > div:nth-child(4)').style.transform = 'rotateY(-90deg) translateZ(' + width+ 'px)'
  document.querySelector('.stage > div:nth-child(3)').style.transform = 'rotateY(180deg) translateZ(' + width + 'px)'
  document.querySelector('.stage > div:nth-child(2)').style.transform = 'rotateY(90deg) translateZ(' + width + 'px)'
}
</script>

<style scoped lang="less">
.container{
  width: 400px;
  height: 150px;
  position: relative;
  // 设置景深
  perspective: 800px;
  .btn{
    margin: 0;
    padding: 0;
    position:absolute;
    border: none;
    outline: none;
    width: 30px;
    height: 30px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    z-index: 2;
    img{
      transition: 2s;
      width: 100%;
      height: 100%;
    }
    &:nth-child(1){
      left: 0;
    }
    &:nth-child(2){
      right: 0;
    }
  }
}
.leftSpin{
  animation: startLeft 2s;
}
.rightSpin{
  animation: startRight 2s;
}
@keyframes startLeft {
  0%{
    transform: scale(1);
  }
  50%{
    transform: scale(2) rotate(180deg);
  }
  100%{
    transform: scale(1) rotate(360deg);
  }
}
@keyframes startRight {
  0%{
    transform: scale(1);
  }
  50%{
    transform: scale(2) rotate(-180deg);
  }
  100%{
    transform: scale(1) rotate(-360deg);
  }
}
.clickBottomBtn{
  animation: bottomBtn 1s;
}
.bottom{
  position: absolute;
  display: flex;
  width: 200px;
  height: 20px;
  justify-content: space-between;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  button{
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    width: 40px;
    height: 100%;
    background: transparent;
    img{
      width: 50%;
      height: 100%;
    }
  }
}
@keyframes bottomBtn {
  0%{
    transform: scale(1);
    opacity: 1.0;
  }
  50%{
    transform: scale(2);
    opacity: 0.5;
  }
  100%{
    transform: scale(1);
    opacity: 1.0;
  }
}
.stage{
  position: absolute;
  width: 100%;
  height: 100%;
  // 设置3d舞台，主要作用于变换的子元素
  transform-style: preserve-3d;
  // 设置舞台的变换基点
  transform-origin: center center -200px;
  transition: 2s;
  .item{
    position: absolute;
    width: 100%;
    height: 100%;
    background: lightpink;
    opacity: 0.5;
    // 变换盒子元素形成三维四柱体
    &:nth-child(4){
      transform-origin: right;
      transform: rotateY(-90deg) translateZ(400px);
    }
    &:nth-child(3){
      transform-origin: center;
      transform: rotateY(180deg) translateZ(400px);
    }
    &:nth-child(2){
      transform-origin: left;
      transform: rotateY(90deg) translateZ(400px);
    }
    // 展示的图片样式
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>