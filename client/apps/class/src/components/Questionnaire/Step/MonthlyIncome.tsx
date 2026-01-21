import { useComputed } from '@preact/signals'
import type { FC } from 'preact/compat'
import { MonthlyIncome } from '../../../modules/questionnaire/questionnaire.types'
import type { QuestionnaireStepProps } from './questionnaire-step.types'
import { classes } from '../../../util/style'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next'

export const QuestionnaireMonthlyIncomeStepView: FC<QuestionnaireStepProps> = ({ questionnaire }) => {
  const { t } = useTranslation()

  const value = useComputed(() => questionnaire.value.answers.monthlyIncome)

  const onSubmit = (monthlyIncome: MonthlyIncome) =>
    (questionnaire.value = {
      ...questionnaire.peek(),
      answers: { ...questionnaire.peek().answers, monthlyIncome },
    })

  return (
    <div className={classes({ 'has-value': !!value.value }, 'options-grid')}>
      {Object.values(MonthlyIncome).map((monthlyIncome) => (
        <Button
          className={classes(
            { active: monthlyIncome === value.value },
            `option monthly-income monthly-income-${monthlyIncome}`,
          )}
          confetti
          onClick={() => onSubmit(monthlyIncome)}>
          {t(`questionnaire.steps.monthly-income.values.${monthlyIncome}`)}
        </Button>
      ))}
    </div>
  )
}
