<template>
  <div class="calender-cell" @click="fullScreen">
    <div class="calender-date">三月</div>
    <div class="calender-content">
      <div class="date-weekday">
        <div>日</div>
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
      </div>
      <div class="date-days">
        <div
          class="date-days-item"
          :class="item % 2 === 0 ? 'opacity' : ''"
          v-for="(item, index) in monthDays"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      currentYear: 2023,
      currentMonth: 3,
      currentDay: 3,
      monthDays: [
        27, 28, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
    });

    const fullScreen = () => {};
    return {
      ...toRefs(state),
      fullScreen,
    };
  },
});
</script>

<style lang="scss" scoped>
.calender-cell {
  height: 100%;
  width: 100%;
  // color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;

  .calender-date {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
    color: red;
  }

  .calender-content {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    .date-weekday {
      font-size: 13px;
      display: grid;
      margin-bottom: 10px;
      grid-template-columns: repeat(7, 1fr);
      & > div {
        text-align: center;
      }
    }
    .date-days {
      height: 100%;
      font-size: 12px;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: repeat(5, 1fr);

      &-item {
        text-align: center;

        &.opacity {
          color: rgba($color: #000000, $alpha: 0.45);
        }
      }
    }
  }
}
</style>
