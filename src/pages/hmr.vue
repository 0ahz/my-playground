<template>
  <div>
    <h1 class="text-lg font-bold">hmr demo</h1>
  </div>
  <div>
    <button class="btn btn-sm" @click="onBtnClick">trigger inc</button>
  </div>
</template>

<script setup>
const onBtnClick = () => {
  import.meta.hot?.send('inc');
};
</script>
