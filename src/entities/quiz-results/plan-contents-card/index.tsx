import styles from './styles.module.scss'

export function PlanContentsCard({ icon, title, caption }: {
  title: string
  caption: string
  icon: React.ReactNode
}) {
  return (
    <div className={styles.card}>
      <span className={styles.icon}>
        {icon}
      </span>
      <div className={styles.text}>
        <span className={styles.title}>{title}</span>
        <span className={styles.caption}>{caption}</span>
      </div>
    </div>
  )
}