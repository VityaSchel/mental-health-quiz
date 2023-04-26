import type { Plugin } from 'chart.js'

export const drawCircleBackground: Plugin = {
  id: 'canvas_circle_background',
  beforeDraw: function (chart, args, options) {
    const {
      chartArea: { width, height },
    } = chart
    const ctx = chart.ctx as CanvasRenderingContext2D
    ctx.save()
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = options.color
    ctx.beginPath()
    ctx.arc(width/2, height/2, width/2, 0, 2*Math.PI)
    ctx.fill()
    ctx.restore()
  }
}