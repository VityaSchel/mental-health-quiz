import React from 'react'
import styles from './styles.module.scss'
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  // Tooltip
} from 'chart.js'
import { PolarArea } from 'react-chartjs-2'
import { drawCircleBackground } from '@/shared/utils/chart-js-plugins'
import { CvBasedQuestionnaireResponse } from '@/shared/api/ApiDefinitions'

ChartJS.register(RadialLinearScale, ArcElement, /*Tooltip, */drawCircleBackground) 

type GradientType = 'DANGER' | 'WARNING' | 'SAFE'
const generateGradients = (ctx: CanvasRenderingContext2D): { [key in GradientType]: CanvasGradient } => {
  const gradients = {
    DANGER: [
      '#EF6A6A',
      '#DB2525'
    ],
    WARNING: [
      '#F69F5A',
      '#F69136'
    ],
    SAFE: [
      '#ABF25A',
      '#A0E72D'
    ]
  }
  const w = ctx.canvas.clientWidth
  const h = ctx.canvas.clientHeight
  // @ts-expect-error for fuck sake
  return Object.fromEntries(
    Object.entries(gradients)
      .map(([name, stops]) => {
        const gradient = ctx.createRadialGradient(w/2, h/2, 1, w/2, h/2, w)
        for (let i = 0; i < stops.length; i++) {
          gradient.addColorStop(i/stops.length, stops[i])
        }
        return [name as GradientType, gradient]
      })
  )
}

export default function Chart({ cv }: { 
  cv: CvBasedQuestionnaireResponse 
}) {
  const chartRef = React.useRef<any | null>(null)

  const generateData = (colors: (CanvasGradient | string)[]) => ({
    labels: ['Неуверенность', 'Тревожность', 'Стресс', 'Депрессия', 'Ассоциальность'],
    datasets: [
      {
        data: [1, 2, 3, 4, 5],
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  })

  const [data, setData] = React.useState<React.ComponentProps<typeof PolarArea>['data']>(() => generateData(new Array(5).fill('').map(() => 'rgba(0,0,0,0)')))

  React.useEffect(() => {
    if (chartRef && chartRef.current) {
      const gradients = generateGradients(chartRef.current.ctx)
      setData(generateData([
        gradients.DANGER,
        gradients.WARNING,
        gradients.DANGER,
        gradients.SAFE,
        gradients.DANGER,
      ]))
    }
  }, [chartRef, setData])
  
  return (
    <div className={styles.chart}>
      <PolarArea 
        ref={chartRef} 
        data={data} 
        options={{
          scales: {
            r: {
              ticks: {
                display: false
              },
              grid: {
                color: '#fff',
                z: 1
              },
              // pointLabels: {
              //   display: true,
              //   centerPointLabels: true,
              //   font: {
              //     size: 14
              //   },
              //   color: 'rgba(114, 123, 148, 1)'
              // }
            }
          },
          plugins: {
            canvas_circle_background: { 
              color: ['risky', 'normal'].includes(cv.level_mental_health)
                ? 'rgba(29, 36, 54, 0.05)'
                : 'rgba(226, 65, 30, 0.15)'
            } 
          }
        }}
        plugins={[drawCircleBackground]}
      />
    </div>
  )
}