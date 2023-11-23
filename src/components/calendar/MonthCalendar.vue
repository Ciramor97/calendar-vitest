<template>
  <div class="calendar">
    <nav>
      <h3>{{ cal.yearText }} - {{ cal.monthText }}</h3>
      <div class="navs">
        <button @click="prevMonth()">Prev</button>
        <button @click="nextMonth()">Next</button>
      </div>
    </nav>
    <section class="body">
      <div v-for="week in cal.getWeeks()" :key="week" class="week">
        <div
          v-for="date in week.days()"
          :key="date"
          class="cell"
          :class="{ oob: !cal.containsDate(date), today: cal.isToday(date) }"
        >
          <span class="date">{{ date.date }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Calendar } from "./";
import { ref } from "vue";

const cal = ref(Calendar.fromYm(2023, 11));

const prevMonth = () => {
  cal.value = cal.value.prevMonth();
};

const nextMonth = () => {
  cal.value = cal.value.nextMonth();
};
</script>

<style lang="scss">
.calendar {
  display: flex;
  flex-direction: column;
  height: 600px;
  nav {
    h3 {
      margin: 0;
    }
    .navs {
      display: flex;
      justify-content: center;
      padding: 20px;
      button {
        margin-right: 10px;
      }
    }
  }
  section {
    &.body {
      flex: 1 1 auto;
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;

      .week {
        display: flex;
        flex: 1 1 auto;
        height: calc(100% / 6);
        &:first-child {
          border-top: 1px solid #efefef;
        }
        .cell {
          flex: 1 1 calc(100% / 7);
          width: calc(100% / 7);
          position: relative;
          border-bottom: 1px solid #efefef;
          border-right: 1px solid #efefef;
          &:first-child {
            border-left: 1px solid #efefef;
          }

          &.oob {
            .date {
              background-color: transparent;
              color: #ccc;
            }
          }
          &.today {
            .date {
              background-color: #ffe5e9;
              color: #a4001f;
            }
          }
          .date {
            position: absolute;
            top: 6px;
            right: 6px;
            font-size: 12px;
            background-color: #dcefff;
            color: #0064bb;
            border-radius: 20px;
            display: flex;
            width: 28px;
            height: 28px;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
