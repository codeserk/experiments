import type { FC } from 'preact/compat'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const QuestionnaireReviewView: FC = () => {
  const { t } = useTranslation()

  return (
    <Container className="review">
      <h1>{t('questionnaire.review.title')}</h1>
      <h2>{t('questionnaire.review.subtitle')}</h2>
      <h3>{t('questionnaire.review.subtitle2')}</h3>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  padding: 12px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  gap: 1em;
  margin-top: 3em;
  max-width: var(--block-width);
  min-height: 60vh;
  animation: sectionEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  h1 {
    font-size: 4em;
    font-weight: 900;
    color: #000;
    text-transform: uppercase;
    margin-bottom: 12px;
    line-height: 1;
    letter-spacing: -1px;
    text-shadow: 0px 0px 3px rgba(255, 255, 255, 0.9);
  }

  h2 {
    font-size: 3em;
    font-weight: 700;
    color: #000;
    line-height: 1.3;

    letter-spacing: 0.5px;
    text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.9);
  }

  h3 {
    font-size: 2em;
    font-weight: 500;
    color: #000;

    line-height: 1.3;

    letter-spacing: 0.5px;
    text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.9);
  }
`
