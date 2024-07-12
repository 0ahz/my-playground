<template>
  <div class="flex items-center gap-2 bg-gray-100">
    <template v-for="route in routes" :key="route.pat">
      <RouterLink v-slot="{ isActive }" :to="route.path">
        <span class="px-2" :class="[isActive ? 'font-bold' : '']">{{
          route.name
        }}</span>
      </RouterLink>
    </template>
  </div>
  <div class="p-3">
    <RouterView />
  </div>
</template>

<script setup>
import { routes } from 'vue-router/auto-routes';
</script>
