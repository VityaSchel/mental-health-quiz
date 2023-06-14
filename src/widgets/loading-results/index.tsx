import React from 'react'
import styles from './styles.module.scss'
import cx from 'classnames'

export default function LoadingResults({ visible }: {
  visible: boolean
}) {
  const [percentage, setPercentage] = React.useState(0)

  React.useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        setPercentage(Math.min(99, percentage + 1))
      }, 5000 / 100)
      return () => clearTimeout(timeout)
    }
  }, [visible, percentage, setPercentage])

  React.useEffect(() => {
    if (!visible) setPercentage(0)
  }, [visible])

  return (
    <div className={cx(styles.loading, { [styles.visible]: visible })}>
      <div className={cx(styles.circle, { [styles.halfThrough]: percentage >= 50 })}>
        <div className={styles.arc} style={{ '--arc-percentage': `${percentage >= 50 ? Math.min(100 - percentage, 49) : percentage}deg` }} />
        <div className={styles.text}>{percentage}%</div>
      </div>
      <span className={styles.label}>Анализируем данные</span>
    </div>
  )
}