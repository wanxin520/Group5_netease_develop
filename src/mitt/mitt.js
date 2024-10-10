import mitt from 'mitt';

const bus = mitt();

export default bus;

/* 


// ComponentA.vue
<template>
  <!-- 省略模板内容 -->
  <button @click="choseBusSetData">发送数据给兄弟组件</button>
</template>
 
<script setup>
import { ref } from 'vue';
import bus from '@/utils/eventBus.js'; // 引入事件总线
const dataToEmit = ref('Hello, Brother!');
function choseBusSetData() {
  bus.emit('brotherEvent', dataToEmit.value) // 发布事件并附带数据
}
</script>


// ComponentB.vue
<script setup>
import { onMounted, onUnmounted } from 'vue';
import bus from '@/utils/eventBus.js'; // 引入事件总线
let receivedData = '';
onMounted(() => {
  // 订阅事件
  const off = bus.on('brotherEvent', (data) => {
    receivedData = data
    console.log('Received data from brother:', receivedData)
    // 在这里可以更新组件B的状态或者执行其他业务逻辑
  })
  // 当组件卸载时，取消事件订阅以避免内存泄漏
  onUnmounted(() => {
    off()
  })
})
</script>



*/