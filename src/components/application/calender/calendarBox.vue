<template>
  <div class="calendar-box-wrapper box-cover" @click="onClose">
    <div
      class="calendar-box"
      :class="visible ? 'visible' : 'hidden'"
      @click.stop
    >
      <div class="calendar-head">
        <div class="date-box">
          <span class="month">{{ `${monthZH[currentMonth - 1]}月` }}</span>
          <span class="year">{{ currentYear }}</span>
        </div>
        <div class="date-operation">
          <span class="date-operation-button" @click="prevMonth">
            <i-system-uicons-arrow-left
              style="font-size: 18px; stroke-width: 2px"
            />
          </span>

          <span class="date-operation-button" @click="nextMonth">
            <i-system-uicons-arrow-right
              style="font-size: 18px; stroke-width: 2px"
            />
          </span>
        </div>
      </div>
      <div
        :class="[
          'calendar-content',
          Math.ceil(calendarList.length / 7) === 6 ? 'row_7' : 'row_6',
        ]"
      >
        <div style="background: #f5f5f5">星期日</div>
        <div>星期一</div>
        <div>星期二</div>
        <div>星期三</div>
        <div>星期四</div>
        <div>星期五</div>
        <div style="background: #f5f5f5">星期六</div>
        <div
          v-for="(item, index) in calendarList"
          :key="index"
          :class="[item ? ([6, 0].includes(item?.week!) ? 'week-day' : '') : '']"
        >
          {{ item?.day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onBeforeMount } from "vue";

export default defineComponent({
  emits: ["vanish"],
  setup(props, { emit }) {
    const state = reactive({
      currentYear: 1900,
      currentMonth: 1,
      currentDay: 1,
      currentWeek: 1,
      calendarList: [] as ({
        day: number;
        week: number;
      } | null)[],
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
    });

    const visible = ref(false);

    const initCalender = (date?: string) => {
      const now = date ? new Date(date) : new Date();

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

      // 填充剩余
      const l = days.length;
      if (l < 35 || (35 < l && l < 42)) {
        const residue = l < 35 ? 35 - l : 42 - l;
        for (let i = l; i < l + residue; i++) {
          days[i] = null;
        }
      }

      state.calendarList = days;
      // console.log(days);
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
      return date.getDay();
    };

    const prevMonth = () => {
      if (state.currentMonth === 1) {
        state.currentYear -= 1;
        state.currentMonth = 12;
      }

      state.currentMonth -= 1;
      initCalender(formatDate(state.currentYear, state.currentMonth, 1));
    };

    const nextMonth = () => {
      if (state.currentMonth === 12) {
        state.currentYear += 1;
        state.currentMonth = 1;
      }

      state.currentMonth += 1;
      initCalender(formatDate(state.currentYear, state.currentMonth, 1));
    };

    onBeforeMount(() => {
      initCalender();
    });

    const onClose = () => {
      emit("vanish");
    };

    return {
      ...toRefs(state),
      onClose,
      visible,
      prevMonth,
      nextMonth,
    };
  },
});
</script>

<style lang="scss" scoped>
.calendar-box {
  position: relative;
  // font-weight: bold;
  height: 640px;
  width: 820px;
  opacity: 0;
  transform: scale(0.75);
  transition: all 0.2s;
  border-radius: 12px;
  padding: 24px;
  background-color: #fff;
  display: flex;
  flex-direction: column;

  &.visible {
    transform: scale(1);
    opacity: 1;
  }

  .calendar-head {
    display: flex;
    align-items: center;
    padding: 0px 6px 24px 0px;
    font-size: 24px;

    .date-box > .month {
      font-weight: bold;
      margin-right: 12px;
      color: red;
    }

    .date-operation {
      position: absolute;
      display: flex;
      left: 240px;
      &-button {
        border: 1px solid #cccccc;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 6px;
        cursor: pointer;

        &:active {
          background: #cccccc;
        }

        &:first-child {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }

        &:last-child {
          border-left: 0;
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        }
      }
    }
    // & > .year {
    // }
  }

  .calendar-content {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    border-left: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;

    &.row_7 {
      grid-template-rows: repeat(7, 1fr);
    }

    .week-day {
      background: #f5f5f5;
    }

    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid #e8e8e8;
      border-right: 1px solid #e8e8e8;
    }
  }
}
</style>
