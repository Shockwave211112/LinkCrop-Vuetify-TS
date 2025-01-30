<script setup lang="ts">
import {useI18n} from "vue-i18n";

const date = new Date().getFullYear();
const apiLink = import.meta.env.VITE_DOCS_URL;
const { t } = useI18n();
</script>

<template>
  <footer class="w-100 d-flex bg-primary pr-3 pl-3 justify-lg-space-between align-center font-weight-light">
    <div>
      {{ t('footer.image') }}
      <a
        class="text-decoration-none"
        href="https://superdesigner.co"
        target="_blank"
      >superdesigner.co</a>
    </div>
    <div class="d-flex align-center">
      <div class="pr-5">
        <a
          class="text-decoration-none"
          :href="apiLink"
          target="_blank"
        >API</a>
      </div>
      <div class="rights align-right">
        LinkCrop © {{ date }}<br>
        {{ t('footer.rights') }}
      </div>
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
