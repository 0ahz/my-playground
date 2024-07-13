<template>
  <div>
    <h1 class="text-lg font-bold">Bob</h1>
  </div>
  <div>
    <button class="btn btn-sm" @click="onBtnClick">Hey Alice</button>
  </div>
</template>

<script setup>
import { createBirpc } from 'birpc';
import { onBeforeUnmount, onMounted } from 'vue';

let rpc;

const Alice = {
  hi(name) {
    return `Hi ${name}, I am Alice`;
  },
};

const onBtnClick = async () => {
  const result = await rpc.hey('Alice');
  console.log(result);
};

const onMessage = e => {
  if (e.data === 'birpc-port') {
    const port = e.ports[0];
    rpc = createBirpc(Alice, {
      post: data => port.postMessage(data),
      on: fn => {
        port.addEventListener('message', e => fn(e.data));
        port.start();
      },
    });
  }
};

onMounted(() => {
  window.addEventListener('message', onMessage);
  window.parent.postMessage('birpc-iframe-ready', '*');
});

onBeforeUnmount(() => {
  window.removeEventListener('message', onMessage);
});
</script>
