import type { Signal } from '@preact/signals'

import type { FC, PropsWithChildren } from 'preact/compat'
import type { QuestionnaireStep } from '../../modules/questionnaire/questionnaire.types'

interface Props extends PropsWithChildren {
  readonly step: Signal<QuestionnaireStep>
  readonly activeStep: `${QuestionnaireStep}`
}

export const QuestionnaireStepContainer: FC<Props> = ({ step, activeStep, children }) => {
  if (step.value !== activeStep) {
    return null
  }

  return children
}
