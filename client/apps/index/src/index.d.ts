import 'react-i18next'

import { defaultNS, resources } from './assets/i18n/resources'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: (typeof resources)['en']
  }
}
