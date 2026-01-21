import { useComputed } from '@preact/signals'
import { useRef, type FC, type PropsWithChildren } from 'preact/compat'
import { classes } from '../util/style'

interface Props extends PropsWithChildren {
  readonly id?: string
  readonly className?: string
  readonly size?: 'big' | 'small'
  readonly confetti?:
    | {
        readonly colors?: string[]
        readonly quantity?: number
      }
    | true
  readonly disabled?: boolean

  readonly onClick?: () => void
}

const CONFETTI_DEFAULT_COLORS = ['#ff6b9d', '#ffeb3b', '#4ecdc4', '#4a90e2', '#9b59b6', '#ff9966']
const CONFETTI_DEFAULT_QUANTITY = 20
const CONFETTI_SHAPES = ['star', 'square', 'circle', 'triangle']

export const Button: FC<Props> = ({ id, className, size, confetti, disabled, onClick, children }) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const confettiColors = useComputed(() =>
    typeof confetti === 'object' ? (confetti?.colors ?? CONFETTI_DEFAULT_COLORS) : CONFETTI_DEFAULT_COLORS,
  )
  const confettiQuantity = useComputed(() =>
    typeof confetti === 'object' ? (confetti?.quantity ?? CONFETTI_DEFAULT_QUANTITY) : CONFETTI_DEFAULT_QUANTITY,
  )

  const localOnClick = () => {
    if (!confetti) {
      return onClick?.()
    }

    const target = buttonRef.current
    if (target) {
      const rect = target.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2

      for (let i = 0; i < confettiQuantity.peek(); i++) {
        const particle = document.createElement('div')
        const shape = CONFETTI_SHAPES[Math.floor(Math.random() * CONFETTI_SHAPES.length)]
        particle.className = `confetti-particle ${shape}`
        particle.style.left = x + 'px'
        particle.style.top = y + 'px'
        particle.style.setProperty(
          '--color',
          confettiColors.peek()[Math.floor(Math.random() * confettiColors.peek().length)],
        )

        const angle = Math.random() * Math.PI
        const distance = Math.random() * 200 + 100
        particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px')
        particle.style.setProperty('--ty', -Math.sin(angle) * distance + 'px')
        particle.style.setProperty('--r', Math.random() * 720 - 360 + 'deg')

        document.body.appendChild(particle)
        setTimeout(() => particle.remove(), 1000)
      }
    }

    onClick?.()
  }

  return (
    <button
      ref={buttonRef}
      id={id}
      className={classes({ confetti: !!confetti }, `button size-${size ?? ''} ${className ?? ''}`)}
      disabled={disabled}
      onClick={localOnClick}>
      {children}
    </button>
  )
}
