<template>
  <div class="home">
    <div class="home-container">
      <tutorial-card/>
      <prospect-form/>
    </div>
  </div>
</template>

<script lang="ts">
import TutorialCard from "@/components/TutorialCard.vue";
import { defineComponent } from "vue";
import ProspectForm from "../components/ProspectForm.vue"

export default defineComponent({
  name: "HomeView",
  components: {
    ProspectForm,
    TutorialCard
  },
});
</script>

<style scoped>
.home-container {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
}
  
</style>
