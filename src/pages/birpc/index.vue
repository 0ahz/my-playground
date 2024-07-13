<template>
  <div>
    <h1 class="text-lg font-bold">Alice</h1>
    <button class="btn btn-sm" @click="onBtnClick">Hi Bob</button>
  </div>
  <div class="border">
    <iframe
      ref="iframeElm"
      class="w-full"
      src="/birpc/iframe"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { createBirpc } from 'birpc';

const iframeElm = ref();

let rpc;

const Bob = {
  hey(name) {
    return new Promise(resovle => {
      setTimeout(() => {
        resovle({ msg: `Hey ${name}, I am Bob` });
      }, 3000);
    });
  },
};

const onBtnClick = async () => {
  const result = await rpc.hi('Bob');
  console.log(result);
};

const onMessage = e => {
  if (e.data === 'birpc-iframe-ready') {
    const { port1, port2 } = new MessageChannel();
    rpc = createBirpc(Bob, {
      post: data => port1.postMessage(data),
      on: fn => {
        port1.addEventListener('message', e => fn(e.data));
        port1.start();
      },
    });
    iframeElm.value.contentWindow.postMessage('birpc-port', '*', [port2]);
  }
};

onMounted(() => {
  window.addEventListener('message', onMessage);
});

onBeforeUnmount(() => {
  window.removeEventListener('message', onMessage);
});
</script>
