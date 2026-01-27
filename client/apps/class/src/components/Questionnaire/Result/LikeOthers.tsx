import type { FC } from 'preact/compat'
import { Trans } from 'react-i18next'
import styled from 'styled-components'
import type { TrackerEventsDistributionTypeName } from '../../../modules/tracker/tracker.types'
import { classes } from '../../../util/style'

interface Props {
  readonly distribution?: TrackerEventsDistributionTypeName
}

export const QuestionnaireResultLikeOthersView: FC<Props> = ({ distribution }) => {
  return (
    <Container>
      <Trans
        i18nKey="questionnaire.result.likeOthers"
        values={{ total: distribution?.total ?? 0, percentage: ((distribution?.percentage ?? 0) * 100).toFixed(0) }}
        components={{
          total: <span className="total" />,
          percentage: (
            <span
              className={classes(
                { low: (distribution?.percentage ?? 0) < 0.2, high: (distribution?.percentage ?? 0) > 0.8 },
                'percentage',
              )}
            />
          ),
        }}
      />
    </Container>
  )
}

// Styles

const Container = styled.span`
  font-size: 1em;
  text-align: right;
  float: right;
  font-weight: 400;
  color: #222;

  .total {
    font-weight: bold;
    color: var(--color-purple);
    text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.9);
  }
  .percentage {
    font-weight: bold;
    color: var(--color-purple);
    text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.9);

    &.high {
      color: var(--color-green);
    }
    &.low {
      color: var(--color-pink);
    }
  }
`
