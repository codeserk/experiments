import { useComputed } from '@preact/signals'
import type { FC } from 'preact/compat'
import { HouseProperty, HousePropertyCost } from '../../../modules/questionnaire/questionnaire.types'
import type { QuestionnaireStepProps } from './questionnaire-step.types'
import { classes } from '../../../util/style'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next'

export const QuestionnaireHousePropertyCostStepView: FC<QuestionnaireStepProps> = ({ questionnaire }) => {
  const { t } = useTranslation()

  const value = useComputed(() => questionnaire.value.answers.house?.monthlyCost)

  const onSubmit = (monthlyCost: HousePropertyCost) =>
    (questionnaire.value = {
      ...questionnaire.peek(),
      answers: {
        ...questionnaire.peek().answers,
        house: {
          ...(questionnaire.peek().answers.house ?? {
            property: HouseProperty.Nothing,
            monthlyCost: HousePropertyCost.None,
          }),
          monthlyCost,
        },
      },
    })

  return (
    <div className={classes({ 'has-value': !!value.value }, 'options-grid')}>
      {Object.values(HousePropertyCost).map((monthlyCost) => (
        <Button
          className={classes({ active: monthlyCost === value.value }, `option house-cost ${monthlyCost}`)}
          confetti
          onClick={() => onSubmit(monthlyCost)}>
          {t(`questionnaire.steps.house-cost.values.${monthlyCost}`)}
        </Button>
      ))}
    </div>
  )
}
