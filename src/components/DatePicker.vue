<template>
  <div class="root">
    <h1 class="title">이번달 야근 수당</h1>
    <nav class="gnb">
      <ul>
        <li @click="handleClickGnb('COMMUTE')" class="commute active">출·퇴근 체크</li>
        <li @click="handleClickGnb('DATE_PICKER')" class="date_picker">달력 보기</li>
        <li @click="handleClickGnb('TOTAL_PAY')" class="total_pay">전체 금액 보기</li>
      </ul>
    </nav>

    <div v-show="gnb.isCommute">
      <div class="overtime_totalPay">
        누적금액:
        <strong id="totalOvertimePay"></strong> 원
      </div>
      <b-popover
        target="isAttendanceTimePopup"
        :show.sync="isAttendanceTimePopup"
        ,
        placement="top"
        triggers="click"
      >{{ currentTime }} 출근 완료!</b-popover>
      <b-popover
        target="isLeaveWorkTimePopup"
        :show.sync="isLeaveWorkTimePopup"
        ,
        placement="top"
        triggers="click"
      >{{ currentTime }} 퇴근 완료!</b-popover>
      <div class="btns-box">
        <b-button
          id="isAttendanceTimePopup"
          size="lg"
          @click="handleClickQuickBtn('ATTENDANCE_TIME')"
        >출근</b-button>
        <b-button
          id="isLeaveWorkTimePopup"
          size="lg"
          @click="handleClickQuickBtn('LEAVE_WORK_TIME')"
        >퇴근</b-button>
        <div class="guide-box">
          <b-button-group size="sm">
            <b-button variant="outline-dark" size="sm" @click="$bvToast.show('guide-toast')">사용방법</b-button>
          </b-button-group>
          <b-toast id="guide-toast" class="guide-toast" title="사용 전 필독" static no-auto-hide>
            <ul>
              <li>· 야근수당 계산기는 캐시기반으로 동작하기 때문에 모바일에서 각각의 브라우저에 데이터가 따로 저장됩니다.</li>
              <li>· 하나의 브라우저를 정해두고 캐시를 지우지 마시고 사용하시기 바랍니다.</li>
              <li>· 월요일 아침에는 새로고침을 한번씩만 해주세요. (업데이트 한 작업사항이 반영됩니다.)</li>
              <li>· 매달 1일에 데이터가 초기화 되므로 말일에는 총 금액을 캡쳐해두시기 바랍니다.</li>
            </ul>
          </b-toast>
        </div>
        <div class="toast_box">
          <b-toast id="example-toast" title="공지사항" static no-auto-hide>
            매월 1일에 데이터가 초기화됩니다.
            <br />말일에는 스크린샷을 찍어주세요.
          </b-toast>
        </div>
      </div>
    </div>
    <div v-show="gnb.isDatePicker">
      <div class="datepicker_wrapper">
        <datepicker
          :inline="true"
          :highlighted="highlighted"
          :language="ko"
          @selected="handleSelectd"
        ></datepicker>

        <template v-if="isPopup">
          <div class="popup" @click="handleClickPopup">
            <div class="popup_inner">
              <section>
                <h3 class="popup_inner_title">출근 시간:</h3>
                <div class="selectBox">
                  <select name="attendanceHour" @change="handleChangeTime">
                    <option disabled value selected>출근 (Hour)을 선택</option>
                    <option value="09">9시</option>
                    <option value="10">10시</option>
                    <option value="11">11시</option>
                    <option value="12">12시</option>
                    <option value="13">13시</option>
                    <option value="14">14시</option>
                    <option value="15">15시</option>
                  </select>
                  <select name="attendanceMinute" @change="handleChangeTime">
                    <option disabled value selected>출근 (Minute)을 선택</option>
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
              <section class="mt15">
                <h3 class="popup_inner_title">퇴근 시간:</h3>
                <div class="selectBox">
                  <select name="leaveWorkHour" @change="handleChangeTime">
                    <option disabled value selected>퇴근 (Hour)을 선택</option>
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
                    <option disabled value selected>퇴근 (Minute)을 선택</option>
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
      <button class="timePay_init" @click="handleClickTimePayInit">시급 초기화</button>
    </div>
  </div>
</template>

<script>
import { ko } from "vuejs-datepicker/dist/locale";
import Datepicker from "vuejs-datepicker";
import { CountUp } from "countup.js";

