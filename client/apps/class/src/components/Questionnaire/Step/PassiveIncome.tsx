import { useComputed } from '@preact/signals'
import type { FC } from 'preact/compat'
import { PassiveIncome } from '../../../modules/questionnaire/questionnaire.types'
import type { QuestionnaireStepProps } from './questionnaire-step.types'
import { classes } from '../../../util/style'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next'

export const QuestionnairePassiveIncomeStepView: FC<QuestionnaireStepProps> = ({ questionnaire }) => {
  const { t } = useTranslation()

  const value = useComputed(() => questionnaire.value.answers.passiveIncome)

  const onSubmit = (passiveIncome: PassiveIncome) =>
    (questionnaire.value = {
      ...questionnaire.peek(),
      answers: { ...questionnaire.peek().answers, passiveIncome },
    })

  return (
    <div className={classes({ 'has-value': !!value.value }, 'options-grid')}>
      {Object.values(PassiveIncome).map((passiveIncome) => (
        <Button
          className={classes(
            { active: passiveIncome === value.value },
            `option passive-income passive-income-${passiveIncome}`,
          )}
          confetti
          onClick={() => onSubmit(passiveIncome)}>
          {t(`questionnaire.steps.passive-income.values.${passiveIncome}`)}
        </Button>
      ))}
    </div>
  )
}
