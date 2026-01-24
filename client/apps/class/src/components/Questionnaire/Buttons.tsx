import { useComputed, type ReadonlySignal, type Signal } from '@preact/signals'
import { type FC } from 'preact/compat'
import { useTranslation } from 'react-i18next'
import {
  getQuestionnaireCanContinue,
  getQuestionnaireNextStep,
  getQuestionnairePrevStep,
  getQuestionnaireStepHasValue,
} from '../../modules/questionnaire/questionnaire.service'
import type { ActiveQuestionnaire, QuestionnaireStep } from '../../modules/questionnaire/questionnaire.types'
import { classes } from '../../util/style'
import { Button } from '../Button'
import styled from 'styled-components'

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
  const { t } = useTranslation()
  const canGoPrev = useComputed(() => stepIndex.value > 0)
  const hasValue = useComputed(() => getQuestionnaireStepHasValue(questionnaire.value, step.value))
  const canGoNext = useComputed(() => getQuestionnaireCanContinue(questionnaire.value, step.value))
  const nextText = useComputed(() => {
    if (!canGoNext.value) {
      return t('questionnaire.buttons.next')
    }
    if (showReviewStep.value) {
      return t('questionnaire.buttons.finish')
    }

    return hasValue.value ? t('questionnaire.buttons.next') : t('questionnaire.buttons.skip')
  })
  const nextColor = useComputed(() => {
    if (isDisabled.value) {
      return
    }
    if (!canGoNext.value) {
      return 'var(--color-blue)'
    }
    if (showReviewStep.value) {
      return 'var(--color-green)'
    }

    return hasValue.value ? 'var(--color-blue)' : undefined
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
    <Container className={classes({ active: isActive.value }, 'questionnaire-buttons')}>
      <div className="content">
        <Button disabled={!canGoPrev.value || isDisabled.value} onClick={onPrev}>
          {t('questionnaire.buttons.prev')}
        </Button>

        <Button color={nextColor} onClick={onNext} disabled={!canGoNext.value || isDisabled.value}>
          {nextText.value}
        </Button>
      </div>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translate3d(0, 120%, 0);
  padding: 24px;
  background: #ffeb3b;
  border-top: 4px solid #000;
  box-shadow: 0 -6px 0 #000;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  padding-bottom: 174px;

  &.active {
    transform: translate3d(0, 150px, 0);
  }

  .content {
    display: flex;
    margin: auto;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
    width: var(--block-width);
  }

  .button {
    flex: 1;
    border-radius: 12px;
  }
`
