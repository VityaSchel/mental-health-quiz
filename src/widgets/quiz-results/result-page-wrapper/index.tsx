import styles from './styles.module.scss'

export function ResultPageWrapper({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {children}
      </div>
    </div>
  )
}