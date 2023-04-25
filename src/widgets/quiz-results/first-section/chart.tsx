import React from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { PolarArea } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend) 

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

export default function Chart() {
  const chartRef = React.useRef<any | null>(null)

  const generateData = (colors: (CanvasGradient | string)[]) => ({
    labels: ['Неуверенность', 'Тревожность', 'Стресс', 'Депрессия', 'Ассоциальность'],
    datasets: [
      {
        label: '# of Votes',
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
    <>
      <PolarArea ref={chartRef} data={data} />
    </>
  )
}