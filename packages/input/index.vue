<template>
  <div class="input">
    <div id="background" :class="sign?'rotate':'rotateEnd'"></div>
    <div id="content">
      <input
          :type="cType"
          @focusin="handleFocus"
          @focusout="handleFocus"
          :value="value"
          :placeholder="placeHoder"
          @input="input" />
      <img :src="img_src" alt="cin1"/>
    </div>

  </div>
</template>
<script>
export default {name: 'cInput'}
</script>
<script setup>
import {computed, onMounted, ref} from "vue";

const props = defineProps({
  type: {
    type: String
  },
  width:{
    type: Number,
    default: 300
  },
  height:{
    type: Number,
    default: 50
  },
  placeHoder:{
    type: String,
    default: "请输入内容"
  },
  fontSize:{
    type: Number,
    default: 20
  }
})

let sign = ref(false)
let img_src = ref('../../public/cinnamoroll/Cinnamoroll-back.png')

const value = defineModel('value')
const emit = defineEmits(['update:value'])

const cType = computed(() => {
  return props.type
})

const placeHoder = computed(()=>{
  return props.placeHoder
})

const input = (e) => {
  emit('update:value', e.target.value)
}

const handleFocus = () => {
  if (!sign.value) {
    img_src.value = '../../public/cinnamoroll/Cinnamoroll-front.png'
  } else {
    img_src.value = '../../public/cinnamoroll/Cinnamoroll-back.png'
  }
  sign.value = !sign.value
}

onMounted(()=>{
  Init()
})

// 设值定制化属性
function Init(){
  document.querySelector('.input').style.width = props.width + 'px'
  document.querySelector('.input').style.height = props.height + 'px'
  document.querySelector('.input > #content').style.width = props.width - 10 + 'px'
  document.querySelector('.input > #content').style.height = props.height - 5 + 'px'
  document.querySelector('.input > #content > input').style.fontSize = props.fontSize + 'px'
}
</script>

<style scoped lang="less">
.rotate{
  animation: rotate 3s linear infinite;
}
.rotateEnd{
  animation: rotate 3s linear infinite;
  animation-play-state: paused;
}
.input{
  min-width: 200px;
  min-height: 50px;
  width: 300px;
  height: 50px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  #background{
    content: '';
    position: relative;
    width: 900%;
    height: 900%;
    background: linear-gradient(#4cb4f0 48%, #fefbba 48%);
  }
  #content{
    position: absolute;
    display: flex;
    width: 290px;
    height: 45px;
    background: white;
    border-radius: 15px;
    align-items: center;
    input{
      margin-left: 5px;
      height: 80%;
      width: 81%;
      font-size: 20px;
      border: none;
      &:focus{
        outline: none;
      }
    }
    img{
      height: 80%;
      width: 13%;
    }
  }
}
@keyframes rotate {
  100%{
    transform: rotate(1turn);
  }
}
</style>