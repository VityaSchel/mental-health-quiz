import styles from './styles.module.scss'
import RightArrowIcon from '@/assets/icons/right-arrow.svg'

export default function CardButton({ title, caption }: {
  title: string
  caption: string
}) {
  return (
    <button
      className={styles.card}
    >
      <span />
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <span className={styles.caption}>{caption}</span>
      </div>
      <div>
        <RightArrowIcon /> 
      </div>
    </button>
  )
}