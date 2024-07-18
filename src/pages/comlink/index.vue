<template>
  <div>
    <h1 class="text-lg font-bold">comlink demo</h1>
  </div>
  <div>
    <button class="btn btn-sm" :disabled="isLoading" @click="onBtnClick">
      trigger inc
    </button>
  </div>
  <div class="relative">
    <div>counter: {{ counter }}</div>
    <div>counter1: {{ counter1 }}</div>
    <div
      v-if="isLoading"
      class="absolute inset-0 flex flex-col justify-center bg-white/80"
    >
      <span>loading...</span>
    </div>
  </div>
</template>

<script setup>
import MyWorker from './worker?worker';
import MyWorker1 from './worker1?worker';
import * as Comlink from 'comlink';

const isLoading = ref(false);

const counter = ref(0);
const counter1 = ref(0);
let counterService = null;

const counterObj = Comlink.wrap(new MyWorker());
const CounterService = Comlink.wrap(new MyWorker1());

const onBtnClick = async () => {
  isLoading.value = true;
  await counterService.inc();
  await counterObj.inc();
  counter.value = await counterObj.counter;
  counter1.value = await counterService.counter;
  isLoading.value = false;
};

const init = async () => {
  isLoading.value = true;
  counter.value = await counterObj.counter;
  counterService = await new CounterService();
  isLoading.value = false;
};

init();
</script>
