import styles from './styles.module.scss'

export default function Headline({ children }: React.PropsWithChildren) {
  return (
    <h1 className={styles.headline}>{children}</h1> 
  )
}