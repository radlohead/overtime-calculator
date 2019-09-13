<template>
  <section class="root">
    <h2>시급을 입력하세요.</h2>
    <input type="number" v-model="tempTimePay" />
    <span>원</span>
    <button type="button" @click="handleClickNextBtn">다음</button>
  </section>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      tempTimePay: null
    };
  },
  computed: {
    ...mapState(["timePay"])
  },
  methods: {
    ...mapMutations(["setState"]),
    handleClickNextBtn() {
      if (this.tempTimePay <= 0) {
        alert("시급을 정상적으로 입력해주세요.");
        return;
      }
      this.setState({
        type: "timePay",
        data: this.tempTimePay
      });
      this.$router.replace("datePicker");
    }
  }
};
</script>
<style scoped>
</style>