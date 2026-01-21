import { useComputed } from '@preact/signals'
import type { FC } from 'preact/compat'
import { SavingsLevel } from '../../../modules/questionnaire/questionnaire.types'
import type { QuestionnaireStepProps } from './questionnaire-step.types'
import { classes } from '../../../util/style'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next'

export const QuestionnaireSavingsLevelStepView: FC<QuestionnaireStepProps> = ({ questionnaire }) => {
  const { t } = useTranslation()

  const value = useComputed(() => questionnaire.value.answers.savingsLevel)

  const onSubmit = (savingsLevel: SavingsLevel) =>
    (questionnaire.value = {
      ...questionnaire.peek(),
      answers: { ...questionnaire.peek().answers, savingsLevel },
    })

  return (
    <div className={classes({ 'has-value': !!value.value }, 'options-grid')}>
      {Object.values(SavingsLevel).map((savingsLevel) => (
        <Button
          className={classes({ active: savingsLevel === value.value }, `option savings savings-${savingsLevel}`)}
          confetti
          onClick={() => onSubmit(savingsLevel)}>
          {t(`questionnaire.steps.savings-level.values.${savingsLevel}`)}
        </Button>
      ))}
    </div>
  )
}
