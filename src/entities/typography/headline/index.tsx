import styles from './styles.module.scss'
import fontColorContrast from 'font-color-contrast'

export default function Headline({ children, color }: React.PropsWithChildren<{
  color: string
}>) {
  return (
    <h1 className={styles.headline} style={{ '--accent-color': color, '--accent-text-color': fontColorContrast(color) } as React.CSSProperties}>{children}</h1> 
  )
}