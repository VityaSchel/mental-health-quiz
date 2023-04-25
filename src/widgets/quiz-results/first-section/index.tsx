import styles from './styles.module.scss'
import Info from './info'
import Chart from './chart'

export function FirstSection() {
  return (
    <section className={styles.firstSection}>
      <Info />
      <Chart />
    </section>
  )
}