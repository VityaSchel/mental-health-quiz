import type { Plugin, RadialLinearScale } from 'chart.js'
import { Scale } from 'chart.js/dist'

export const drawCircleBackground: Plugin = {
  id: 'canvas_circle_background',
  beforeDraw: function (chart, args, options) {
    const radialChart = chart.scales['r'] as RadialLinearScale
    const ctx = chart.ctx as CanvasRenderingContext2D
    ctx.save()
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = options.color
    ctx.beginPath()
    ctx.arc(radialChart.xCenter, radialChart.yCenter, radialChart.drawingArea, 0, 2*Math.PI)
    ctx.fill()
    ctx.restore()
  }
}

export const drawCircleInner: Plugin = {
  id: 'canvas_circle_inner',
  afterDraw: function (chart, args, options) {
    const radialChart = chart.scales['r'] as RadialLinearScale
    const ctx = chart.ctx as CanvasRenderingContext2D
    ctx.save()
    ctx.fillStyle = options.color
    ctx.beginPath()
    ctx.arc(radialChart.xCenter, radialChart.yCenter, radialChart.drawingArea/6, 0, 2*Math.PI)
    ctx.fill()
    ctx.restore()
  }
}

export const drawLabelsIcons: Plugin = {
  id: 'canvas_labels_icons',
  afterDraw: function (chart, args, options) {
    const radialChart = chart.scales['r'] as RadialLinearScale
    
    const ctx = chart.ctx as CanvasRenderingContext2D
    
    const labels = radialChart._pointLabelItems
    for(let i = 0; i < labels.length; i++) {
      const label = labels[i]
      ctx.save()
      ctx.fillStyle = options.colors[i]
      ctx.beginPath()
      const icon = new Path2D('M14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM6.33419 4.72426C6.3039 4.82538 6.29357 4.93226 6.30387 5.03798L6.57459 7.97678C6.58368 8.09223 6.63244 8.19977 6.71122 8.27814C6.78999 8.35651 6.89305 8.4 7 8.4C7.10695 8.4 7.21001 8.35651 7.28878 8.27814C7.36756 8.19977 7.41632 8.09223 7.42541 7.97678L7.69613 5.03798C7.70643 4.93226 7.6961 4.82538 7.66581 4.72426C7.63552 4.62315 7.58595 4.53007 7.52031 4.45105C7.45467 4.37203 7.37442 4.30885 7.28479 4.2656C7.19515 4.22235 7.09812 4.2 7 4.2C6.90188 4.2 6.80485 4.22235 6.71521 4.2656C6.62558 4.30885 6.54534 4.37203 6.47969 4.45105C6.41405 4.53007 6.36448 4.62315 6.33419 4.72426ZM7 9.1C6.6134 9.1 6.3 9.4134 6.3 9.8C6.3 10.1866 6.6134 10.5 7 10.5C7.3866 10.5 7.7 10.1866 7.7 9.8C7.7 9.4134 7.3866 9.1 7 9.1Z')
      ctx.translate(label.right+3, label.top)
      ctx.fill(icon)
      ctx.restore()
    }

  }
}