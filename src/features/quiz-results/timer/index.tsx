import React from 'react'
import styles from './styles.module.scss'
import Clock from './clock.svg'

export function Timer({ from }: {
  from: Date
}) {
  const [secondsLeft, setSecondsLeft] = React.useState(0)

  // const hours = secondsLeft / 3600 % 3600 ^ 0
  const minutes = secondsLeft / 60 % 60 ^ 0
  const seconds = ('0' + secondsLeft % 60).slice(-2)

  React.useEffect(() => {
    setSecondsLeft((from.getTime() - Date.now()) / 1000 ^ 0)
  }, [from])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (secondsLeft <= 0) {
        setSecondsLeft(60 * 15)
      } else {
        setSecondsLeft(secondsLeft - 1)
      }
    }, 1000)
    return () => clearTimeout(timeout)
  }, [secondsLeft])

  return (
    <div className={styles.timer}>
      <Clock />
      <span>Акция закончится через <strong>{`${minutes}:${seconds}`}</strong></span>
    </div>
  )
}