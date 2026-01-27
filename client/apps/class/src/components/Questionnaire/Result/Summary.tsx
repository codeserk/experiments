import { useComputed, useSignal } from '@preact/signals'
import type { FC } from 'preact/compat'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Button } from '../../Button'
import { useTrackerStoreContext } from '../../../modules/tracker/tracker.store'
import { QuestionnaireResultLikeOthersPercentageView } from './LikeOthersPercentage'

enum RateResult {
  Positive = 'positive',
  Negative = 'negative',
}

export const QuestionnaireSummaryView: FC = () => {
  const { t } = useTranslation()
  const { sendEvents } = useTrackerStoreContext()
  const { rateDistribution } = useTrackerStoreContext()

  const rateResult = useSignal<RateResult | undefined>(undefined)
  const showAlert = useSignal(false)

  const shareContent = useComputed<ShareData>(() => ({
    title: t('questionnaire.result.summary.share.title'),
    text: t('questionnaire.result.summary.share.text'),
    url: 'https://experiments.codeserk.es/class',
  }))
  const canShare = useComputed(() => !!navigator.share && navigator.canShare(shareContent.value))

  const rate = (result: RateResult) => {
    if (rateResult.peek()) {
      return
    }

    rateResult.value = result

    sendEvents({ type: 'Rate', name: rateResult.value })
  }

  const share = () => {
    if (!canShare.peek()) {
      navigator.clipboard.writeText(window.location.href)
      showAlert.value = true
    }

    navigator.share(shareContent.peek())
  }

  return (
    <Container>
      <div className={`rate-container ${rateResult.value ?? ''} `}>
        <div className="buttons">
          <Button
            rounded
            active={rateResult.value === RateResult.Positive}
            confetti
            className="rate-positive color-green"
            disabled={!!rateResult.value}
            onClick={() => rate(RateResult.Positive)}>
            {t('questionnaire.result.summary.rate.like')}
            <QuestionnaireResultLikeOthersPercentageView percentage={rateDistribution.value?.positive?.percentage} />
          </Button>
          <Button
            rounded
            active={rateResult.value === RateResult.Negative}
            className="rate-negative color-red"
            disabled={!!rateResult.value}
            onClick={() => rate(RateResult.Negative)}>
            {t('questionnaire.result.summary.rate.dislike')}
            <QuestionnaireResultLikeOthersPercentageView percentage={rateDistribution.value?.negative?.percentage} />
          </Button>
        </div>
      </div>

      <div className="share-container">
        <Button rounded className="color-yellow" onClick={share}>
          {t('questionnaire.result.summary.share.cta')}
        </Button>
        {showAlert.value && <div className="alert">{t('questionnaire.result.summary.share.linkCopied')}</div>}
      </div>
    </Container>
  )
}

// Styles

const Container = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
  max-width: 90vw;

  @keyframes bounce {
    0%,
    100% {
      transform: translate3d(-50%, 0, 0);
      opacity: 1;
    }
    50% {
      transform: translate3d(-50%, 10px, 0);
      opacity: 0.6;
    }
  }

  .rate-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 2em;

    &.positive {
      .rate-positive {
        opacity: 1 !important;
      }
      .rate-negative {
        opacity: 0.4;
      }
    }
    &.negative {
      .rate-positive {
        opacity: 0.4;
      }
      .rate-negative {
        opacity: 1 !important;
      }
    }

    &.positive,
    &.negative {
      .buttons .button {
        justify-content: space-between;
        width: 250px;

        span {
          display: block;
          opacity: 1;
        }
      }
    }

    .buttons {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .button {
        transition: opacity 0.4s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 200px;
        max-width: 40vw;
        transition: width 0.4s ease-in-out;

        span {
          transition: opacity 0.4s ease-in-out;
          opacity: 0;
          display: none;
        }
      }
    }
  }

  .share-container {
    .button {
      width: 150px;
    }
  }

  .alert {
    position: absolute;
    bottom: -40px;
    left: 50%;
    width: 100%;
    text-align: center;
    transform: translate3d(-50%, 0, 0);
    margin-top: 2em;
    animation: bounce 2s ease-in-out infinite;
  }
`
