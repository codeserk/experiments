import { useComputed } from '@preact/signals'
import type { FC } from 'preact/compat'
import { AgeRange } from '../../../modules/questionnaire/questionnaire.types'
import type { QuestionnaireStepProps } from './questionnaire-step.types'
import { classes } from '../../../util/style'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next'

export const QuestionnaireAgeStepView: FC<QuestionnaireStepProps> = ({ isDisabled, questionnaire }) => {
  const { t } = useTranslation()

  const value = useComputed(() => questionnaire.value.profile.ageRange)

  const onSubmit = (ageRange: AgeRange) =>
    (questionnaire.value = {
      ...questionnaire.peek(),
      profile: { ...questionnaire.peek().profile, ageRange },
    })

  return (
    <div className={classes({ 'has-value': !!value.value }, 'options-grid')}>
      {Object.values(AgeRange).map((age) => (
        <Button
          className={classes({ active: age === value.value }, `option age age-${age}`)}
          confetti
          disabled={isDisabled.value}
          onClick={() => onSubmit(age)}>
          {t(`questionnaire.steps.age.values.${age}`)}
        </Button>
      ))}
    </div>
  )
}
