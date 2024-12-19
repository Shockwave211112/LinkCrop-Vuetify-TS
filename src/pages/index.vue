<template>
  <div class="d-flex flex-column h-screen background">
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
.background {
  position: relative;
  z-index: 0;
}

.background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  rotate: 180deg;
  z-index: -1;
  background-image: url("src/assets/imgs/patterns.jpg");
  background-size: cover;
  background-position: center;
  filter: brightness(70%);
}
</style>
