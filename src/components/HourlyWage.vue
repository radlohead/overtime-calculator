<template>
  <section class="root">
    <h1 class="title">시급 설정</h1>
    <b-form-input type="number" class="timePayInput" v-model="tempTimePay" placeholder="시급을 입력하세요."></b-form-input>
    <div class="btn-box">
      <b-button variant="success" @click="handleClickNextBtn">확인</b-button>
    </div>
    <div class="btn-box">
      <b-button variant="outline-dark" size="sm" @click="handleClickTimePayOperator">시급 계산하기</b-button>
    </div>
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
    },
    handleClickTimePayOperator() {
      this.$router.replace("timePay-operator");
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
.btn-box {
  margin-top: 15px;
}
.timePayInput {
  width: 50%;
  margin: 0 auto;
}
</style>