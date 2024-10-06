<script setup>
import { ref, watch } from "vue"

const props = defineProps({
    times: {}
})
const time = ref(props.times ? props.times : 0)
watch(props,()=>{
    // console.log(props.times);
    time.value = props.times
})

</script>

<template>
    <div>
        <div class=" text-[#ffffff]">
            <span>{{ new Date(time).getMinutes() < 10 ? "0" + new Date(time).getMinutes() : new Date(time).getMinutes()
                    }}</span>
                    <span>:</span>
                    <span>{{ new Date(time).getSeconds() < 10 ? "0" + new Date(time).getSeconds() : new
                        Date(time).getSeconds() }} </span>
        </div>
    </div>
</template>
<style scoped></style>