import type { ReadonlySignal } from '@preact/signals'
import { type FC, type PropsWithChildren } from 'preact/compat'

interface Props extends PropsWithChildren {
  readonly isActive?: ReadonlySignal<boolean>
  readonly isNotActive?: ReadonlySignal<boolean>
}

export const View: FC<Props> = ({ isActive, isNotActive, children }) => {
  if (!isActive?.value) {
    return null
  }
  if (isNotActive?.value) {
    return null
  }

  return children
}
