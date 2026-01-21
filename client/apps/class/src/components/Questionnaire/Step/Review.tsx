import type { FC } from 'preact/compat'
import { useTranslation } from 'react-i18next'

export const QuestionnaireReviewView: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="review">
      <h1>{t('questionnaire.review.title')}</h1>
      <h2>{t('questionnaire.review.subtitle')}</h2>
      <h3>{t('questionnaire.review.subtitle2')}</h3>
    </div>
  )
}
