import styles from './styles.module.scss'

export default function QuizPageWrapper({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.quiz}>
      {children}
    </div>
  )
}