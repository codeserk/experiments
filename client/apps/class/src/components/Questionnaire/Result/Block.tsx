import type { FC, PropsWithChildren } from 'preact/compat'
import styled from 'styled-components'
import { FadeInView } from '../../FadeIn'

interface Props extends PropsWithChildren {
  readonly onAppear?: () => void
}

export const QuestionnaireResultBlock: FC<Props> = ({ onAppear, children }) => {
  return (
    <Container>
      <FadeInView className="block-content" onAppear={onAppear}>
        {children}
      </FadeInView>
    </Container>
  )
}

// Styles

const Container = styled.div`
  padding: 12px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
  max-width: var(--block-width);
  margin: auto;

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
    font-size: 1.5em;
    font-weight: 500;
    color: #000;
    line-height: 1.3;
    letter-spacing: 0.5px;
    text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.9);
    br {
      margin-bottom: 0.5em;
    }
  }

  h3 {
    font-size: 2em;
    font-weight: 500;
    color: #000;
    line-height: 1.3;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.9);
  }
`
