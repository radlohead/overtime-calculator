<template>
  <section class="root">
    <h2>시급을 입력하세요.</h2>
    <input type="number" />
    <span>원</span>
    <button type="button" @click="handleClickNextBtn">다음</button>
  </section>
</template>
<script>
export default {
  methods: {
    handleClickNextBtn() {
      this.$router.replace("datePicker");
    }
  }
};
</script>
<style scoped>
</style>