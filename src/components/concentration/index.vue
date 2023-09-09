<template>
  <div :class="['concentration-container', modelValue ? '' : 'vanish']">
    <div class="timer">
      <div class="timer-block ">
        <div class="timer-cell year">{{ timeObj?.year }}</div>
        <div class="timer-cell month">{{ timeObj?.month }}</div>
        <div class="timer-cell date">{{ timeObj?.date }}</div>
      </div>
      <div class="timer-block">
        <div class="timer-cell hour">{{ timeObj?.hour }}</div>
        <div class="timer-cell">:</div>
        <div class="timer-cell min">{{ timeObj?.min }}</div>
        <div class="timer-cell">:</div>
        <div class="timer-cell sec">{{ timeObj?.sec }}</div>
      </div>
    </div>

    <button class="back-btn" @click="$emit('update:modelValue', false)">
      <iconify icon="lucide:chevrons-right-left" style="font-size: 28px" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";

defineProps({
  modelValue: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
});

defineEmits(["update:modelValue"]);

const timeObj = ref({
  year: 0 + " 年",
  month: 0 + " 月",
  date: 0 + " 日",
  hour: 0,
  min: 0,
  sec: 0,
});

let timer: number | undefined;

const initTimer = () => {
  timeObj.value = {
    year: dayjs().year() + " 年",
    month: dayjs().month() + 1 + " 月",
    date: dayjs().date() + " 日",
    hour: dayjs().hour(),
    min: dayjs().minute(),
    sec: dayjs().second(),
  };
  timer = setInterval(() => {
    timeObj.value = {
      year: dayjs().year() + " 年",
      month: dayjs().month() + 1 + " 月",
      date: dayjs().date() + " 日",
      hour: dayjs().hour(),
      min: dayjs().minute(),
      sec: dayjs().second(),
    };
  }, 1000);
};

onMounted(() => {
  initTimer();
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.concentration-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: all 0.2s;

  &.vanish {
    transform: scale(0.2);
    opacity: 0;
  }

  .timer {
    color: rgb(14, 14, 14);
    font-size: 46px;
    font-weight: bold;
    display: flex;
    flex-direction: column;

    &-block {
      display: flex;
      justify-content: center;
    }
    &-cell {
      margin: 10px;
    }
  }

  // 退出
  .back-btn {
    position: absolute;
    bottom: 20px;
    left: 20px;
    cursor: pointer;
  }
}
</style>
