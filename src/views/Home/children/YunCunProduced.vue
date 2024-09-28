<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  data: {},
});

console.log(props.data.children);
const isChecked = (id) => {
  console.log(id);
  let query = { id: id };
  router.push({ name: "detail", query });
};
</script>

<template>
  <div class="w-[500vw] h-[50vw] bg-red-300 mt-20">

  </div>
</template>

<style scoped></style>
