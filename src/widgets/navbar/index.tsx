import styles from './styles.module.scss'
import Logo from '@/assets/logo.svg'

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <Logo />
    </nav>
  )
}