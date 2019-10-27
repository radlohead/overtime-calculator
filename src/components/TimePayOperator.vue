<template>
  <section class="root">
    <h1 class="title">연봉을 입력하세요.</h1>
    <b-form-input class="timePayInput" v-model="yearlyWagePay" placeholder="연봉을 입력하세요."></b-form-input>
    <div class="btn-box">
      <b-button variant="success" @click="handleClickTimePayOperator">확인</b-button>
    </div>
    <div class="timePay-box">
      <span>현재 시급:</span>
      <strong>{{ numberWithCommas(timePay) }}</strong> 원
    </div>
    <div class="btn-box">
      <b-button @click="handleClickNextBtn">메인으로</b-button>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      yearlyWagePay: null,
      timePay: localStorage.getItem("timePay") || 0
    };
  },
  watch: {
    yearlyWagePay: function(e) {
      this.yearlyWagePay = this.numberWithCommas(e);
    }
  },
  created() {},
  methods: {
    numberWithCommas(x) {
      return x
        .toString()
        .replace(/,/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    handleClickTimePayOperator() {
      if (!this.yearlyWagePay) return;
      const timePay = Number(this.yearlyWagePay.replace(/,/g, "")) / 12 / 239;

      localStorage.setItem("timePay", Math.ceil(timePay / 100) * 100);
      this.timePay = Math.ceil(timePay / 100) * 100;
    },
    handleClickNextBtn() {
      this.$router.replace("datePicker");
    }
  }
};
</script>
<style scoped>
.root {
  padding: 20px;
}
.title {
  font-size: 18px;
}
.timePay-box {
  margin-top: 15px;
  color: red;
}
.btn-box {
  margin-top: 15px;
}
.timePayInput {
  width: 50%;
  margin: 0 auto;
}
</style>