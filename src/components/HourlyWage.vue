<template>
  <section class="root">
    <h2>시급을 입력하세요.</h2>
    <input type="number" v-model="tempTimePay" />
    <span>원</span>
    <button type="button" @click="handleClickNextBtn">다음</button>
  </section>
</template>
<script>
export default {
  data() {
    return {
      tempTimePay: null
    };
  },
  created() {
    const timePay = localStorage.getItem("timePay");

    if (!timePay) return;
    this.$router.replace("datePicker");
  },
  methods: {
    handleClickNextBtn() {
      if (this.tempTimePay <= 0) {
        alert("시급을 정상적으로 입력해주세요.");
        return;
      }
      localStorage.setItem("timePay", this.tempTimePay);
      this.$router.replace("datePicker");
    }
  }
};
</script>
<style scoped>
</style>