<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <ProspectForm/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProspectForm from "../components/ProspectForm.vue"

export default defineComponent({
  name: "HomeView",
  components: {
    ProspectForm
  },
});
</script>
