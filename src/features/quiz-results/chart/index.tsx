import React from 'react'
import styles from './styles.module.scss'
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  // Tooltip
} from 'chart.js'
import { PolarArea } from 'react-chartjs-2'
import { drawCircleBackground, drawCircleInner, drawLabelsIcons } from '@/shared/utils/chart-js-plugins'
import { CvBasedQuestionnaireResponse } from '@/shared/api/ApiDefinitions'
import { colorMix } from '@/shared/utils/colors-mix'

ChartJS.register(RadialLinearScale, ArcElement, /*Tooltip, */drawCircleBackground, drawCircleInner, drawLabelsIcons) 

type GradientType = 'DANGER' | 'WARNING' | 'LOW' | 'SAFE'
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
    LOW: [
      'rgba(248, 215, 95, 1)',
      'rgba(243, 198, 38, 1)'
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
  
  const dataset = [cv.uncertainty, cv.anxiety, cv.stress, cv.depression, cv.affiliation]

  const generateData = (colors: (CanvasGradient | string)[]) => ({
    labels: ['Неуверенность', 'Тревожность', 'Стресс', 'Депрессия', 'Ассоциальность'],
    datasets: [
      {
        data: dataset,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  })

  const [data, setData] = React.useState<React.ComponentProps<typeof PolarArea>['data']>(() => generateData(new Array(5).fill('').map(() => 'rgba(0,0,0,0)')))

  React.useEffect(() => {
    if (chartRef && chartRef.current) {
      const gradients = generateGradients(chartRef.current.ctx)
      setData(generateData(
        dataset.map(value => 
          value < 16
            ? gradients.SAFE
            : value < 30
              ? gradients.LOW
              : value < 60
                ? gradients.WARNING
                : gradients.DANGER
        )
      ))
    }
  }, [chartRef, setData])

  
  const bgColor = ['risky', 'normal'].includes(cv.level_mental_health)
    ? colorMix([243, 245, 251], [29, 36, 54, 0.05])
    : colorMix([243, 245, 251], [226, 65, 30, 0.2])

  const c = (value: number) => {
    if(value < 33) {
      return 'transparent'
    } else if(value < 66) {
      return '#F59138'
    } else {
      return '#E64A4A'
    }
  }
  
  return (
    <div className={styles.chart}>
      <PolarArea
        ref={chartRef} 
        data={data} 
        width={'560px'}
        height={'500px'}
        options={{
          maintainAspectRatio: false,
          scales: {
            r: {
              ticks: {
                display: false,
                stepSize: 100/6
              },
              grid: {
                color: '#fff',
                z: 1,
                // tickLength: 100/1
              },
              max: 100,
              pointLabels: {
                display: true,
                centerPointLabels: true,
                font: {
                  size: 14
                },
                padding: 30,
                color: 'rgba(114, 123, 148, 1)'
              }
            }
          },
          plugins: {
            canvas_circle_background: { 
              color: bgColor
            },
            canvas_circle_inner: {
              color: bgColor
            },
            canvas_labels_icons: {
              colors: [
                c(cv.uncertainty),
                c(cv.anxiety),
                c(cv.stress),
                c(cv.depression),
                c(cv.affiliation),
              ]
            }            
          }
        }}
        plugins={[drawCircleBackground, drawCircleInner, drawLabelsIcons]}
      />
    </div>
  )
}