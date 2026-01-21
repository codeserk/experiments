import { useComputed } from '@preact/signals'
import type { FC } from 'preact/compat'
import { DebtLevel } from '../../../modules/questionnaire/questionnaire.types'
import type { QuestionnaireStepProps } from './questionnaire-step.types'
import { classes } from '../../../util/style'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next'

export const QuestionnaireDebtLevelStepView: FC<QuestionnaireStepProps> = ({ questionnaire }) => {
  const { t } = useTranslation()

  const value = useComputed(() => questionnaire.value.answers.debtLevel)

  const onSubmit = (debtLevel: DebtLevel) =>
    (questionnaire.value = {
      ...questionnaire.peek(),
      answers: { ...questionnaire.peek().answers, debtLevel },
    })

  return (
    <div className={classes({ 'has-value': !!value.value }, 'options-grid')}>
      {Object.values(DebtLevel).map((debtLevel) => (
        <Button
          className={classes({ active: debtLevel === value.value }, `option debt-level debt-level-${debtLevel}`)}
          confetti
          onClick={() => onSubmit(debtLevel)}>
          {t(`questionnaire.steps.debt-level.values.${debtLevel}`)}
        </Button>
      ))}
    </div>
  )
}
