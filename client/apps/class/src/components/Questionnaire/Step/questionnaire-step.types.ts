import type { ReadonlySignal, Signal } from '@preact/signals'
import type { ActiveQuestionnaire } from '../../../modules/questionnaire/questionnaire.types'

export interface QuestionnaireStepProps {
  readonly isDisabled: ReadonlySignal<boolean>
  readonly questionnaire: Signal<ActiveQuestionnaire>
}
