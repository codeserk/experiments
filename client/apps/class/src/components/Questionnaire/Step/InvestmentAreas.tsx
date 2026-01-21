import { useComputed } from '@preact/signals'
import type { FC } from 'preact/compat'
import { InvestmentArea } from '../../../modules/questionnaire/questionnaire.types'
import type { QuestionnaireStepProps } from './questionnaire-step.types'
import { classes } from '../../../util/style'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next'

export const QuestionnaireInvestmentAreasStepView: FC<QuestionnaireStepProps> = ({ questionnaire }) => {
  const { t } = useTranslation()

  const value = useComputed(() => questionnaire.value.answers.investments)

  const nextValue = (investment: InvestmentArea): InvestmentArea[] => {
    if (investment === InvestmentArea.None) {
      return [InvestmentArea.None]
    }

    const current = questionnaire.peek().answers.investments ?? []

    return current.includes(investment)
      ? current.filter((it) => it !== investment)
      : [...current, investment].filter((it) => it !== InvestmentArea.None)
  }

  const onToggle = (investment: InvestmentArea) => {
    const investments = nextValue(investment)

    questionnaire.value = {
      ...questionnaire.peek(),
      answers: { ...questionnaire.peek().answers, investments },
    }
  }

  return (
    <div className={classes({ 'has-value': !!value.value }, 'options-grid')}>
      {Object.values(InvestmentArea).map((investment) => (
        <Button
          className={classes(
            { active: value.value?.includes(investment) ?? false },
            `option investment-area ${investment}`,
          )}
          confetti
          onClick={() => onToggle(investment)}>
          {t(`questionnaire.steps.investment-areas.values.${investment}`)}
        </Button>
      ))}
    </div>
  )
}
