<template>
  <dialog id="dialog">
    <div class="inner">
      <div class="title">
        <span v-for="(item, index) in Array.from(props.title)" :style="{color:span_color[index%5]}">
          {{item}}
        </span>
      </div>
      <div class="content">
        <span>这里放需要放在对话框的内容</span>
        <slot></slot>
      </div>
      <div class="option">
        <button @click="handleClose">cancel</button>
        <button @click="handleSubmit">submit</button>
      </div>
    </div>
  </dialog>
</template>
<script>
export default { name: 'cDialog' }
</script>
<script setup>

import {onUpdated} from "vue";

const props = defineProps({
  title:{
    type: String,
    default: "提示"
  }
})

const model = defineModel()
const emit = defineEmits(['submit'])

const span_color = ['#4cb4f0', '#b0daec', '#d1ebf6', '#fefbba', '#f6d4e3']

onUpdated(()=>{
  changeModal()
})

function changeModal(){
  if (model.value){
    document.getElementById('dialog').showModal()
  }else{
    document.getElementById('dialog').close()
  }
}

function handleClose(){
  document.getElementById('dialog').close()
  model.value = false
}

function handleSubmit(){
  emit('submit')
  handleClose()
}
</script>

<style scoped lang="less">
#dialog{
  min-width: 300px;
  min-height: 200px;
  border: none;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  &::backdrop{
    background: rgba(255,255,255,0.5);
  }
}
.inner{
  position: absolute;
  width: 95%;
  height: 90%;
  display: flex;
  flex-direction: column;
  margin: 12px 8px;
  .title{
    display: flex;
    span{
      font-size: 16px;
      font-weight: 600;
    }
  }
}
.content{
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
}
.option{
  align-self: end;
  display: flex;
  justify-content: flex-end;
  align-items: end;
  margin-top: 12px;
  margin-right: 8px;
  height: 100%;
  button{
    outline: none;
    border: none;
    margin-left: 4px;
    padding: 0;
    width: 90px;
    height: 40px;
    &:nth-child(1){
      background: #fefbba;
      color: #f6d4e3;
    }
    &:nth-child(2){
      background: #4cb4f0;
      color: #f6d4e3;
    }
  }
}
</style>