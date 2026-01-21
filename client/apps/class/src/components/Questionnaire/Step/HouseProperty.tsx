import { useComputed } from '@preact/signals'
import type { FC } from 'preact/compat'
import { useTranslation } from 'react-i18next'
import { HouseProperty } from '../../../modules/questionnaire/questionnaire.types'
import { classes } from '../../../util/style'
import { Button } from '../../Button'
import type { QuestionnaireStepProps } from './questionnaire-step.types'

export const QuestionnaireHousePropertyStepView: FC<QuestionnaireStepProps> = ({ questionnaire }) => {
  const { t } = useTranslation()

  const value = useComputed(() => questionnaire.value.answers.house?.property)

  const onSubmit = (property: HouseProperty) =>
    (questionnaire.value = {
      ...questionnaire.peek(),
      answers: {
        ...questionnaire.peek().answers,
        house: {
          ...(questionnaire.peek().answers.house ?? {
            property: HouseProperty.Nothing,
            monthlyCost: undefined as never,
          }),
          property,
        },
      },
    })

  return (
    <div className={classes({ 'has-value': !!value.value }, 'options-grid')}>
      {Object.values(HouseProperty).map((property) => (
        <Button
          className={classes({ active: property === value.value }, `option house-property ${property}`)}
          confetti
          onClick={() => onSubmit(property)}>
          {t(`questionnaire.steps.house-property.values.${property}`)}
        </Button>
      ))}
    </div>
  )
}
