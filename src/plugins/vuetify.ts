import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#303030',
          secondary: '#252525',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
})
