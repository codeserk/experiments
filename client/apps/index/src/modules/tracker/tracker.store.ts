import { useComputed, useSignal } from '@preact/signals'
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import { SignatureBuilder } from './signature'
import {
  type TrackerEventsDistribution,
  type TrackerEventContent,
  type TrackerEventsDistributionTypeName,
  type TrackerIdentity,
} from './tracker.types'

const KEY_SEPARATOR = '___'

export function useTrackerStore() {
  const publicBaseURL = useSignal<string | undefined>(import.meta.env.PUBLIC_TRACKER_PUBLIC_BASE_URL || undefined)
  const eventsBaseURL = useSignal<string | undefined>(import.meta.env.PUBLIC_TRACKER_EVENTS_BASE_URL || undefined)
  const keyBase64 = useSignal<string | undefined>(import.meta.env.PUBLIC_TRACKER_KEY || undefined)
  const identity = useSignal<TrackerIdentity | undefined>()
  const eventsDistribution = useSignal<TrackerEventsDistribution | undefined>(undefined)

  const key = useComputed(() => (keyBase64.value ? atob(keyBase64.value) : undefined))
  const token = useComputed(() => (key.value ? key.value.split(KEY_SEPARATOR)[0] : undefined))
  const signatureSecret = useComputed(() => (key.value ? key.value.split(KEY_SEPARATOR)[1] : undefined))
  const isReady = useComputed(() => !!publicBaseURL.value && !!token.value && !!signatureSecret.value)
  const rateDistribution = useComputed(() =>
    eventsDistribution.value?.types
      ?.find((it) => it.type === 'Rate')
      ?.names.reduce(
        (result, name) => {
          result[name.name as 'positive' | 'negative'] = name
          return result
        },
        {} as Record<'positive' | 'negative', TrackerEventsDistributionTypeName>,
      ),
  )

  const init = (publicURL: string, eventsURL: string, key: string) => {
    publicBaseURL.value = publicURL
    eventsBaseURL.value = eventsURL
    keyBase64.value = key
  }

  const identify = async (): Promise<TrackerIdentity | undefined> => {
    if (!isReady.peek()) {
      return
    }

    const url = `${publicBaseURL.peek()}/api/v1/user/identify`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token.peek()!,
        'x-signature-app': 'public',
        'x-signature': await new SignatureBuilder(signatureSecret.peek()!)
          .withUrl('/api/v1/user/identify')
          .withBody({})
          .build(),
      },
    })
    const json = await response.json()
    identity.value = json

    return json
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getEventsGlobalDistribution = async (): Promise<any> => {
    if (!isReady.peek()) {
      return
    }

    const types = [
      'Age',
      'Gender',
      'Ethnicity',
      'Religion',
      'Education',
      'ImmigrationStatus',
      'PoliticalEconomicView',
      'PoliticalAuthorityView',
      'SocialClass',
      'LivingQuality',
      'FinancialSecurity',
      'LosingJobRisk',
      'HealthcareDebtRisk',
      'IsParasite',
      'Rate',
      'View',
    ]
    const params = new URLSearchParams()
    for (const type of types) {
      params.append('types', type)
    }
    const url = `/api/v1/stats/event/distribution?${params}`
    const response = await fetch(`${publicBaseURL.peek()}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token.peek()!,
        'x-signature-app': 'public',
        'x-signature': await new SignatureBuilder(signatureSecret.peek()!).withUrl(url).withBody({}).build(),
      },
    })
    const json = await response.json()
    eventsDistribution.value = json

    return json
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendEvents = async (...content: TrackerEventContent[]) => {
    if (!isReady.peek()) {
      return
    }

    const url = `${eventsBaseURL.peek()}/v1/events`
    const body = JSON.stringify({
      content,
    })
    await fetch(url, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        'x-token': token.peek()!,
        'x-signature-app': 'public',
        'x-signature': await new SignatureBuilder(signatureSecret.peek()!).withUrl('/v1/events').withBody(body).build(),
      },
    })
  }

  return {
    isReady,
    identity,
    eventsDistribution,
    rateDistribution,

    init,
    identify,
    getEventsGlobalDistribution,
    sendEvents,
  }
}

export type TrackerStore = ReturnType<typeof useTrackerStore>

export const TrackerStoreContext = createContext<TrackerStore>({} as never)

export function useTrackerStoreContext() {
  return useContext(TrackerStoreContext)
}
