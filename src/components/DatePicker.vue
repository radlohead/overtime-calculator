<template>
  <div class="root">
    <header class="header">
      <h1 class="title">야근 수당 계산</h1>
      <span class="current_timePay">현재 시급: {{ timePay }}원</span>
      <span class="overtime_pay">야근 시급: {{ timePay * 1.5 }}원</span>
      <span class="overtime_totalPay">이번달 야근 수당: {{ totalOvertimePay }}원</span>
      <span class="overtime_total">이번달 야근 시간: {{ totalOvertime }}시간</span>
    </header>
    <div class="datepicker_wrapper">
      <datepicker :inline="true" @selected="handleSelectd"></datepicker>

      <template v-if="isPopup">
        <div class="popup">
          <div class="popup_inner">
            <section>
              <h3>출근 시간:</h3>
              <div class="selectBox">
                <select name="attendanceHour" @change="handleChangeTime" multiple>
                  <option disabled value>출근 시(Hour)를 선택해 주세요.</option>
                  <option value="09">9시</option>
                  <option value="10">10시</option>
                  <option value="11">11시</option>
                  <option value="12">12시</option>
                  <option value="13">13시</option>
                  <option value="14">14시</option>
                  <option value="15">15시</option>
                </select>
                <select name="attendanceMinute" @change="handleChangeTime" multiple>
                  <option disabled value>출근 분(Minute)을 선택해 주세요.</option>
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
              <h3>퇴근 시간:</h3>
              <div class="selectBox">
                <select name="leaveWorkHour" @change="handleChangeTime" multiple>
                  <option disabled value>퇴근 시(Hour)를 선택해 주세요.</option>
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
                <select name="leaveWorkMinute" @change="handleChangeTime" multiple>
                  <option disabled value>퇴근 분(Minute)을 선택해 주세요.</option>
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
            <button @click="handleClickClosePopup">입력 완료</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  data() {
    return {
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
      timePay: JSON.parse(localStorage.getItem("timePay") || {}),
      selectedIndex: null,
      selectedTimeList: [],
      totalOvertimePay: 0,
      totalOvertime: 0
    };
  },
  created() {
    console.clear();
    this.setToday();
  },
  mounted() {
    this.renderTaskAll();
    this.totalOverTime();
  },
  methods: {
    fixedTimeList() {
      const timeList = JSON.parse(this.getTimeList);
      const attendanceTime = timeList.attendanceTime;
      const leaveWorkTime = timeList.leaveWorkTime;
      const date = new Date();
      const fixedTimeList = [];

      attendanceTime.forEach((v, i) => {
        if (!v || !leaveWorkTime[i]) return;

        date.setDate(i + 1);
        fixedTimeList.push({
          attendanceTime: attendanceTime[i],
          leaveWorkTime: leaveWorkTime[i],
          day: i + 1,
          isWednesday: date.getDay() === 3,
          isWeekend: date.getDay() === 0 || date.getDay() === 6
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
      this.renderToAddCellEle();
      this.renderToAddClass();
      this.renderTotalOverTime();
    },
    renderTotalOverTime() {
      const totalOverMiniteSum = this.totalOverTime().reduce((p, c) => p + c);
      const totalOverHour = totalOverMiniteSum / 60;
      const isWeekendList = this.fixedTimeList().map(v => v.isWeekend === true);

      this.totalOvertimePay = Math.floor(totalOverHour * (this.timePay * 1.5));
      this.totalOvertime = totalOverHour.toFixed(1);

      console.log(
        "renderTotalOverTime: ",
        this.fixedTimeList(),
        this.totalOverTime(),
        isWeekendList
      );
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
      // console.log("setToday: ", date.getUTCDate());
    },
    handleSelectd(date) {
      this.getMonth = date.getUTCMonth() + 1;
      this.getDate = date.getUTCDate();
      this.getDay = date.getUTCDay();
      this.selectedIndex = this.getDate - 1;
      // console.log("handleSelectd: ", this.getMonth, this.getDate, this.getDay);

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
      console.log("change: ", e);

      const setTargetSelectedTime = (target, dateType, initTime) => {
        // console.log("setTarget: ", initTime, selectedTime);
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

      console.log(1, this.selectedTimeList, this.selectedTimeList.length);
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

      console.log("selectedTimeList: ", selectedTimeListCheck());
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
  /* top: 50%; */
  /* left: 50%; */
  /* transform: translate(-50%, -50%); */
  width: 80%;
  max-width: 500px;
  padding: 15px;
  margin: 0 auto;
  border: 1px solid #bdbdbd;
  background-color: #fff;
}
.selectBox {
  display: flex;
  flex-direction: row;
}
select {
  width: 50%;
}
.header {
}
.title {
  font-size: 18px;
}
.overtime_totalPay {
  color: red;
}
</style>
