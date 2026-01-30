import { enTranslations } from './en'
import { esTranslations } from './es'
export const defaultNS = 'translation'

export const resources = {
  en: { translation: enTranslations },
  es: { translation: esTranslations },
} as const
