import type { FC } from 'preact/compat'
import styled from 'styled-components'
import { Button } from '../../Button'
import { useComputed, useSignal } from '@preact/signals'
import { useTranslation } from 'react-i18next'
import { classes } from '../../../util/style'

enum RateResult {
  Positive = 'positive',
  Negative = 'negative',
}

interface Props {}

export const QuestionnaireSummaryView: FC<Props> = () => {
  const { t } = useTranslation()

  const rateResult = useSignal<RateResult | undefined>(undefined)
  const showAlert = useSignal(false)

  const shareContent = useComputed<ShareData>(() => ({
    title: '...',
    text: 'share share',
    url: 'https://experiments.codeserk.es/class',
  }))
  const canShare = useComputed(() => !!navigator.share && navigator.canShare(shareContent.value))

  const rate = (result: RateResult) => {
    if (rateResult.peek()) {
      return
    }

    rateResult.value = result
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
        <h2>{t('questionnaire.result.summary.rate.title')}</h2>
        <div className="buttons">
          <Button
            rounded
            active={rateResult.value === RateResult.Positive}
            confetti
            className="rate-positive color-green"
            disabled={!!rateResult.value}
            onClick={() => rate(RateResult.Positive)}>
            {t('questionnaire.result.summary.rate.like')}
          </Button>
          <Button
            rounded
            active={rateResult.value === RateResult.Negative}
            className="rate-negative color-red"
            disabled={!!rateResult.value}
            onClick={() => rate(RateResult.Negative)}>
            {t('questionnaire.result.summary.rate.dislike')}
          </Button>
        </div>
      </div>

      <div className="share-container">
        <Button rounded className="color-yellow" onClick={share}>
          {t('questionnaire.result.summary.share')}
        </Button>
        {showAlert.value && <div className="alert">Link copied to clipboard!</div>}
      </div>
    </Container>
  )
}

// Styles

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3em;

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
    align-items: center;
    justify-content: space-around;

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

    .button {
      transition: opacity 0.4s ease-in-out;
      width: 250px;
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
