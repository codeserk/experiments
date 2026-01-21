import { useComputed, type ReadonlySignal } from '@preact/signals'
import { type FC } from 'preact/compat'
import { getQuestionnaireProgress } from '../../modules/questionnaire/questionnaire.service'
import styles from './ProgressBar.module.css'
import { classes } from '../../util/style'

interface Props {
  readonly isActive: ReadonlySignal<boolean>
  readonly stepIndex: ReadonlySignal<number>
}

export const QuestionnaireProgressBar: FC<Props> = ({ isActive, stepIndex }) => {
  const percentage = useComputed(() => `${getQuestionnaireProgress(stepIndex.value) * 100}%`)

  return (
    <div className={`${styles['progress-bar']} ${classes({ [styles['progress-bar-active']]: isActive.value })}`}>
      <div className={styles['progress-bar-fill']} style={{ width: percentage.value }}></div>
    </div>
  )
}
