import { useComputed } from '@preact/signals'
import type { FC } from 'preact/compat'
import { Education } from '../../../modules/questionnaire/questionnaire.types'
import type { QuestionnaireStepProps } from './questionnaire-step.types'
import { classes } from '../../../util/style'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next'

export const QuestionnaireEducationStepView: FC<QuestionnaireStepProps> = ({ questionnaire }) => {
  const { t } = useTranslation()

  const value = useComputed(() => questionnaire.value.profile.education)

  const onSubmit = (education: Education) =>
    (questionnaire.value = {
      ...questionnaire.peek(),
      profile: { ...questionnaire.peek().profile, education },
    })

  return (
    <div className={classes({ 'has-value': !!value.value }, 'options-grid')}>
      {Object.values(Education).map((education) => (
        <Button
          className={classes({ active: education === value.value }, `option education ${education}`)}
          confetti
          onClick={() => onSubmit(education)}>
          {t(`questionnaire.steps.education.values.${education}`)}
        </Button>
      ))}
    </div>
  )
}
