<template>
  <div v-if="!isInIframe" class="flex h-screen flex-col overflow-hidden">
    <div class="flex flex-shrink-0 items-center gap-1 bg-gray-200">
      <img class="block h-5 w-5" src="@/assets/vite.svg" />
      <img class="block h-5 w-5" src="@/assets/vue.svg" />
      <h1 class="text-lg font-bold">My Playground</h1>
    </div>
    <div class="flex flex-1 flex-row overflow-hidden">
      <div class="h-full flex-shrink-0 overflow-auto bg-gray-100">
        <TreeRoot
          v-slot="{ flattenItems }"
          class="flex w-36 select-none list-none flex-col py-2"
          :items="treeMenus"
          :get-key="item => item.path"
          :default-expanded="expandedPaths"
        >
          <TreeItem
            v-for="item in flattenItems"
            v-bind="item.bind"
            :key="item._id"
          >
            <RouterLink
              v-slot="{ isExactActive, navigate }"
              :to="item.value.path"
              custom
            >
              <div
                class="pr-2"
                :class="[
                  isExactActive && !item.value.children
                    ? 'bg-gray-300 font-bold'
                    : 'hover:bg-gray-200',
                ]"
                :style="{ 'padding-left': `${item.level - 0.5}rem` }"
                @click="
                  () => {
                    item.value.children ? void 0 : navigate();
                  }
                "
              >
                <span>{{ item.value.name }}</span>
              </div>
            </RouterLink>
          </TreeItem>
        </TreeRoot>
      </div>
      <div class="min-h-0 flex-1 overflow-auto">
        <div class="p-1">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="p-1">
    <RouterView />
  </div>
</template>

<script setup>
import { routes } from 'vue-router/auto-routes';

const isInIframe = window !== window.parent;

const expandedPaths = [];

const routes2flattenMenus = (routes, parent) => {
  const menus = [];
  routes.forEach(r => {
    if (r.children) {
      menus.push(...routes2flattenMenus(r.children, r));
    } else {
      const name = r.name === '/' ? 'Playground' : r.name;
      const path = parent ? parent.path + '/' + r.path : r.path;
      menus.push({ name, path });
    }
  });
  return menus;
};

const routes2treeMenus = (routes, parent) => {
  return routes.map(r => {
    const path = parent ? parent.path + '/' + r.path : r.path;
    const name = parent
      ? (r.name || path).replace(parent.path, '')
      : r.name || path;
    const menu = { path, name };
    if (r.children) {
      menu.children = routes2treeMenus(r.children, r);
      expandedPaths.push(path);
    }
    return menu;
  });
};

const flattenMenus = routes2flattenMenus(routes);
const treeMenus = routes2treeMenus(routes);

console.log({
  routes,
  flattenMenus,
  treeMenus,
  expandedPaths,
});
</script>
