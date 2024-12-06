import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import {VDateInput} from "vuetify/labs/VDateInput";

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#303030',
          secondary: '#252525',
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
  }
})
