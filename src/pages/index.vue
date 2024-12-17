<template>
  <div class="d-flex flex-column h-screen">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Header from "@/components/Header/Header.vue";
import Main from "@/components/Main.vue";
import Profile from "@/pages/profile.vue";

</script>

<style scoped>
div {
  background-image: url("src/assets/imgs/code_background.jpg");
  background-size: cover;
}
</style>
