<template>
  <div class="dropdown-menu">
    <div class="dropdown-content">
      <div class="dropdown-menu-item"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({});
    return { ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped></style>
