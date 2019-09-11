<template>
  <div class="root">
    <h1>야근 수당 계산</h1>
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
                  <option value="9">9시</option>
                  <option value="10">10시</option>
                  <option value="11">11시</option>
                  <option value="12">12시</option>
                  <option value="13">13시</option>
                  <option value="14">14시</option>
                  <option value="15">15시</option>
                </select>
                <select name="attendanceMinute" @change="handleChangeTime" multiple>
                  <option disabled value>출근 분(Minute)을 선택해 주세요.</option>
                  <option value="0">0분</option>
                  <option value="5">5분</option>
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
                  <option value="9">9시</option>
                  <option value="10">10시</option>
                  <option value="11">11시</option>
                  <option value="12">12시</option>
                  <option value="13">13시</option>
                  <option value="14">14시</option>
                  <option value="15">15시</option>
                </select>
                <select name="leaveWorkMinute" @change="handleChangeTime" multiple>
                  <option disabled value>퇴근 분(Minute)을 선택해 주세요.</option>
                  <option value="0">0분</option>
                  <option value="5">5분</option>
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
      today: null
    };
  },
  created() {
    console.clear();
    this.setToday();
  },
  mounted() {},
  methods: {
    setToday() {
      const date = new Date();
      console.log("setToday: ", date.getUTCDate());
    },
    handleSelectd(date) {
      this.getMonth = date.getUTCMonth() + 1;
      this.getDate = date.getUTCDate();
      this.getDay = date.getUTCDay();
      console.log("handleSelectd: ", this.getMonth, this.getDate, this.getDay);

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

      const setTargetSelectedTime = (target, dateType) => {
        const currentList = this.time[target][this.getDate - 1];

        if (!currentList) {
          this.time[target][this.getDate - 1] = {};
        }
        this.time[target][this.getDate - 1][dateType] = selectedTime;
      };

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
      console.log("handleChangeTime: ", e.target.name, e.target.value);
    },
    handleClickClosePopup() {
      this.isPopup = false;
      console.log("closePopup: ", JSON.parse(JSON.stringify(this.time)));
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
}
.today {
  color: #fff;
  background-color: #1bbf37;
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
.selectBox {
  display: flex;
  flex-direction: row;
}
select {
  width: 50%;
}
</style>
