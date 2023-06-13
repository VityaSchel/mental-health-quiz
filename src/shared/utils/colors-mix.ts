export function colorMix(bg: [number, number, number], colorWithOpacity: [number, number, number, number]) {

  const a = colorWithOpacity[3]
  const r = Math.floor(colorWithOpacity[0] * a + bg[0] * (1 - a))
  const g = Math.floor(colorWithOpacity[1] * a + bg[1] * (1 - a))
  const b = Math.floor(colorWithOpacity[2] * a + bg[2] * (1 - a))

  const colorWithoutOpacity = '#' + (r<<16 | g<<8 | b).toString(16)
  return colorWithoutOpacity
}