import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import styles from './styles.module.scss'
import Image from 'next/image'

function Container({ values, valueKey, onChange, defaultValueKey }: {
  values: { key: string, label: string, caption?: string, color: string, icon: import('next/image').StaticImageData }[],
  valueKey: string
  defaultValueKey: string
  onChange: () => any
}) {
  const [handlePressed, setHandlePressed] = React.useState(false)

  const defaultValue = values.find(v => v.key === defaultValueKey)
  if (!defaultValue) throw new Error('No default value provided to Range component')

  const value = values.find(v => v.key === valueKey) ?? defaultValue
  const valueIndex = values.findIndex(v => v.key === value.key)

  const captionStyles = useSpring({
    color: value.color
  })

  const slideStyles = { 
    background: `linear-gradient(to right, ${values.map(v => v.color).join(', ')})`
  }

  const handleStyles = useSpring({
    left: `${valueIndex/values.length*100}%`,
    scale: handlePressed ? 1.1 : 1
  })
  
  return (
    <div className={styles.container}>
      <animated.span className={styles.label} style={captionStyles}>{value.label}</animated.span>
      <div className={styles.slideContainer}>
        <div className={styles.slide} style={slideStyles} />
        <animated.div
          className={styles.handle} 
          style={handleStyles}
          onPointerDown={() => setHandlePressed(true)}
          onPointerUp={() => setHandlePressed(false)}
          onPointerLeave={() => setHandlePressed(false)}
        >
          <Image 
            src={value.icon} 
            width={40} height={40} 
            alt='Индикатор (перетягивайте)' 
            quality={100}
            draggable={false}
          />
        </animated.div>
      </div>
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