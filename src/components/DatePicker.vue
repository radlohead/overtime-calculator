<template>
  <div class="root">
    <h1 class="title">이번달 야근 수당</h1>
    <nav class="gnb">
      <ul>
        <li @click="handleClickGnb('DATE_PICKER')" class="date_picker active">달력 보기</li>
        <li @click="handleClickGnb('TOTAL_PAY')" class="total_pay">전체 금액 보기</li>
      </ul>
    </nav>

    <div v-show="gnb.isDatePicker">
      <div class="datepicker_wrapper">
        <datepicker
          :inline="true"
          :highlighted="highlighted"
          :language="ko"
          @selected="handleSelectd"
        ></datepicker>

        <template v-if="isPopup">
          <div class="popup">
            <div class="popup_inner">
              <section>
                <h3 class="popup_inner_title">출근 시간:</h3>
                <div class="selectBox">
                  <select name="attendanceHour" @change="handleChangeTime">
                    <option disabled value selected>출근 시간(Hour)을 선택해 주세요.</option>
                    <option value="09">9시</option>
                    <option value="10">10시</option>
                    <option value="11">11시</option>
                    <option value="12">12시</option>
                    <option value="13">13시</option>
                    <option value="14">14시</option>
                    <option value="15">15시</option>
                  </select>
                  <select name="attendanceMinute" @change="handleChangeTime">
                    <option disabled value selected>출근 분(Minute)을 선택해 주세요.</option>
                    <option value="00">0분</option>
                    <option value="05">5분</option>
                    <option value="10">10분</option>
                    <option value="15">15분</option>
                    <option value="20">20분</option>
                    <option value="25">25분</option>
                    <option value="30">30분</option>
                    <option value="35">35분</option>
                    <option value="40">40분</option>
                    <option value="45">45분</option>
                    <option value="50">50분</option>
                    <option value="55">55분</option>
                  </select>
                </div>
              </section>
              <section>
                <h3 class="popup_inner_title">퇴근 시간:</h3>
                <div class="selectBox">
                  <select name="leaveWorkHour" @change="handleChangeTime">
                    <option disabled value selected>퇴근 시간(Hour)을 선택해 주세요.</option>
                    <option value="14">14시</option>
                    <option value="15">15시</option>
                    <option value="16">16시</option>
                    <option value="17">17시</option>
                    <option value="18">18시</option>
                    <option value="19">19시</option>
                    <option value="20">20시</option>
                    <option value="21">21시</option>
                    <option value="22">22시</option>
                    <option value="23">23시</option>
                    <option value="24">24시</option>
                    <option value="01">1시</option>
                    <option value="02">2시</option>
                    <option value="03">3시</option>
                    <option value="04">4시</option>
                  </select>
                  <select name="leaveWorkMinute" @change="handleChangeTime">
                    <option disabled value selected>퇴근 분(Minute)을 선택해 주세요.</option>
                    <option value="00">0분</option>
                    <option value="05">5분</option>
                    <option value="10">10분</option>
                    <option value="15">15분</option>
                    <option value="20">20분</option>
                    <option value="25">25분</option>
                    <option value="30">30분</option>
                    <option value="35">35분</option>
                    <option value="40">40분</option>
                    <option value="45">45분</option>
                    <option value="50">50분</option>
                    <option value="55">55분</option>
                  </select>
                </div>
              </section>
              <span class="horizon-line"></span>
              <button class="popup_inner_submitBtn" @click="handleClickClosePopup">입력 완료</button>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div v-show="gnb.isTotalPay">
      <header class="header">
        <table class="header_table">
          <caption>야근 수당 계산</caption>
          <tbody>
            <tr>
              <th>현재 시급:</th>
              <td>
                <span class="current_timePay">{{ numberWithCommas(timePay) }} 원</span>
              </td>
            </tr>
            <tr>
              <th>야근 시급:</th>
              <td>
                <span class="overtime_pay">{{ numberWithCommas(timePay * 1.5) }} 원</span>
              </td>
            </tr>
            <tr>
              <th>이번달 야근 수당:</th>
              <td>
                <span class="overtime_totalPay">{{ totalOvertimePay }} 원</span>
              </td>
            </tr>
            <tr>
              <th>이번달 야근 시간:</th>
              <td>
                <span class="overtime_total">{{ totalOvertime }} 시간</span>
              </td>
            </tr>
          </tbody>
        </table>
      </header>
    </div>
  </div>
