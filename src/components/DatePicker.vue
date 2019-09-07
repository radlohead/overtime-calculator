<template>
  <div class="root">
    <h1>야근 수당 계산</h1>
    <div class="datepicker_wrapper">
      <datepicker :inline="true" @selected="handleSelectd"></datepicker>

      <template v-if="isPopup">
        <div class="popup">
          <div class="popup_inner">
            <div>출근 시간: 10:00</div>
            <div>퇴근 시간: 22:00</div>
            <button @click="isPopup = false">입력 완료</button>
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
      isPopup: false
    };
  },
  mounted() {
    console.clear();
  },
  methods: {
    handleSelectd(date) {
      const getMonth = date.getUTCMonth() + 1;
      const getDate = date.getUTCDate();
      const getDay = date.getUTCDay();
      console.log("handleSelectd: ", getMonth, getDate);

      this.openPopup();
    },
    openPopup() {
      this.isPopup = true;
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
  max-width: 500px;
  padding: 15px;
  margin: 0 auto;
  border: 1px solid #bdbdbd;
  background-color: #fff;
}
</style>
