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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