export default {
  data() {
    return {
      ko,
      isPopup: false,
      isAttendanceTimePopup: false,
      isLeaveWorkTimePopup: false,

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
      totalPay: 0,
      holidayList: [],
      currentMonth:
        localStorage.getItem("currentMonth") ||
        localStorage.setItem("currentMonth", new Date().getMonth() + 1),
      currentTime: null,
      gnb: {
        isCommute: true,
        isDatePicker: false,
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
      },
      quickTime: {
        type: "",
        hour: "",
        minute: ""
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
    this.mountedTaskAll();
    this.renderTaskAll();
    this.$bvToast.show("example-toast");
  },
  methods: {
    mountedTaskAll() {
      this.initCalendarEle();
      this.handleEventClear();
      this.handleClickGnb();
      this.monthStartCheck();
      this.totalOverTime();
      this.holidayListCheck();
    },
    handleClickTimePayInit() {
      localStorage.removeItem("timePay");
      this.$router.replace("/");
    },
    handleClickPopup(e) {
      const targetPopup = e.target.getAttribute("class") === "popup";

      if (targetPopup) this.isPopup = false;
    },
    handleClickGnb(name) {
      if (!name) return;

      const CONSTANTS = {
        COMMUTE: "isCommute",
        DATE_PICKER: "isDatePicker",
        TOTAL_PAY: "isTotalPay"
      };
      const gnbKeys = Object.keys(this.gnb);
      const listEle = window.document.querySelectorAll(".gnb ul li");
      const targetEle = window.document.querySelector(`.${name.toLowerCase()}`);

      if (CONSTANTS[name] === CONSTANTS.COMMUTE) {
        this.numberCountUp("totalOvertimePay", this.totalPay);
      }

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
      const currentMonth =
        this.currentMonth || localStorage.getItem("currentMonth");

      if (Number(currentMonth) === getMonth) return;

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

      const totalOverMiniteSum = (
        (this.totalOverTime().reduce((p, c) => p + c) - 1200) /
        60
      ).toFixed(1);
      const totalOverHour = totalOverMiniteSum / 60;
      const isWeekendList = this.fixedTimeList().map(v => v.isWeekend === true);

      let baseMiniteCount = 1200;
      const minusBaseOverTime = this.totalOverTime().map(v => {
        if (v > 0 && baseMiniteCount > 0) {
          if (v <= baseMiniteCount) {
            baseMiniteCount = baseMiniteCount - v;
            return 0;
          } else {
            if (baseMiniteCount - v > 0) {
              baseMiniteCount = v - baseMiniteCount;
              return v - baseMiniteCount;
            } else {
              const operator = v - baseMiniteCount;

              baseMiniteCount = 0;
              return operator;
            }
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
      this.totalPay = totalPay();

      this.totalOvertimePay = this.numberWithCommas(this.totalPay);
      this.totalOvertime = totalOverMiniteSum;

      this.numberCountUp("totalOvertimePay", this.totalPay);
    },
    numberCountUp(target, number) {
      const countUp = new CountUp(target, number);
      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
      }
    },
    renderToAddClass() {
      const cellDayList = document.querySelectorAll(".cell.day");
      const BLANK = "blank";
      const attendanceTimeIndexList =
        JSON.parse(this.getTimeList).attendanceTime &&
        JSON.parse(this.getTimeList)
          .attendanceTime.map((v, i) => v && i)
          .filter(v => String(v));
      const leaveWorkTimeIndexList =
        JSON.parse(this.getTimeList).leaveWorkTime &&
        JSON.parse(this.getTimeList)
          .leaveWorkTime.map((v, i) => v && i)
          .filter(v => String(v));
      let blankCount = 0;

      Array.from(cellDayList).forEach((v, index, arr) => {
        if (v.classList.contains(BLANK)) {
          ++blankCount;
        }
      });
      Array.from(cellDayList).forEach((v, index, arr) => {
        if (
          attendanceTimeIndexList &&
          leaveWorkTimeIndexList &&
          attendanceTimeIndexList.includes(index) &&
          leaveWorkTimeIndexList.includes(index)
        ) {
          arr[index + blankCount].classList.add("active");
        }
      });
    },
    renderToAddCellEle() {
      const getTimeList = JSON.parse(this.getTimeList);
      const cellDayList = document.querySelectorAll(".cell.day");
      let count = 0;

      Array.from(cellDayList).map((v, i) => {
        if (v.classList.contains("blank")) return;

        v.innerHTML = `
          <span class="cell_day">${count + 1}</span>
          <span class="cell_attendanceTime">
            ${
              getTimeList.attendanceTime
                ? getTimeList.attendanceTime[count]
                  ? JSON.stringify(getTimeList.attendanceTime[count].hour) &&
                    JSON.stringify(
                      getTimeList.attendanceTime[count].hour
                    ).replace(/\"/g, "")
                  : ""
                : ""
            }
            ${
              getTimeList.attendanceTime && getTimeList.attendanceTime[count]
                ? ":"
                : ""
            }
            ${
              getTimeList.attendanceTime
                ? getTimeList.attendanceTime[count]
                  ? JSON.stringify(getTimeList.attendanceTime[count].minute) &&
                    JSON.stringify(
                      getTimeList.attendanceTime[count].minute
                    ).replace(/\"/g, "")
                  : ""
                : ""
            }
          </span>
          <span class="cell_leaveWorkTime">
          ${
            getTimeList.leaveWorkTime
              ? getTimeList.leaveWorkTime[count]
                ? JSON.stringify(getTimeList.leaveWorkTime[count].hour) &&
                  JSON.stringify(getTimeList.leaveWorkTime[count].hour).replace(
                    /\"/g,
                    ""
                  )
                : ""
              : ""
          }
          ${
            getTimeList.leaveWorkTime && getTimeList.leaveWorkTime[count]
              ? ":"
              : ""
          }
            ${
              getTimeList.leaveWorkTime
                ? getTimeList.leaveWorkTime[count]
                  ? JSON.stringify(getTimeList.leaveWorkTime[count].minute) &&
                    JSON.stringify(
                      getTimeList.leaveWorkTime[count].minute
                    ).replace(/\"/g, "")
                  : ""
                : ""
            }
          </span>
      `;

        ++count;
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
    toastPopupTaskAll(e) {
      const CONSTANTS = {
        ATTENDANCE: "ATTENDANCE_TIME",
        LEAVE_WORK: "LEAVE_WORK_TIME",

        IS_ATTENDANCE_TIME_POPUP: "isAttendanceTimePopup",
        IS_LEAVE_WORK_TIME_POPUP: "isLeaveWorkTimePopup",
        DELAY: 1500
      };
      const date = new Date();
      const targetPopupTask = {
        [CONSTANTS.ATTENDANCE]: () => {
          this.isAttendanceTimePopup = !this.isAttendanceTimePopup;

          setTimeout(() => {
            this.isAttendanceTimePopup = false;
          }, CONSTANTS.DELAY);
        },
        [CONSTANTS.LEAVE_WORK]: () => {
          this.isLeaveWorkTimePopup = !this.isLeaveWorkTimePopup;

          setTimeout(() => {
            this.isLeaveWorkTimePopup = false;
          }, CONSTANTS.DELAY);
        }
      };

      targetPopupTask[e]();

      this.currentTime = `${date.getHours()}시 ${date.getMinutes()}분`;
    },
    handleClickQuickBtn(e) {
      const CONSTANTS = {
        ATTENDANCE: "ATTENDANCE_TIME",
        LEAVE_WORK: "LEAVE_WORK_TIME",

        ATTENDANCE_HOUR: "attendanceHour",
        ATTENDANCE_MINUTE: "attendanceMinute",
        LEAVE_WORK_HOUR: "leaveWorkHour",
        LEAVE_WORK_MINUTE: "leaveWorkMinute"
      };
      const date = new Date();
      this.getMonth = date.getMinutes() + 1;
      this.getDate = date.getDate();
      this.getDay = date.getDay();
      this.selectedIndex = this.getDate - 1;

      const getTime = time => {
        return String(time).length === 1 ? `0${String(time)}` : String(time);
      };
      const getHours = getTime(date.getHours());
      const getMinite = getTime(date.getMinutes());

      if (CONSTANTS.ATTENDANCE === e) {
        this.handleChangeTime(CONSTANTS.ATTENDANCE_HOUR, getHours);
        this.handleChangeTime(CONSTANTS.ATTENDANCE_MINUTE, getMinite);
      }
      if (CONSTANTS.LEAVE_WORK === e) {
        this.handleChangeTime(CONSTANTS.LEAVE_WORK_HOUR, getHours);
        this.handleChangeTime(CONSTANTS.LEAVE_WORK_MINUTE, getMinite);
      }

      this.handleClickClosePopup();
      this.toastPopupTaskAll(e);
    },
    handleChangeTime(e, time) {
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
      const timeType = time ? e : e.target.name;
      const selectedTime = time ? time : e.target.value;

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
.root {
  padding: 20px;
}
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
  height: 78px;
  border: none;
  margin-left: -1px;
  line-height: inherit;
}
.cell.day {
  line-height: inherit;
}
.cell.day.active,
.cell.day.highlighted.active {
  background: #ddd !important;
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
  left: -20px;
  z-index: 10;
  width: calc(100% + 40px);
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
  padding: 15px;
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
.overtime_totalPay strong {
  font-size: 1.15rem;
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
.timePay_init {
  padding: 10px;
  margin-top: 20px;
  border: 1px solid #ddd;
  background-color: #fff;
}
.toast_box {
  width: 300px;
  margin: 50px auto 0;
}
.toast_box > div {
  margin: 0 auto;
}
.btns-box {
  position: relative;
  margin-top: 30px;
}
.btns-box > .btn {
  padding: 10px 40px;
}
.btns-box > .btn:first-child {
  margin-right: 10px;
}
select {
  background-color: #fff;
  padding: 10px;
  padding-right: 30px;
  border: 1px solid #999;
  border-radius: 0px;
  background-image: url(../assets/select-icon.jpg);
  background-repeat: no-repeat;
  background-size: 10% 50%;
  background-position: center right;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.mt15 {
  margin-top: 15px;
}
.selectBox select:not(:first-child) {
  margin-left: 5px;
}
.guide-box {
  padding: 25px 0 15px;
}
.guide-box #guide-toast__toast_outer {
  margin-left: auto;
  margin-right: auto;
}
.guide-box > button {
  margin: 0;
}
.guide-toast {
  margin-top: 15px;
}
.guide-toast ul {
  list-style: none;
  text-align: left;
  padding: 0 5px 0 10px;
  margin: 0;
}
.guide-toast ul li {
  margin-top: 5px;
  text-indent: -6px;
  font-size: 12px;
}
.guide-toast ul li:first-child {
  margin-top: 0;
}
</style>
