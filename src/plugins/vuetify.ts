import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import {VDateInput} from "vuetify/labs/VDateInput";
import {ru} from "vuetify/locale";

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#252525',
          secondary: '#202020',
          selected: '#2196f3',
          error: '#cb2d2d',
          accent: '#00c6ff',
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
  locale: {
    locale: 'ru',
    fallback: 'en',
    messages: { ru },
  }
})
