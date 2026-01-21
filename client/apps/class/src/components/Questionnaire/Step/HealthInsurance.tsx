import { useComputed } from '@preact/signals'
import type { FC } from 'preact/compat'
import { HealthInsurance } from '../../../modules/questionnaire/questionnaire.types'
import type { QuestionnaireStepProps } from './questionnaire-step.types'
import { classes } from '../../../util/style'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next'

export const QuestionnaireHealthInsuranceStepView: FC<QuestionnaireStepProps> = ({ questionnaire }) => {
  const { t } = useTranslation()

  const value = useComputed(() => questionnaire.value.answers.healthInsurance)

  const onSubmit = (healthInsurance: HealthInsurance) =>
    (questionnaire.value = {
      ...questionnaire.peek(),
      answers: { ...questionnaire.peek().answers, healthInsurance },
    })

  return (
    <div className={classes({ 'has-value': !!value.value }, 'options-grid')}>
      {Object.values(HealthInsurance).map((healthInsurance) => (
        <Button
          className={classes({ active: healthInsurance === value.value }, `option health-insurance ${healthInsurance}`)}
          confetti
          onClick={() => onSubmit(healthInsurance)}>
          {t(`questionnaire.steps.health-insurance.values.${healthInsurance}`)}
        </Button>
      ))}
    </div>
  )
}