</template>

<script>
import { ko } from "vuejs-datepicker/dist/locale";
import Datepicker from "vuejs-datepicker";

export default {
  data() {
    return {
      ko,
      isPopup: false,
      date: {
        getMonth: null,
        getDate: null,
        getDay: null
      },
      time: {
        attendanceTime: [],
        leaveWorkTime: []
      },
      today: null,
      getTimeList: localStorage.getItem("getTimeList") || "{}",
      timePay: JSON.parse(localStorage.getItem("timePay") || "{}"),
      selectedIndex: null,
      selectedTimeList: [],
      totalOvertimePay: 0,
      totalOvertime: 0,
      holidayList: [],
      currentMonth:
        localStorage.getItem("currentMonth") ||
        localStorage.setItem("currentMonth", new Date().getMonth() + 1),
      gnb: {
        isDatePicker: true,
        isTotalPay: false
      },

      highlighted: {
        days: [0],
        dates: [
          new Date(2019, 8, 12),
          new Date(2019, 8, 13),
          new Date(2019, 9, 3),
          new Date(2019, 9, 9),
          new Date(2019, 11, 25)
        ],
        includeDisabled: true
      }
    };
  },
  watch: {
    gnb: {
      handler: function() {
        this.getTimeList = localStorage.getItem("getTimeList") || "{}";
        this.mountedTaskAll();
        this.renderTaskAll();
      },
      deep: true
    }
  },
  created() {
    const timePay = localStorage.getItem("timePay");

    if (timePay) return;
    this.$router.replace("/");

    this.setToday();
  },
  mounted() {
    this.initCalendarEle();
    this.handleEventClear();
    this.mountedTaskAll();
    this.renderTaskAll();
  },
  methods: {
    mountedTaskAll() {
      this.handleClickGnb();
      this.monthStartCheck();
      this.totalOverTime();
      this.holidayListCheck();
    },
    handleClickGnb(name) {
      if (!name) return;

      const CONSTANTS = {
        DATE_PICKER: "isDatePicker",
        TOTAL_PAY: "isTotalPay"
      };
      const gnbKeys = Object.keys(this.gnb);
      const listEle = window.document.querySelectorAll(".gnb ul li");
      const targetEle = window.document.querySelector(`.${name.toLowerCase()}`);

      gnbKeys.forEach(key => {
        this.gnb[key] = false;
      });
      this.gnb[CONSTANTS[name]] = true;

      Array.from(listEle).forEach(item => {
        item.classList.remove("active");
      });
      targetEle.classList.add("active");
    },
    handleEventClear() {
      const header = window.document.querySelector(
        ".vdp-datepicker__calendar header"
      );
      const createElementDiv = window.document.createElement("div");

      createElementDiv.classList.add("header_blank");
      header.appendChild(createElementDiv);
    },
    initCalendarEle() {
      const doc = window.document;
      const prevEle = doc.querySelector(".vdp-datepicker__calendar .prev");
      const nextEle = doc.querySelector(".vdp-datepicker__calendar .next");

      prevEle.classList.add("hidden");
      nextEle.classList.add("hidden");
    },
    monthStartCheck() {
      const date = new Date();
      const getMonth = date.getMonth() + 1;

      if (Number(this.currentMonth) === getMonth) return;

      localStorage.setItem("currentMonth", getMonth);
      localStorage.setItem("getTimeList", "{}");
    },
    holidayListCheck() {
      const date = new Date();
      const dateList = () => {
        return this.highlighted.dates.map(v => new Date(v));
      };
      const dateMonthAgreeList = () => {
        const isMonthList = dateList()
          .map(v => v.getMonth() === date.getMonth())
          .map((v, i) => v && dateList()[i])
          .filter(v => v);

        return isMonthList;
      };
      const dateDayAgreeList = () => dateMonthAgreeList().map(v => v.getDate());

      return dateDayAgreeList();
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    fixedTimeList() {
      const timeList = JSON.parse(this.getTimeList);
      const attendanceTime = timeList.attendanceTime;
      const leaveWorkTime = timeList.leaveWorkTime;
      const date = new Date();
      const fixedTimeList = [];

      if (!attendanceTime) return;

      attendanceTime.forEach((v, i) => {
        if (!v || !leaveWorkTime[i]) return;

        date.setDate(i + 1);
        fixedTimeList.push({
          attendanceTime: attendanceTime[i],
          leaveWorkTime: leaveWorkTime[i],
          day: i + 1,
          isWednesday: date.getDay() === 3,
          isWeekend:
            date.getDay() === 0 ||
            date.getDay() === 6 ||
            this.holidayListCheck().includes(i + 1)
        });
      });

      return fixedTimeList;
    },
    totalOverTime() {
      const timeList = JSON.parse(this.getTimeList);
      const attendanceTime = timeList.attendanceTime;
      const leaveWorkTime = timeList.leaveWorkTime;
      const date = new Date();

      let overTimeCount = 0;

      this.fixedTimeList();

      if (!this.fixedTimeList()) return;

      const totalMiniteList = this.fixedTimeList().map(v => {
        const attendanceHour = Number(v.attendanceTime.hour);
        const attendanceMinute = Number(v.attendanceTime.minute);
        const leaveWorkHour = Number(v.leaveWorkTime.hour);
        const leaveWorkMinute = Number(v.leaveWorkTime.minute);

        const getHourToMinite = () => {
          let result = null;

          if (leaveWorkHour > 10 && leaveWorkHour < 24) {
            result =
              (date.setHours(leaveWorkHour) - date.setHours(attendanceHour)) /
              (1000 * 60);
          } else if (leaveWorkHour === 24) {
            result =
              (date.setHours(23) + 3600000 - date.setHours(attendanceHour)) /
              (1000 * 60);
          } else {
            result +=
              (date.setHours(23) + 3600000 - date.setHours(attendanceHour)) /
              (1000 * 60);
            result +=
              (date.setHours(leaveWorkHour) - date.setHours(0)) / (1000 * 60);
          }

          return result;
        };
        const getMinite =
          (date.setMinutes(leaveWorkMinute) -
            date.setMinutes(attendanceMinute)) /
          60000;

        if (v.isWeekend) {
          return getHourToMinite() + getMinite;
        }
        if (v.isWednesday) {
          return getHourToMinite() + getMinite - 360;
        } else {
          return getHourToMinite() + getMinite - 540;
        }
      });

      return totalMiniteList;
    },
    renderTaskAll() {
      this.getTimeList = localStorage.getItem("getTimeList") || "{}";

      this.renderToAddCellEle();
      this.renderToAddClass();
      this.renderTotalOverTime();
    },
    renderTotalOverTime() {
      if (!this.totalOverTime() || !this.totalOverTime().length) return;

      const totalOverMiniteSum =
        this.totalOverTime().reduce((p, c) => p + c) - 1200;
      const totalOverHour = totalOverMiniteSum / 60;
      const isWeekendList = this.fixedTimeList().map(v => v.isWeekend === true);

      let baseMiniteCount = 1200;
      const minusBaseOverTime = this.totalOverTime().map(v => {
        if (v > 0 && baseMiniteCount > 0) {
          if (v <= baseMiniteCount) {
            baseMiniteCount = baseMiniteCount - v;
            return 0;
          } else {
            return v - baseMiniteCount;
          }
        } else {
          return v;
        }
      });

      const totalPay = () => {
        const totalTime = minusBaseOverTime.reduce((p, c) => p + c);

        if (totalTime <= 0) return 0;

        const result = minusBaseOverTime
          .map((minite, i) => {
            if (isWeekendList[i]) {
              if (minite >= 480) return (minite / 60) * (this.timePay * 2);
              return (minite / 60) * (this.timePay * 1.5);
            } else {
              return (minite / 60) * (this.timePay * 1.5);
            }
          })
          .reduce((p, c) => p + c)
          .toFixed(0);

        return result > 0 ? result : 0;
      };

      this.totalOvertimePay = this.numberWithCommas(totalPay());
      this.totalOvertime = (
        minusBaseOverTime.reduce((p, c) => p + c) / 60
      ).toFixed(1);
    },
    renderToAddClass() {
      const cellDayList = document.querySelectorAll(".cell.day");
      const attendanceTimeIndexList =
        JSON.parse(this.getTimeList).attendanceTime &&
        JSON.parse(this.getTimeList)
          .attendanceTime.map((v, i) => v && i)
          .filter(v => v);
      const leaveWorkTimeIndexList =
        JSON.parse(this.getTimeList).leaveWorkTime &&
        JSON.parse(this.getTimeList)
          .leaveWorkTime.map((v, i) => v && i)
          .filter(v => v);

      Array.from(cellDayList).forEach((v, index) => {
        if (attendanceTimeIndexList && attendanceTimeIndexList.includes(index))
          v.classList.add("active");
        if (attendanceTimeIndexList && leaveWorkTimeIndexList.includes(index))
          v.classList.add("active");
      });
    },
    renderToAddCellEle() {
      const getTimeList = JSON.parse(this.getTimeList);
      const cellDayList = document.querySelectorAll(".cell.day");

      Array.from(cellDayList).map((v, i) => {
        v.innerHTML = `
          <span class="cell_day">${i + 1}</span>
          <span class="cell_attendanceTime">
            ${
              getTimeList.attendanceTime
                ? getTimeList.attendanceTime[i]
                  ? JSON.stringify(getTimeList.attendanceTime[i].hour) &&
                    JSON.stringify(getTimeList.attendanceTime[i].hour).replace(
                      /\"/g,
                      ""
                    )
                  : ""
                : ""
            }
            ${
              getTimeList.attendanceTime && getTimeList.attendanceTime[i]
                ? ":"
                : ""
            }
            ${
              getTimeList.attendanceTime
                ? getTimeList.attendanceTime[i]
                  ? JSON.stringify(getTimeList.attendanceTime[i].minute) &&
                    JSON.stringify(
                      getTimeList.attendanceTime[i].minute
                    ).replace(/\"/g, "")
                  : ""
                : ""
            }
          </span>
          <span class="cell_leaveWorkTime">
          ${
            getTimeList.leaveWorkTime
              ? getTimeList.leaveWorkTime[i]
                ? JSON.stringify(getTimeList.leaveWorkTime[i].hour) &&
                  JSON.stringify(getTimeList.leaveWorkTime[i].hour).replace(
                    /\"/g,
                    ""
                  )
                : ""
              : ""
          }
          ${
            getTimeList.leaveWorkTime && getTimeList.leaveWorkTime[i] ? ":" : ""
          }
            ${
              getTimeList.leaveWorkTime
                ? getTimeList.leaveWorkTime[i]
                  ? JSON.stringify(getTimeList.leaveWorkTime[i].minute) &&
                    JSON.stringify(getTimeList.leaveWorkTime[i].minute).replace(
                      /\"/g,
                      ""
                    )
                  : ""
                : ""
            }
          </span>
      `;
      });
    },
    setToday() {
      const date = new Date();
    },
    handleSelectd(date) {
      this.getMonth = date.getUTCMonth() + 1;
      this.getDate = date.getUTCDate();
      this.getDay = date.getUTCDay();
      this.selectedIndex = this.getDate - 1;

      this.openPopup();
    },
    openPopup() {
      this.isPopup = true;
    },
    handleChangeTime(e) {
      const CONSTANTS = {
        ATTENDANCE_HOUR: "attendanceHour",
        ATTENDANCE_MINUTE: "attendanceMinute",
        LEAVE_WORK_HOUR: "leaveWorkHour",
        LEAVE_WORK_MINUTE: "leaveWorkMinute",

        ATTENDANCE_TIME: "attendanceTime",
        LEAVE_WORK_TIME: "leaveWorkTime",
        HOUR: "hour",
        MINUTE: "minute"
      };
      const timeType = e.target.name;
      const selectedTime = e.target.value;

      const setTargetSelectedTime = (target, dateType, initTime) => {
        const currentList = this.time[target][this.getDate - 1];

        if (!currentList) {
          this.time[target][this.getDate - 1] = {};
        }
        this.time[target][this.getDate - 1][dateType] =
          initTime || selectedTime;
      };

      const handleChangeInitTime = () => {
        setTargetSelectedTime(CONSTANTS.ATTENDANCE_TIME, CONSTANTS.HOUR, "10");
        setTargetSelectedTime(
          CONSTANTS.ATTENDANCE_TIME,
          CONSTANTS.MINUTE,
          "00"
        );
        setTargetSelectedTime(CONSTANTS.LEAVE_WORK_TIME, CONSTANTS.HOUR, "19");
        setTargetSelectedTime(
          CONSTANTS.LEAVE_WORK_TIME,
          CONSTANTS.MINUTE,
          "00"
        );
      };
      // handleChangeInitTime();

      const setSelectedTime = {
        [CONSTANTS.ATTENDANCE_HOUR]: () => {
          setTargetSelectedTime(CONSTANTS.ATTENDANCE_TIME, CONSTANTS.HOUR);
        },
        [CONSTANTS.ATTENDANCE_MINUTE]: () => {
          setTargetSelectedTime(CONSTANTS.ATTENDANCE_TIME, CONSTANTS.MINUTE);
        },
        [CONSTANTS.LEAVE_WORK_HOUR]: () => {
          setTargetSelectedTime(CONSTANTS.LEAVE_WORK_TIME, CONSTANTS.HOUR);
        },
        [CONSTANTS.LEAVE_WORK_MINUTE]: () => {
          setTargetSelectedTime(CONSTANTS.LEAVE_WORK_TIME, CONSTANTS.MINUTE);
        }
      };

      setSelectedTime[timeType]();

      if (this.selectedTimeList.includes(timeType)) return;
      this.selectedTimeList.push(timeType);
    },
    handleClickClosePopup() {
      const CONSTANTS = {
        ATTENDANCE_HOUR: "attendanceHour",
        ATTENDANCE_MINUTE: "attendanceMinute",
        LEAVE_WORK_HOUR: "leaveWorkHour",
        LEAVE_WORK_MINUTE: "leaveWorkMinute",

        ATTENDANCE_TIME: "attendanceTime",
        LEAVE_WORK_TIME: "leaveWorkTime"
      };
      const getTimeList = localStorage.getItem("getTimeList") || "{}";
      const attendanceTime = this.time[CONSTANTS.ATTENDANCE_TIME];
      const leaveWorkTime = this.time[CONSTANTS.LEAVE_WORK_TIME];

      this.isPopup = false;

      if (
        this.selectedTimeList.length !== 2 &&
        this.selectedTimeList.length !== 4
      ) {
        alert("시간이 제대로 선택되지 않았습니다.");
        return;
      }

      const selectedTimeListCheck = () => {
        const timeList = {
          attendanceTime: [],
          leaveWorkTime: []
        };

        const result = [];

        timeList.attendanceTime.push(
          this.selectedTimeList.includes(CONSTANTS.ATTENDANCE_HOUR)
        );
        timeList.attendanceTime.push(
          this.selectedTimeList.includes(CONSTANTS.ATTENDANCE_MINUTE)
        );
        timeList.leaveWorkTime.push(
          this.selectedTimeList.includes(CONSTANTS.LEAVE_WORK_HOUR)
        );
        timeList.leaveWorkTime.push(
          this.selectedTimeList.includes(CONSTANTS.LEAVE_WORK_MINUTE)
        );

        result.push(
          timeList.attendanceTime.every(timeType => timeType === true)
        );
        result.push(
          timeList.leaveWorkTime.every(timeType => timeType === true)
        );
        return result.some(v => v === true);
      };

      if (!selectedTimeListCheck()) {
        alert("시간이 제대로 선택되지 않았습니다.");
        return;
      }

      const setList = dataType => {
        const timeList = JSON.parse(getTimeList)[dataType];

        if (this.time[dataType][this.selectedIndex]) {
          timeList[this.selectedIndex] = this.time[dataType][
            this.selectedIndex
          ];
        }
        return Object.assign([], timeList);
      };
      const setInitList = dataType => {
        const initList = Array(31).fill(null);

        initList[this.selectedIndex] = this.time[dataType][this.selectedIndex];
        return initList;
      };

      const setTimeList = {
        attendanceTime: JSON.parse(getTimeList).attendanceTime
          ? setList("attendanceTime")
          : setInitList("attendanceTime"),
        leaveWorkTime: JSON.parse(getTimeList).leaveWorkTime
          ? setList("leaveWorkTime")
          : setInitList("leaveWorkTime")
      };
      localStorage.setItem(
        "getTimeList",
        JSON.stringify(Object.assign({}, setTimeList))
      );

      this.renderTaskAll();
    }
  },
  components: {
    Datepicker
  }
};
</script>

<style>
.vdp-datepicker__calendar {
  width: auto !important;
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
  padding-left: 13px !important;
}
.vdp-datepicker__calendar .cell.day-header {
  height: 40px !important;
  padding-top: 10px !important;
}
.vdp-datepicker__calendar header .prev.hidden,
.vdp-datepicker__calendar header .next.hidden {
  visibility: hidden;
}
.vdp-datepicker__calendar header {
  position: relative;
}
.header_blank {
  position: absolute;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 40px;
  background-color: transparent;
}
.today {
  color: #fff;
  background-color: #1bbf37;
}
.datepicker_wrapper .vdp-datepicker__calendar .cell {
  padding: 0;
  height: 75px;
  border: none;
  margin-left: -1px;
  line-height: inherit;
}
.cell.day {
  line-height: inherit;
}
.cell.day.active {
  background: #ddd;
}
.cell.day.highlighted {
  background: transparent !important;
  color: red;
}
.cell_day {
  display: block;
  padding: 10px 0;
}
.cell_attendanceTime,
.cell_leaveWorkTime {
  display: block;
  height: 18px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
  font-size: 11px;
}
.cell_leaveWorkTime {
  margin-top: -1px;
}
</style>
<style scoped>
.datepicker_wrapper {
  position: relative;
  margin-bottom: 20px;
}
.popup {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
}
.popup_inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  padding: 0 15px 15px;
  margin: 0 auto;
  border: 1px solid #bdbdbd;
  background-color: #fff;
}
.popup_inner_title {
  font-size: 14px;
}
.selectBox {
  display: flex;
  flex-direction: row;
}
select {
  width: 50%;
}
.horizon-line {
  display: block;
  margin: 15px 0;
  border-top: 1px solid #ddd;
}
.popup_inner_submitBtn {
  padding: 10px 13px;
  border: 1px solid #ddd;
}
.header_table {
  margin: 0 auto;
  border: 1px solid #ddd;
  border-collapse: collapse;
  background-color: #fff;
}
.header_table caption {
  display: none;
}
.header_table th {
}
.header_table th,
.header_table td {
  padding: 7px 15px;
  border: 1px solid #ddd;
}
.title {
  font-size: 18px;
}
.overtime_totalPay {
  color: red;
}
.gnb ul {
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 10px;
}
.gnb ul li {
  padding: 5px 3px;
  margin-left: -1px;
  cursor: pointer;
  color: #34495e;
}
.gnb ul li.active {
  color: #42b983;
  font-weight: bold;
}
.gnb ul li:not(:first-child):before {
  content: "";
  display: inline-block;
  height: 12px;
  padding-right: 5px;
  border-left: 1px solid #ddd;
}
</style>
