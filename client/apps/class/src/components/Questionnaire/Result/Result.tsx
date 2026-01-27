import { useSignal, type ReadonlySignal } from '@preact/signals'

import { useEffect, type FC } from 'preact/compat'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import {
  SocialClass,
  type QuestionnaireResult,
  type QuestionnaireResultStats,
} from '../../../modules/questionnaire/questionnaire.types'
import { Button } from '../../Button'
import { QuestionnaireResultBlock } from './Block'
import { QuestionnaireSummaryView } from './Summary'
import { QuestionnaireResultLikeOthersView } from './LikeOthers'
import { QuestionnaireResultLikeOthersPercentageView } from './LikeOthersPercentage'

interface Props {
  readonly result: ReadonlySignal<QuestionnaireResult | undefined>
  readonly stats: ReadonlySignal<QuestionnaireResultStats | undefined>
}

const components = {
  red: <span className={`color-red `} />,
  green: <span className={`color-green `} />,
  blue: <span className={`color-blue`} />,
  orange: <span className={`color-orange`} />,
  yellow: <span className={`color-yellow`} />,
  br: <br />,
  em: <em />,
}

export const QuestionnaireResultView: FC<Props> = ({ result, stats }) => {
  const { t } = useTranslation()

  const isLastVisible = useSignal(false)

  useEffect(() => {
    if (result.value) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }, 100)
    }
  }, [result.value])

  if (!result.value) {
    return null
  }

  return (
    <Container>
      <QuestionnaireResultBlock>
        <h1>
          <Trans
            i18nKey={`questionnaire.result.socialClass.${result.value.socialClass}.title`}
            components={components}
          />
        </h1>
        <QuestionnaireResultLikeOthersView distribution={stats.value?.socialClass} />
        <h2>
          <Trans
            i18nKey={`questionnaire.result.socialClass.${result.value.socialClass}.subtitle`}
            components={components}
          />
        </h2>
      </QuestionnaireResultBlock>
      {result.value.socialClass === SocialClass.WorkingClass && (
        <>
          <QuestionnaireResultBlock>
            <h1>
              <Trans
                i18nKey={`questionnaire.result.livingQuality.${result.value.livingQuality}.title`}
                components={components}
              />
            </h1>
            <QuestionnaireResultLikeOthersView distribution={stats.value?.livingQuality} />
            <h2>
              <Trans
                i18nKey={`questionnaire.result.livingQuality.${result.value.livingQuality}.subtitle`}
                components={components}
              />
            </h2>
          </QuestionnaireResultBlock>

          <QuestionnaireResultBlock>
            <h1>
              <Trans
                i18nKey={`questionnaire.result.financialSecurity.${result.value.financialSecurity}.title`}
                values={{ years: Math.floor(result.value.monthsUntilHomeless / 12) }}
                components={components}
              />
            </h1>
            <QuestionnaireResultLikeOthersView distribution={stats.value?.financialSecurity} />
            <h2>
              <Trans
                i18nKey={`questionnaire.result.financialSecurity.${result.value.financialSecurity}.subtitle`}
                values={{ years: Math.floor(result.value.monthsUntilHomeless / 12) }}
                components={components}
              />
            </h2>
          </QuestionnaireResultBlock>

          {result.value.losingJobRisk > 0.4 && (
            <QuestionnaireResultBlock>
              <h1>
                <Trans
                  i18nKey={`questionnaire.result.losingJobRisk.title`}
                  values={{ percentage: (result.value.losingJobRisk * 100).toFixed(0) }}
                  components={components}
                />
              </h1>
              <QuestionnaireResultLikeOthersView distribution={stats.value?.losingJobRisk} />
              <h2>
                <Trans
                  i18nKey={`questionnaire.result.losingJobRisk.subtitle`}
                  values={{ percentage: (result.value.losingJobRisk * 100).toFixed(0) }}
                  components={components}
                />
              </h2>
            </QuestionnaireResultBlock>
          )}

          <QuestionnaireResultBlock>
            <h1>
              <Trans
                i18nKey={`questionnaire.result.healthcareDebtRisk.${result.value.healthcareDebtRisk}.title`}
                values={{ percentage: (result.value.healthcareDebtRiskPercentage * 100).toFixed(0) }}
                components={components}
              />
            </h1>
            <QuestionnaireResultLikeOthersView distribution={stats.value?.healthcareDebtRisk} />
            <h2>
              <Trans
                i18nKey={`questionnaire.result.healthcareDebtRisk.${result.value.healthcareDebtRisk}.subtitle`}
                values={{ percentage: (result.value.healthcareDebtRiskPercentage * 100).toFixed(0) }}
                components={components}
              />
            </h2>
          </QuestionnaireResultBlock>
        </>
      )}
      {result.value.isParasite && (
        <QuestionnaireResultBlock>
          <h1>
            <Trans i18nKey={`questionnaire.result.parasite.title`} components={components} />
          </h1>
          <QuestionnaireResultLikeOthersView distribution={stats.value?.isParasite} />
          <h2>
            <Trans i18nKey={`questionnaire.result.parasite.subtitle`} components={components} />
          </h2>
        </QuestionnaireResultBlock>
      )}
      {result.value.socialClass === SocialClass.WorkingClass && (
        <QuestionnaireResultBlock>
          <h1>
            <Trans i18nKey={`questionnaire.result.worker.title`} components={components} />
          </h1>
          <div className="profile-container">
            {result.value.questionnaire.profile.ageRange && (
              <Button size="small" className={`option age age-${result.value.questionnaire.profile.ageRange}`}>
                {t(`questionnaire.steps.age.values.${result.value.questionnaire.profile.ageRange}`)}
                <QuestionnaireResultLikeOthersPercentageView percentage={stats.value?.ageRange?.percentage} />
              </Button>
            )}
            {result.value.questionnaire.profile.gender && (
              <Button size="small" className={`option gender ${result.value.questionnaire.profile.gender}`}>
                {t(`questionnaire.steps.gender.values.${result.value.questionnaire.profile.gender}`)}
                <QuestionnaireResultLikeOthersPercentageView percentage={stats.value?.gender?.percentage} />
              </Button>
            )}
            {result.value.questionnaire.profile.ethnicity && (
              <Button size="small" className={`option ethnicity ${result.value.questionnaire.profile.ethnicity}`}>
                {t(`questionnaire.steps.ethnicity.values.${result.value.questionnaire.profile.ethnicity}`)}
                <QuestionnaireResultLikeOthersPercentageView percentage={stats.value?.ethnicity?.percentage} />
              </Button>
            )}
            {result.value.questionnaire.profile.religion && (
              <Button size="small" className={`option religion ${result.value.questionnaire.profile.religion}`}>
                {t(`questionnaire.steps.religion.values.${result.value.questionnaire.profile.religion}`)}
                <QuestionnaireResultLikeOthersPercentageView percentage={stats.value?.religion?.percentage} />
              </Button>
            )}
            {result.value.questionnaire.profile.immigrationStatus && (
              <Button
                size="small"
                className={`option immigration ${result.value.questionnaire.profile.immigrationStatus}`}>
                {t(
                  `questionnaire.steps.immigration-status.values.${result.value.questionnaire.profile.immigrationStatus}`,
                )}
                <QuestionnaireResultLikeOthersPercentageView percentage={stats.value?.immigrationStatus?.percentage} />
              </Button>
            )}

            {result.value.questionnaire.profile.education && (
              <Button size="small" className={`option education ${result.value.questionnaire.profile.education}`}>
                {t(`questionnaire.steps.education.values.${result.value.questionnaire.profile.education}`)}
                <QuestionnaireResultLikeOthersPercentageView percentage={stats.value?.education?.percentage} />
              </Button>
            )}
            {result.value.questionnaire.profile.politicalEconomicView && (
              <Button
                size="small"
                className={`option political-economic-view ${result.value.questionnaire.profile.politicalEconomicView}`}>
                {t(
                  `questionnaire.steps.political-economic-view.values.${result.value.questionnaire.profile.politicalEconomicView}.title`,
                )}
                <QuestionnaireResultLikeOthersPercentageView
                  percentage={stats.value?.politicalEconomicView?.percentage}
                />
              </Button>
            )}
            {result.value.questionnaire.profile.politicalAuthorityView && (
              <Button
                size="small"
                className={`option political-authority-view ${result.value.questionnaire.profile.politicalAuthorityView}`}>
                {t(
                  `questionnaire.steps.political-authority-view.values.${result.value.questionnaire.profile.politicalAuthorityView}.title`,
                )}
                <QuestionnaireResultLikeOthersPercentageView
                  percentage={stats.value?.politicalAuthorityView?.percentage}
                />
              </Button>
            )}
          </div>
          <h2>
            <Trans i18nKey={`questionnaire.result.worker.subtitle`} components={components} />
          </h2>
        </QuestionnaireResultBlock>
      )}
      <QuestionnaireResultBlock onAppear={() => (isLastVisible.value = true)}>
        <h1>
          <Trans
            i18nKey={`questionnaire.result.summary.title`}
            components={components}
            context={result.value.socialClass}
          />
        </h1>
        <h2>
          <Trans
            i18nKey={`questionnaire.result.summary.subtitle`}
            components={components}
            context={result.value.socialClass}
          />
        </h2>
        <QuestionnaireSummaryView />
      </QuestionnaireResultBlock>
      {!isLastVisible.value ? (
        <span className="scroll-indicator">{t('questionnaire.result.scrollForMore')}</span>
      ) : (
        <aside>
          <p>
            {t('welcome.aside')}
            <a href="https://www.codeserk.es">@codeserk</a>
          </p>
        </aside>
      )}
    </Container>
  )
}

const Container = styled.div`
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;

  .block {
    padding: 12px;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
    position: relative;
  }

  h1 {
    font-size: 3em;
    font-weight: 900;
    color: #000;
    text-transform: uppercase;
    margin-bottom: 0;
    line-height: 1;
    letter-spacing: -1px;
    text-shadow: 0px 0px 3px rgba(255, 255, 255, 0.9);
  }

  h2 {
    font-size: 2em;
    margin-top: 1em;
    font-weight: 500;
    color: #000;
    text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.9);
    br {
      margin-bottom: 0.5em;
    }
  }

  .profile-container {
    pointer-events: none;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 0px;
    align-items: center;
    margin-bottom: 1em;
  }

  .scroll-indicator {
    position: fixed;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1em;
    font-weight: 700;
    text-transform: uppercase;
    color: #000;
    animation: bounce 2s ease-in-out infinite;
  }

  aside {
    position: fixed;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    color: #000;
    flex: 1;
    p {
      font-size: 1em;
      margin: 0;
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(-10px);
    }
  }

  @media (min-width: 700px) {
    h1 {
      font-size: 4em;
    }
    h2 {
      font-size: 2em;
    }
  }
`
