import { useComputed } from '@preact/signals'
import type { FC } from 'preact/compat'
import { Religion } from '../../../modules/questionnaire/questionnaire.types'
import type { QuestionnaireStepProps } from './questionnaire-step.types'
import { classes } from '../../../util/style'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next'

export const QuestionnaireReligionStepView: FC<QuestionnaireStepProps> = ({ questionnaire }) => {
  const { t } = useTranslation()

  const value = useComputed(() => questionnaire.value.profile.religion)

  const onSubmit = (religion: Religion) =>
    (questionnaire.value = {
      ...questionnaire.peek(),
      profile: { ...questionnaire.peek().profile, religion },
    })

  return (
    <div className={classes({ 'has-value': !!value.value }, 'options-grid')}>
      {Object.values(Religion).map((religion) => (
        <Button
          className={classes({ active: religion === value.value }, `option religion ${religion}`)}
          confetti
          onClick={() => onSubmit(religion)}>
          {t(`questionnaire.steps.religion.values.${religion}`)}
        </Button>
      ))}
    </div>
  )
}
