<template>
  <section class="root">
    <h2>연봉을 입력하세요.</h2>
    <input type="text" v-model="yearlyWagePay" />
    <span>원</span>
    <button type="button" @click="handleClickTimePayOperator">시급계산</button>
    <div class="timePay-box">
      <span>시급</span>
      <span>{{ numberWithCommas(timePay) }}</span>원
    </div>
    <button type="button" @click="handleClickNextBtn">홈으로 이동</button>
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
.timePay-box {
  margin-top: 15px;
}
</style>