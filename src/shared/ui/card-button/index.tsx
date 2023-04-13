import styles from './styles.module.scss'
import RightArrowIcon from '@/assets/icons/right-arrow.svg'

export default function CardButton({ title, caption, ...props }: {
  title: string
  caption: string
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button
      className={styles.card}
      {...props}
    >
      <span className={styles.indicator} />
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <span className={styles.caption}>{caption}</span>
      </div>
      <div className={styles.arrow}>
        <RightArrowIcon />
      </div>
    </button>
  )
}