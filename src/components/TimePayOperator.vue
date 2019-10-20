<template>
  <section class="root">
    <h2>연봉을 입력하세요.</h2>
    <input type="text" v-model="yearlyWagePay" />
    <span>원</span>
    <button type="button" @click="handleClickNextBtn">다음</button>
  </section>
</template>
<script>
export default {
  data() {
    return {
      yearlyWagePay: null
    };
  },
  watch: {
    yearlyWagePay: function(e) {
      console.log(e, this.yearlyWagePay);
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
    handleClickNextBtn() {
      if (this.yearlyWagePay <= 0) {
        alert("연봉을 정상적으로 입력해주세요.");
        return;
      }
      //   localStorage.setItem("timePay", this.yearlyWagePay);
      //   this.$router.replace("datePicker");
    }
  }
};
</script>
<style scoped>
</style>