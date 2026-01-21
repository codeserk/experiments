import { useEffect, useRef } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import styled, { keyframes } from 'styled-components'
import type { PropsWithChildren } from 'preact/compat'
import { classes } from '../util/style'

interface FadeInProps extends PropsWithChildren {
  readonly className?: string
}

export const FadeInView = ({ className, children }: FadeInProps) => {
  const isVisible = useSignal(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      },
      { threshold: 0.1 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [])

  return (
    <Container
      ref={elementRef}
      isVisible={isVisible.value}
      className={classes({ visible: isVisible.value }, className)}>
      {children}
    </Container>
  )
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, -40px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0px, 0);
  }
`

const Container = styled.div<{ isVisible: boolean }>`
  opacity: 0;

  &.visible {
    animation: ${(props) => (props.isVisible ? fadeIn : 'none')} 0.6s ease-in-out forwards;
    animation-delay: 0.2s;
  }
`
