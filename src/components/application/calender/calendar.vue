<template>
  <div class="calender-cell">
    <div class="calender-date">{{ `${monthZH[currentMonth - 1]}月` }}</div>
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
          :class="[
            'date-days-item',
            [6, 0].includes(item?.week) ? 'opacity' : '',
            currentDay === item?.day ? 'current' : '',
          ]"
          v-for="(item, index) in monthDays"
          :key="index"
        >
          {{ item?.day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, toRefs } from "vue";
import CalendarBox from "./calendar";

export default defineComponent({
  setup() {
    const state = reactive({
      currentYear: 1900,
      currentMonth: 1,
      currentDay: 1,
      currentWeek: 1,
      monthZH: [
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
      ],
      monthDays: [] as {
        day: number;
        week: number;
      }[],
    });

    const fullScreen = () => {
      CalendarBox({});
    };

    const initCalender = () => {
      const now = new Date();

      state.currentYear = now.getFullYear();
      state.currentMonth = now.getMonth() + 1;
      state.currentDay = now.getDate();
      state.currentWeek = now.getDay() === 0 ? 7 : now.getDay();

      const daylength = getCurrentMonthLength(
        state.currentYear,
        state.currentMonth
      );

      let days = [];

      const formattedDate = formatDate(
        state.currentYear,
        state.currentMonth,
        1
      );
      let dayIndex = judgeWeek(formattedDate);

      for (let i = 1; i <= daylength; i++)
        days[dayIndex++] = {
          day: i,
          week: (dayIndex - 1) % 7,
        };
      state.monthDays = days;
      console.log(days);
    };

    // 获取当前月份的总天数
    const getCurrentMonthLength = (year: number, month: number) => {
      return new Date(year, month, 0).getDate();
    };

    // 格式化日期 YYYY-MM-DD
    const formatDate = (year: number, month: number, day: number) => {
      const y = year;
      let m: string | number = month;
      let d: string | number = day;
      if (month < 10) m = "0" + m;
      if (day < 10) d = "0" + d;

      return `${y}-${m}-${d}`;
    };

    // 判断是哪个星期
    const judgeWeek = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.getDay() === 0 ? 7 : date.getDay();
    };

    onBeforeMount(() => {
      initCalender();
    });

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
  box-sizing: border-box;

  .calender-date {
    // margin-bottom: 10px;
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
        display: flex;
        justify-content: center;
        align-items: center;

        &.opacity {
          color: rgba($color: #000000, $alpha: 0.45);
        }

        &.current {
          background-color: red;
          color: white;
          border-radius: 100%;
        }
      }
    }
  }
}
</style>
