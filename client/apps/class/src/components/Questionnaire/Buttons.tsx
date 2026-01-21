import { useComputed, type ReadonlySignal, type Signal } from '@preact/signals'
import { type FC } from 'preact/compat'
import {
  getQuestionnaireCanContinue,
  getQuestionnaireNextStep,
  getQuestionnairePrevStep,
  getQuestionnaireStepHasValue,
} from '../../modules/questionnaire/questionnaire.service'
import type { ActiveQuestionnaire, QuestionnaireStep } from '../../modules/questionnaire/questionnaire.types'
import { classes } from '../../util/style'
import { Button } from '../Button'

interface Props {
  readonly isActive: ReadonlySignal<boolean>
  readonly isDisabled: ReadonlySignal<boolean>
  readonly questionnaire: Signal<ActiveQuestionnaire>
  readonly stepIndex: Signal<number>
  readonly step: ReadonlySignal<QuestionnaireStep>
  readonly showReviewStep: Signal<boolean>
  readonly hasReviewed: Signal<boolean>
}

export const QuestionnaireButtons: FC<Props> = ({
  isActive,
  isDisabled,
  questionnaire,
  stepIndex,
  step,
  showReviewStep,
  hasReviewed,
}) => {
  const canGoPrev = useComputed(() => stepIndex.value > 0)
  const hasValue = useComputed(() => getQuestionnaireStepHasValue(questionnaire.value, step.value))
  const canGoNext = useComputed(() => getQuestionnaireCanContinue(questionnaire.value, step.value))
  const nextText = useComputed(() => {
    if (!canGoNext.value) {
      return 'next'
    }

    return hasValue.value ? 'next' : 'skip'
  })

  const onPrev = () => {
    stepIndex.value = getQuestionnairePrevStep(questionnaire.peek(), stepIndex.peek())
  }
  const onNext = () => {
    if (showReviewStep.peek()) {
      hasReviewed.value = true
      return
    }

    if (!getQuestionnaireCanContinue(questionnaire.peek(), step.peek())) {
      return
    }

    stepIndex.value = getQuestionnaireNextStep(questionnaire.peek(), stepIndex.peek())
  }

  return (
    <div className={classes({ active: isActive.value }, 'questionnaire-buttons')}>
      <div className="content">
        <Button disabled={!canGoPrev.value || isDisabled.value} onClick={onPrev}>
          Prev
        </Button>

        <Button onClick={onNext} disabled={!canGoNext.value || isDisabled.value}>
          {nextText.value}
        </Button>
      </div>
    </div>
  )
}
