import { useComputed } from '@preact/signals'
import type { FC } from 'preact/compat'
import { Ethnicity } from '../../../modules/questionnaire/questionnaire.types'
import type { QuestionnaireStepProps } from './questionnaire-step.types'
import { classes } from '../../../util/style'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next'

export const QuestionnaireEthnicityStepView: FC<QuestionnaireStepProps> = ({ questionnaire }) => {
  const { t } = useTranslation()

  const value = useComputed(() => questionnaire.value.profile.ethnicity)

  const onSubmit = (ethnicity: Ethnicity) =>
    (questionnaire.value = {
      ...questionnaire.peek(),
      profile: { ...questionnaire.peek().profile, ethnicity },
    })

  return (
    <div className={classes({ 'has-value': !!value.value }, 'options-grid')}>
      {Object.values(Ethnicity).map((ethnicity) => (
        <Button
          className={classes({ active: ethnicity === value.value }, `option ethnicity ${ethnicity}`)}
          confetti
          onClick={() => onSubmit(ethnicity)}>
          {t(`questionnaire.steps.ethnicity.values.${ethnicity}`)}
        </Button>
      ))}
    </div>
  )
}
