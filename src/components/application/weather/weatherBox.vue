<template>
  <div class="weather-box-wrapper box-cover" @click="onClose">
    <div
      class="weather-box"
      :class="visible ? 'visible' : 'hidden'"
      @click.stop
    >
      <div class="header">
        <div class="position">罗湖</div>
      </div>
      <div class="content">
        <div class="basic-details">
          <div class="tempreture">14℃</div>
          <div class="description">
            <div class="title">晴</div>
            <div class="details">最低11℃ 最高19℃</div>
          </div>
        </div>

        <div class="other-details details-container">
          <div class="other-details-item">
            <span>湿度</span><span>75%</span>
          </div>
          <div class="other-details-item">
            <span>风力</span><span>1级</span>
          </div>
          <div class="other-details-item">
            <span>降水量</span><span>0.0毫米</span>
          </div>
          <div class="other-details-item">
            <span>露点</span><span>12°</span>
          </div>
          <div class="other-details-item">
            <span>气压</span><span>1009百帕</span>
          </div>
          <div class="other-details-item">
            <span>风速</span><span>4公里每小时</span>
          </div>
        </div>

        <div class="hours-forecast details-container">
          <div class="title">每小时预报</div>
          <div class="forecast-list">
            <div
              v-for="(item, index) in hoursForecastList"
              :key="index"
              class="forecast-item"
            >
              <span class="time">{{ item.time }}</span>
              <span class="current-temperature">{{ item.currentTemp }}℃</span>
              <span class="weather-icon">
                <i-wi-moon-waxing-crescent-6 />
              </span>
            </div>
          </div>
        </div>
        <div class="days-forecast details-container">
          <div class="title">每日预报</div>
          <div class="forecast-list">
            <div
              v-for="(item, index) in daysForecastList"
              :key="index"
              class="forecast-item"
            >
              <span class="time">{{ item.time }}</span>
              <span class="high-temperature">{{ item.highTemp }}℃</span>
              <span class="low-temperature">{{ item.lowTemp }}℃</span>
              <span class="weather-icon"> <i-wi-day-sunny /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";

export default defineComponent({
  components: {},
  emits: ["vanish"],
  setup(props, { emit }) {
    const state = reactive({
      hoursForecastList: [
        { time: "23:00", currentTemp: 17, weather: "" },
        { time: "23:00", currentTemp: 17, weather: "" },
        { time: "23:00", currentTemp: 17, weather: "" },
      ],
      daysForecastList: [
        { time: "02-27", highTemp: 17, lowTemp: 12, weather: "" },
        { time: "02-28", highTemp: 17, lowTemp: 12, weather: "" },
        { time: "02-29", highTemp: 17, lowTemp: 12, weather: "" },
      ],
    });

    const visible = ref(false);

    const onClose = () => {
      emit("vanish");
    };

    return {
      ...toRefs(state),
      visible,
      onClose,
    };
  },
});
</script>

<style lang="scss" scoped>
.weather-box {
  position: relative;
  color: white;
  font-weight: bold;
  height: 640px;
  width: 820px;
  opacity: 0;
  transform: scale(0.75);
  transition: all 0.2s;
  border-radius: 12px;
  padding: 24px;
  background-image: linear-gradient(
    0deg,
    rgb(56, 127, 220) 0%,
    rgb(6, 81, 172) 100%
  );

  &.visible {
    transform: scale(1);
    opacity: 1;
  }

  .header {
    height: 36px;
    margin-bottom: 14px;
    line-height: 36px;
  }
  .content {
    height: calc(100% - 50px);
    overflow-y: scroll;
  }

  .basic-details {
    .position {
      font-size: 18px;
    }
    .tempreture {
      font-size: 76px;
    }

    .description {
      font-size: 18px;
      .title {
        margin: 10px 0;
      }
    }
  }

  .other-details {
    margin-top: 40px !important;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
    row-gap: 20px;
    font-size: 18px;

    &-item {
      display: flex;
      justify-content: space-between;
    }
  }

  .forecast-list {
    .forecast-item {
      padding: 12px 20px;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .time {
        margin-bottom: 10px;
      }

      .current-temperature {
        font-size: 22px;
        margin-bottom: 10px;
      }

      .high-temperature {
        font-size: 22px;
        margin-bottom: 10px;
      }

      // .weather-icon {
      //   margin-bottom: 10px;
      // }
    }
  }

  .details-container {
    background: rgba($color: #fff, $alpha: 0.05);
    padding: 16px;
    border-radius: 6px;
    margin: 20px 0;

    .title {
      font-weight: bold;
    }
  }
}
</style>
