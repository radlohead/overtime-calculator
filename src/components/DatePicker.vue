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
                <select multiple>
                  <option disabled value>출근 시(Hour)를 선택해 주세요.</option>
                  <option value="9">9시</option>
                  <option value="10">10시</option>
                  <option value="11">11시</option>
                  <option value="12">12시</option>
                  <option value="13">13시</option>
                  <option value="14">14시</option>
                  <option value="15">15시</option>
                </select>
                <select multiple>
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
                <select multiple>
                  <option disabled value>퇴근 시(Hour)를 선택해 주세요.</option>
                  <option value="9">9시</option>
                  <option value="10">10시</option>
                  <option value="11">11시</option>
                  <option value="12">12시</option>
                  <option value="13">13시</option>
                  <option value="14">14시</option>
                  <option value="15">15시</option>
                </select>
                <select multiple>
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
