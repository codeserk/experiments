import type { FC } from 'preact/compat'
import styled from 'styled-components'
import { classes } from '../../../util/style'

interface Props {
  readonly percentage?: number
}

export const QuestionnaireResultLikeOthersPercentageView: FC<Props> = ({ percentage }) => {
  return (
    <Container className={classes({ low: (percentage ?? 0) < 0.2, high: (percentage ?? 0) > 0.8 }, 'percentage')}>
      ({((percentage ?? 0) * 100).toFixed(0)}%)
    </Container>
  )
}

// Styles

const Container = styled.span`
  font-weight: 400;
  margin-left: 0.75em;
  font-size: 0.8em;
  opacity: 0.6;

  &.high {
    font-weight: bold;
    font-size: 1em;
  }
  &.low {
    font-weight: 400;
    font-size: 0.6em;
  }
`
