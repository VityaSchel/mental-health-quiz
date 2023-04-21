import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import styles from './styles.module.scss'
import Image from 'next/image'
import useMeasure from 'react-use-measure'
import { mergeRefs } from 'react-merge-refs'
import cx from 'classnames'

const handleWidth = 40
function Container({ values, valueKey, onChange, defaultValueKey }: {
  values: { key: string, label: string, caption?: string, color: string, labelColor: string, icon: import('next/image').StaticImageData }[],
  valueKey: string
  defaultValueKey: string
  onChange: (value: string) => any
}) {
  const [handlePressed, setHandlePressed] = React.useState(false)
  const [mouseX, setMouseX] = React.useState(0)
  const slideContainerRef = React.useRef(null)
  const [measureRef, bounds] = useMeasure()

  const defaultValue = values.find(v => v.key === defaultValueKey)
  if (!defaultValue) throw new Error('No default value provided to Range component')

  const value = values.find(v => v.key === valueKey) ?? defaultValue
  const valueIndex = values.findIndex(v => v.key === value.key)

  const captionStyles = useSpring({
    color: value.labelColor
  })

  const slideStyles = { 
    background: `linear-gradient(to right, ${values.map(v => v.color).join(', ')})`
  }

  const leftPos = valueIndex / (values.length - 1) * 100
  const leftMargin = (leftPos - 50) * 2 / 100 * (handleWidth/2)
  const handleStyles = useSpring({
    left: `${leftPos}%`,
    scale: handlePressed ? 1.2 : 1,
    marginLeft: -leftMargin-20
  })

  React.useEffect(() => {
    if(handlePressed) {
      const pointerup = () => setHandlePressed(false)
      window.addEventListener('pointerup', pointerup)

      return () => {
        window.removeEventListener('pointerup', pointerup)
      }
    }
  }, [handlePressed])

  React.useEffect(() => {
    if(handlePressed) {
      const pointermove = (e: PointerEvent) => setMouseX(e.clientX)
      window.addEventListener('pointermove', pointermove)

      return () => {
        window.removeEventListener('pointermove', pointermove)
      }
    }
  }, [handlePressed, setMouseX])
  
  const closestPoint = (relX: number, pointsCount: number) => {
    const singlePointDelta = 1/(pointsCount-1)/2
    for (let pointIndex = 0; pointIndex < pointsCount; pointIndex++) {
      const pointPosX = pointIndex/(pointsCount-1)
      if(relX < pointPosX+singlePointDelta) return pointIndex
    }
    // throw new Error('Incorrect values for closestPoint function')
    return 0
  }

  React.useEffect(() => {
    const delta = mouseX - bounds.left + handleWidth / 2
    const innerXpos = Math.min(bounds.width, Math.max(0, delta))
    const innerXposRel = innerXpos / bounds.width

    const closestPointIndex = closestPoint(innerXposRel, values.length)
    if(valueIndex !== closestPointIndex) {
      onChange(values[closestPointIndex].key)
    }
  }, [bounds, mouseX, value, onChange])

  const handleSlideClick = (e: PointerEvent) => {
    setHandlePressed(true)    
    setMouseX(e.clientX)
  }
  
  return (
    <div className={styles.container}>
      <animated.span className={styles.label} style={captionStyles}>{value.label}</animated.span>
      <div 
        className={styles.slideContainer} 
        ref={mergeRefs([slideContainerRef, measureRef])}
        onPointerDown={handleSlideClick}
      >
        <div className={styles.slide} style={slideStyles} />
        <animated.div
          className={styles.handle} 
          style={handleStyles}
          onPointerDown={() => setHandlePressed(true)}
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
        {values.map((v, i) => (
          <span 
            key={v.key} 
            className={cx(styles.tick, { [styles.placeholder]: !v.caption })}
            style={{ left: `${i/(values.length-1)*100}%` }}
          >
            {v.caption}
          </span>
        ))}
      </div>
    </div>   
  )
}

export { Container as Range }