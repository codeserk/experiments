import i18n from '../assets/i18n'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function t(key: string, options?: any) {
  return i18n.t(key, options)
}

export function getCurrentLanguage() {
  return i18n.language
}

export function changeLanguage(lng: string) {
  return i18n.changeLanguage(lng)
}
