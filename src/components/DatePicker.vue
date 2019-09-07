<template>
  <div class="root">
    <h1>야근 수당 계산</h1>
    <datepicker :inline="true" @selected="handleSelectd"></datepicker>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  data() {
    return {};
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
