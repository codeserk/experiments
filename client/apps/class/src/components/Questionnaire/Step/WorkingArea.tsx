import { useComputed } from '@preact/signals'
import type { FC } from 'preact/compat'
import { WorkingArea } from '../../../modules/questionnaire/questionnaire.types'
import type { QuestionnaireStepProps } from './questionnaire-step.types'
import { classes } from '../../../util/style'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next'

export const QuestionnaireWorkingAreaStepView: FC<QuestionnaireStepProps> = ({ questionnaire }) => {
  const { t } = useTranslation()

  const value = useComputed(() => questionnaire.value.answers.workingArea)

  const onSubmit = (workingArea: WorkingArea) =>
    (questionnaire.value = {
      ...questionnaire.peek(),
      answers: { ...questionnaire.peek().answers, workingArea },
    })

  return (
    <div className={classes({ 'has-value': !!value.value }, 'options-grid')}>
      {Object.values(WorkingArea).map((workingArea) => (
        <Button
          className={classes({ active: workingArea === value.value }, `option working-area ${workingArea}`)}
          confetti
          onClick={() => onSubmit(workingArea)}>
          {t(`questionnaire.steps.working-area.values.${workingArea}`)}
        </Button>
      ))}
    </div>
  )
}
