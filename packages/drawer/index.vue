<template>
  <div class="dialog">
    <div class="content">
      <div class="top">
        <div id="title">
          <span v-for="(item, index) in Array.from(props.title)" :style="{color:span_color[index%5]}">{{item}}</span>
        </div>
        <button @click="handleClose"><img src="../../public/cinnamoroll/close.png" alt="close"/></button>
      </div>
      <div class="bottom">
        <span>内容区</span>
      </div>
    </div>
  </div>
</template>
<script>
export default { name: 'cDrawer' }
</script>
<script setup>
import {onMounted, onUpdated} from "vue";

const span_color = ['#4cb4f0', '#b0daec', '#d1ebf6', '#fefbba', '#f6d4e3']

const props = defineProps({
  title: {
    type: String,
    default: '抽屉标题'
  },
  position:{
    type: String,
    default: 'left'
  }
})
const modal = defineModel()

onMounted(()=>{
  changePosition()
})

onUpdated(()=>{
  changePosition()
  if (modal.value){
    changeModal()
  }else {
    document.querySelector('.dialog').style.transform = 'scale(0)'
  }
})

function handleClose(){
  modal.value = false
}

function changeModal(){
  document.querySelector('.dialog').style.transform = 'scale(1)'
}

// 根据props.position改变抽屉的位置
function changePosition(){
  if (props.position === 'right'){
    document.querySelector('.dialog').style.transformOrigin = 'right'
    document.querySelector('.dialog').style.justifyContent = 'flex-end'
  }else if (props.position === 'top'){
    document.querySelector('.dialog').style.transformOrigin = 'top'
    document.querySelector('.dialog > .content').style.width = '100%'
    document.querySelector('.dialog > .content').style.height = '0'
    document.querySelector('.dialog > .content').style.minHeight = '30%'
  }else if (props.position === 'bottom'){
    document.querySelector('.dialog').style.alignItems = 'flex-end'
    document.querySelector('.dialog').style.transformOrigin = 'bottom'
    document.querySelector('.dialog > .content').style.width = '100%'
    document.querySelector('.dialog > .content').style.height = '0'
    document.querySelector('.dialog > .content').style.minHeight = '30%'
  }
}
</script>

<style scoped lang="less">
.dialog {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(82, 101, 107, 0.5);
  transition: 0.5s;
  transform: scale(0);
  transform-origin: left;
  .content{
    min-width: 30%;
    height: 100%;
    background: white;
    display: flex;
    flex-direction: column;
    .top{
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      padding-top: 5px;
      #title{
        margin-left: 10px;
        font-size: 24px;
      }
      button{
        margin-right: 10px;
        outline: none;
        background: transparent;
        border: none;
        padding: 0;
        img{
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}
</style>