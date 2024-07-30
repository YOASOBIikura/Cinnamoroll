<template>
  <div :class="cClass">
    <button><img :src="img_src" alt="cimg"/><slot /></button>
  </div>
</template>
<script>
export default { name: 'cButton' }
</script>
<script setup>
import {computed, onMounted, onUpdated, reactive} from "vue";

const data = reactive({
  img_url:['../../public/cinnamoroll/cinnasideeye.png', '../../public/cinnamoroll/cinnahappy.png', '../../public/cinnamoroll/cinnatwist.png', '../../public/cinnamoroll/cinnacry.png']
})


const props = defineProps({
  type: {
    type: String,
    default: 'default'
  },
  size:{
    type: String,
    default: 'default'
  },
  fontSize: {
    type: String,
    default: '16px'
  },
  radius:{
    type: String,
    default: '0px'
  }
})

const cClass = computed(() => ['c-button', `c-button-${props.type}`])
const img_src = computed(() => {
  switch (props.type) {
    case 'default':
      return data.img_url[0]
    case 'success':
      return data.img_url[1]
    case 'warning':
      return data.img_url[2]
    case 'danger':
      return data.img_url[3]
    default:
      return data.img_url[0]
  }
})

onMounted(()=>{
  Init()
})

onUpdated(()=>{
  Init()
})

function Init(){
  if (props.size == 'default' || props.size === 'medium'){
    document.querySelector('.c-button').style.width = '150px'
    document.querySelector('.c-button').style.height = '50px'
    document.querySelector('button').style.fontSize = props.fontSize
    document.querySelector('button').style.borderRadius = props.radius
  }else if (props.size == 'small'){
    document.querySelector('.c-button').style.width = '100px'
    document.querySelector('.c-button').style.height = '40px'
    document.querySelector('button').style.fontSize = props.fontSize
    document.querySelector('button').style.borderRadius = props.radius
  }else if (props.size == 'large'){
    document.querySelector('.c-button').style.width = '200px'
    document.querySelector('.c-button').style.height = '80px'
    document.querySelector('button').style.fontSize = props.fontSize
    document.querySelector('button').style.borderRadius = props.radius
  }
}
</script>

<style scoped lang="less">
button{
  outline: none;
  border: 0;
  background: none;
  cursor: pointer;
}
.c-button{
  width: 200px;
  height: 80px;
  button{
    display: flex;
    width: 100%;
    height: 100%;
    padding: 12px 20px;
    justify-content: center;
    align-items: center;
    img{
      width: 30%;
      height: 136%;
      min-width: 24px;
      min-height: 24px;
    }
    &:hover, &:focus{
      opacity: 0.7;
    }
  }
}
.c-button-success{
  button{
    background: #4cb4f0;
    color: #fff;
  }
}
.c-button-warning{
  button{
    background: #fefbba;
    color: #fff;
  }
}
.c-button-danger{
  button{
    background: #f6d4e3;
    color: #fff;
  }
}
</style>