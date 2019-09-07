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
    handleSelectd(e) {
      console.log("handleSelectd: ", e);
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
