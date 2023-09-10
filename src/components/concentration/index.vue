<template>
  <div
    :class="['concentration-container', modelValue ? '' : 'vanish']"
    @contextmenu.stop.prevent
  >
    <div :class="['timer', startStatus ? 'minisize' : '']">
      <div class="timer-block">
        <div class="timer-cell">{{ timeObj?.date }}</div>
      </div>
      <div class="timer-block">
        <div class="timer-cell">{{ timeObj?.time }}</div>
      </div>
    </div>
    <div v-show="!startStatus" class="time-duration-selector">
      <div class="title">专注模式</div>
      <a-form :model="formData" ref="formRef">
        <a-form-item name="timingMode" style="text-align: center">
          <a-radio-group
            v-model:value="formData.timingMode"
            button-style="solid"
          >
            <a-radio-button :value="1">倒计时</a-radio-button>
            <a-radio-button :value="2">正计时</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <div v-if="formData.timingMode === 1" class="countdown">
          <a-form-item name="selectMin">
            <a-radio-group
              v-model:value="formData.selectMin"
              button-style="solid"
            >
              <a-radio-button :value="15">15分钟</a-radio-button>
              <a-radio-button :value="25">25分钟</a-radio-button>
              <a-radio-button :value="35">35分钟</a-radio-button>
              <a-radio-button :value="0">自定义</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item v-if="formData.selectMin === 0" name="customMin">
            <a-input
              v-model:value="formData.customMin"
              placeholder="请输入倒计时分钟数"
            />
          </a-form-item>
        </div>
      </a-form>
      <a-button type="primary" @click="startConcentration"
        >开始专注模式</a-button
      >
    </div>
    <div v-show="startStatus" class="timing-box">
      <div v-if="formData.timingMode === 1" class="countdown-timer">
        <div class="text">{{ secToTime(countdownTime).format }}</div>
      </div>
      <div v-else class="forward-timer">
        <div class="text">{{ secToTime(forwardTime).format }}</div>
      </div>

      <a-button type="primary" @click="endConcentration">退出专注模式</a-button>
    </div>

    <button v-show="!startStatus" class="back-btn" @click="quit">
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

const emit = defineEmits(["update:modelValue"]);

const formRef = ref();
const formData = reactive({
  selectMin: 15,
  customMin: "",
  timingMode: 1,
});

const startStatus = ref(false);

const timeObj = ref({
  date: dayjs().format("YYYY年MM月DD日"),
  time: dayjs().format("HH:mm:ss"),
});

// 倒计时秒数
const countdownTime = ref();
// 正计时秒数
const forwardTime = ref();

// 当前时间
let timer: number | undefined;
// 正计时
let countdownTimer: number | undefined;
// 倒计时
let forwardTimer: number | undefined;

const initTimer = () => {
  timeObj.value = {
    date: dayjs().format("YYYY年MM月DD日"),
    time: dayjs().format("HH:mm:ss"),
  };
  timer = setInterval(() => {
    timeObj.value = {
      date: dayjs().format("YYYY年MM月DD日"),
      time: dayjs().format("HH:mm:ss"),
    };
  }, 1000);
};

const secToTime = (secs: number) => {
  const hour = Math.floor(secs / 3600);
  const min = Math.floor((secs % 3600) / 60);
  const sec = (secs % 3600) % 60;
  return {
    hour,
    min,
    sec,
    format: `${hour < 10 ? "0" + hour : hour}:${min < 10 ? "0" + min : min}:${
      sec < 10 ? "0" + sec : sec
    }`,
  };
};

// 开始专注模式
const startConcentration = () => {
  startStatus.value = true;
  if (formData.timingMode === 1) {
    let minutes: string | number = formData.selectMin;
    if (minutes === 0) {
      minutes = formData.customMin;
    }
    countdownTime.value = Number(minutes) * 60;
    countdownTimer = setInterval(() => {
      if (countdownTime.value === 0) clearInterval(countdownTimer);
      else --countdownTime.value;
    }, 1000);
  } else {
    forwardTime.value = 0;
    forwardTimer = setInterval(() => {
      ++forwardTime.value;
    }, 1000);
  }

  if (formRef.value) formRef.value.resetFields();
};

const endConcentration = () => {
  startStatus.value = false;
  countdownTimer && clearInterval(countdownTimer);
  forwardTimer && clearInterval(forwardTimer);
};

const quit = () => {
  emit("update:modelValue", false);
  if (formRef.value) formRef.value.resetFields();
};

onMounted(() => {
  initTimer();
});

onBeforeUnmount(() => {
  timer && clearInterval(timer);
  countdownTimer && clearInterval(countdownTimer);
  forwardTimer && clearInterval(forwardTimer);
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: all 0.2s;

  &.vanish {
    transform: scale(0.2);
    opacity: 0;
  }

  // 当前时间
  .timer {
    position: absolute;
    color: rgb(14, 14, 14);
    font-size: 46px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    transition: all 1s;
    top: 50%;
    left: 50%;
    user-select: none;
    transform: translate(-50%, calc(-100% - 80px));

    &.minisize {
      left: 20px;
      top: 20px;
      transform: translateY(0);
      font-size: 16px;
    }

    &-block {
      display: flex;
      justify-content: center;
    }
    &-cell {
      margin: 10px;
    }
  }

  // 时间选择
  .time-duration-selector {
    height: 160px;
    width: 320px;
    display: flex;
    align-items: center;
    flex-direction: column;
    user-select: none;
    .title {
      margin-bottom: 12px;
      font-size: 20px;
    }

    .countdown {
      display: flex;
      flex-direction: column;
    }
  }

  .timing-box {
    text-align: center;
    user-select: none;

    .text {
      font-size: 72px;
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
