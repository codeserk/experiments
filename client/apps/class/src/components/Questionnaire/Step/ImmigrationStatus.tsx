import { useComputed } from '@preact/signals'
import type { FC } from 'preact/compat'
import { ImmigrationStatus } from '../../../modules/questionnaire/questionnaire.types'
import type { QuestionnaireStepProps } from './questionnaire-step.types'
import { classes } from '../../../util/style'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next'

export const QuestionnaireImmigrationStatusStepView: FC<QuestionnaireStepProps> = ({ questionnaire }) => {
  const { t } = useTranslation()

  const value = useComputed(() => questionnaire.value.profile.immigrationStatus)

  const onSubmit = (immigrationStatus: ImmigrationStatus) =>
    (questionnaire.value = {
      ...questionnaire.peek(),
      profile: { ...questionnaire.peek().profile, immigrationStatus },
    })

  return (
    <div className={classes({ 'has-value': !!value.value }, 'options-grid')}>
      {Object.values(ImmigrationStatus).map((immigrationStatus) => (
        <Button
          className={classes({ active: immigrationStatus === value.value }, `option immigration ${immigrationStatus}`)}
          confetti
          onClick={() => onSubmit(immigrationStatus)}>
          {t(`questionnaire.steps.immigration-status.values.${immigrationStatus}`)}
        </Button>
      ))}
    </div>
  )
}
