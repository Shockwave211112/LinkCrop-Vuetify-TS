import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import {VDateInput} from "vuetify/labs/VDateInput";
import { useI18n } from 'vue-i18n';
import i18n from "@/plugins/i18n";
import {createVueI18nAdapter} from "vuetify/locale/adapters/vue-i18n";

export default createVuetify({
  locale: {
    adapter: createVueI18nAdapter({i18n, useI18n}),
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#252525',
          secondary: '#202020',
          selected: '#00c6ff',
          error: '#cb2d2d',
          accent: '#00c6ff',
        },
      },
      light: {
        colors: {
          primary: '#e7e7e7',
          secondary: '#dadada',
          selected: '#d13839',
          error: '#cb2d2d',
          accent: '#fc4445',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
  components: {
    VDateInput,
  },
})
