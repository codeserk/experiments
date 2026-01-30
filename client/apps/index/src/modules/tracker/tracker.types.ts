export interface TrackerIdentity {
  readonly country: string
  readonly region: string
  readonly city: string
  readonly timeZone: string
  readonly postcode: string
  readonly lat: number
  readonly lng: number
  readonly deviceType: string
  readonly os: string
  readonly deviceBrowser: string
}

export interface TrackerEventContent {
  readonly type: string
  readonly name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly data?: any
}

export interface TrackerEventsDistributionTypeName {
  readonly name: string
  readonly total: number
  readonly percentage: number
}

export interface TrackerEventsDistributionType {
  readonly type: string
  readonly total: string
  readonly names: TrackerEventsDistributionTypeName[]
}

export interface TrackerEventsDistribution {
  readonly types: TrackerEventsDistributionType[]
}
