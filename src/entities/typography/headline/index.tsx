import styles from './styles.module.scss'
import fontColorContrast from 'font-color-contrast'
import cx from 'classnames'

export default function Headline({ children, color, variant = 'h1' }: React.PropsWithChildren<{
  color: string
  variant?: 'h1' | 'h2'
}>) {
  const HeadlineTag = variant

  return (
    <>
      <HeadlineTag
        className={cx(styles.headline, { 
          [styles.h1]: variant === 'h1',
          [styles.h2]: variant === 'h2',
        })}
        style={{ '--accent-color': color, '--accent-text-color': fontColorContrast(color) } as React.CSSProperties} 
      >
        {children}
      </HeadlineTag>
    </>
  )
}