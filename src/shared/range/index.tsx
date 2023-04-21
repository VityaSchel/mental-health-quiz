import { useSpring, animated } from '@react-spring/web'
import styles from './styles.module.scss'

function Container({ values, valueKey, onChange, defaultValueKey }: {
  values: { key: string, label: string, caption?: string, color: string, icon: import('next/image').StaticImageData }[],
  valueKey: string
  defaultValueKey: string
  onChange: () => any
}) {
  const defaultValue = values.find(v => v.key === defaultValueKey)
  if (!defaultValue) throw new Error('No default value provided to Range component')

  const value = values.find(v => v.key === valueKey) ?? defaultValue

  const captionStyles = useSpring({
    color: value.color
  })

  const slideStyles = { 
    background: `linear-gradient(to right, ${values.map(v => v.color).join(', ')})`
  }
  
  return (
    <div className={styles.container}>
      <animated.span className={styles.label} style={captionStyles}>{value.label}</animated.span>
      <div className={styles.slide} style={slideStyles} />
      <div className={styles.ticks}>

      </div>
    </div>   
  )
}

export { Container as Range }



// function MyComponent() {
//   const [props, api] = useSpring(
//     () => ({
//       from: { opacity: 0 },
//       to: { opacity: 1 },
//     }),
//     []
//   )

//   return <animated.div style={props}>Hello World</animated.div>
// }