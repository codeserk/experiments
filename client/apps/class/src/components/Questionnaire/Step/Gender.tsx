import { useComputed } from '@preact/signals'
import type { FC } from 'preact/compat'
import { Gender } from '../../../modules/questionnaire/questionnaire.types'
import type { QuestionnaireStepProps } from './questionnaire-step.types'
import { classes } from '../../../util/style'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next'

export const QuestionnaireGenderStepView: FC<QuestionnaireStepProps> = ({ questionnaire }) => {
  const { t } = useTranslation()

  const value = useComputed(() => questionnaire.value.profile.gender)

  const onSubmit = (gender: Gender) =>
    (questionnaire.value = {
      ...questionnaire.peek(),
      profile: { ...questionnaire.peek().profile, gender },
    })

  return (
    <div className={classes({ 'has-value': !!value.value }, 'options-grid')}>
      {Object.values(Gender).map((gender) => (
        <Button
          className={classes({ active: gender === value.value, option: true, gender: true, [gender]: true })}
          confetti
          onClick={() => onSubmit(gender)}>
          {t(`questionnaire.steps.gender.values.${gender}`)}
        </Button>
      ))}
    </div>
  )
}
