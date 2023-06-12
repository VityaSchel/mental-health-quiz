import styles from './styles.module.scss'
import Clock from './clock.svg'

export function Timer() {
  return (
    <div className={styles.timer}>
      <Clock />
      <span>Акция закончится через <strong>{'12:32'}</strong></span>
    </div>
  )
}