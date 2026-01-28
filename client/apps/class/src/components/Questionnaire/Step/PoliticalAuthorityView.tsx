import { useComputed } from '@preact/signals'
import type { FC } from 'preact/compat'
import { PoliticalAuthorityView } from '../../../modules/questionnaire/questionnaire.types'
import type { QuestionnaireStepProps } from './questionnaire-step.types'
import { classes } from '../../../util/style'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next'

export const QuestionnairePoliticalAuthorityViewStepView: FC<QuestionnaireStepProps> = ({ questionnaire }) => {
  const { t } = useTranslation()

  const value = useComputed(() => questionnaire.value.profile.politicalAuthorityView)

  const onSubmit = (politicalAuthorityView: PoliticalAuthorityView) =>
    (questionnaire.value = {
      ...questionnaire.peek(),
      profile: { ...questionnaire.peek().profile, politicalAuthorityView },
    })

  return (
    <div className={classes({ 'has-value': !!value.value }, 'options-grid')}>
      {Object.values(PoliticalAuthorityView).map((view, index) => (
        <>
          <Button
            className={classes({ active: view === value.value }, `option political-authority-view ${view}`)}
            confetti
            onClick={() => onSubmit(view)}>
            <div className="button-content">
              <span className="title">{t(`questionnaire.steps.political-authority-view.values.${view}.title`)}</span>
              <span className="subtitle">
                {t(`questionnaire.steps.political-authority-view.values.${view}.description`)}
              </span>
            </div>
          </Button>
          {index === 2 && <br />}
        </>
      ))}
    </div>
  )
}
