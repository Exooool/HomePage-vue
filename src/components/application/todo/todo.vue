<template>
  <div class="todo-cell" @click="fullScreen">
    <div class="todo-header">
      <span class="title">待办事项</span>
    </div>
    <div class="todo-content">
      <div class="todo-item">
        <div class="header">这是一个待办事项</div>
        <div class="footer">2023年01月12日</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({});

    const fullScreen = () => {};
    return {
      ...toRefs(state),
      fullScreen,
    };
  },
});
</script>

<style lang="scss" scoped>
.todo-cell {
  height: 100%;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  background-color: #f8ecc9;

  .todo-header {
    height: 40px;
    padding: 10px;
    // font-weight: bold;
    color: #6f2108;
    background-color: #f8cf17;
  }

  .todo-content {
    color: black;
    padding: 20px;
  }
}
</style>
