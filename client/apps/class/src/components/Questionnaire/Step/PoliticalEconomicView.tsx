import { useComputed } from '@preact/signals'
import type { FC } from 'preact/compat'
import { PoliticalEconomicView } from '../../../modules/questionnaire/questionnaire.types'
import type { QuestionnaireStepProps } from './questionnaire-step.types'
import { classes } from '../../../util/style'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next'

export const QuestionnairePoliticalEconomicViewStepView: FC<QuestionnaireStepProps> = ({ questionnaire }) => {
  const { t } = useTranslation()

  const value = useComputed(() => questionnaire.value.profile.politicalEconomicView)

  const onSubmit = (politicalEconomicView: PoliticalEconomicView) =>
    (questionnaire.value = {
      ...questionnaire.peek(),
      profile: { ...questionnaire.peek().profile, politicalEconomicView },
    })

  return (
    <div className={classes({ 'has-value': !!value.value }, 'options-grid')}>
      {Object.values(PoliticalEconomicView).map((view, index) => (
        <>
          <Button
            className={classes({ active: view === value.value }, `option political-economic-view ${view}`)}
            confetti
            onClick={() => onSubmit(view)}>
            <div className="button-content">
              <span className="title">{t(`questionnaire.steps.political-economic-view.values.${view}.title`)}</span>
              <span className="subtitle">
                {t(`questionnaire.steps.political-economic-view.values.${view}.description`)}
              </span>
            </div>
          </Button>
          {index === 2 && <br />}
        </>
      ))}
    </div>
  )
}
