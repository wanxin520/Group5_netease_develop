<script setup></script>

<template>
  <div class="button">
    <slot></slot>
  </div>
</template>
<style scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  /* background-color: #409eff; */
  color: rgb(255, 255, 255);
  /* box-shadow: 1px 1px 5px rgb(255, 255, 255); */
}
</style>
