<script setup lang="ts">
const date = new Date().getFullYear();
</script>

<template>
  <footer class="w-100 d-flex bg-primary pr-3 pl-3 justify-lg-space-between align-center font-weight-light">
    <div>
      Фоновое изображение by <a
        class="text-decoration-none"
        href="https://superdesigner.co"
        target="_blank"
      >superdesigner.co</a>
    </div>
    <div class="rights align-right">
      LinkCrop © {{ date }}<br>Все права защищены
    </div>
  </footer>
</template>

<style scoped>
footer {
  height: 2.5rem;
  z-index: 20;
  font-size: x-small;
  box-shadow: 0 -4px 14px 0 rgba(0, 0, 0, 0.2);
}
.rights {
  text-align: end;
}
</style>
