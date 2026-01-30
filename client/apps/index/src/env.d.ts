interface ImportMetaEnv {
  readonly PUBLIC_TRACKER_PUBLIC_BASE_URL: string
  readonly PUBLIC_TRACKER_EVENTS_BASE_URL: string
  readonly PUBLIC_TRACKER_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
