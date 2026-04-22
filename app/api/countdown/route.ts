export const runtime = 'edge'

function pad(n: number) {
  return n < 10 ? '0' + n : String(n)
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const p = url.searchParams
  const dateParam = p.get('date') || ''
  const bg = p.get('bg') || 'ffffff'
  const color = p.get('color') || '000000'
  const fontFamily = p.get('font') || 'Arial, sans-serif'
  const fontSize = Number(p.get('fontSize') || '48')
  const labelSize = Number(p.get('labelSize') || '14')
  const width = Number(p.get('width') || '600')
  const height = Number(p.get('height') || '200')
  const title = p.get('title') || ''
  const titleSize = Number(p.get('titleSize') || '24')
  const lang = p.get('lang') || 'es'
  const showDays = p.get('showDays') !== 'false'
  const showHours = p.get('showHours') !== 'false'
  const showMinutes = p.get('showMinutes') !== 'false'
  const showSeconds = p.get('showSeconds') !== 'false'
  const layout = p.get('layout') || 'horizontal'
  const borderRadius = Number(p.get('borderRadius') || 16)
  const separator = p.get('separator') !== 'false'
  const expiredMsg = p.get('expiredMsg') || (lang === 'es' ? 'Evento finalizado' : 'Event ended')
  const timezone = p.get('timezone') || 'America/Santiago'
  const gradient = p.get('gradient')
  const image = p.get('image')

  // Usar Date nativo en vez de luxon
  const target = new Date(dateParam)
  const now = new Date()
  
  // Calcular diferencia en milisegundos
  const diffMs = target.getTime() - now.getTime()
  const expired = diffMs <= 0

  const labels_es = { days: 'días', hours: 'horas', minutes: 'minutos', seconds: 'segundos' }
  const labels_en = { days: 'days', hours: 'hours', minutes: 'minutes', seconds: 'seconds' }
  const labels = lang === 'es' ? labels_es : labels_en

  // Calcular días, horas, minutos, segundos
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)))
  const hours = Math.max(0, Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
  const minutes = Math.max(0, Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)))
  const seconds = Math.max(0, Math.floor((diffMs % (1000 * 60)) / 1000))

  let content = ''
  if (expired) {
    content = `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="${escapeHtml(
      fontFamily
    )}" font-size="${titleSize}" fill="#${color}">${escapeHtml(expiredMsg)}</text>`
  } else {
    const units: Array<{ k: string; show: boolean; value: number; label: string }> = []
    if (showDays) units.push({ k: 'days', show: showDays, value: days, label: labels.days })
    if (showHours) units.push({ k: 'hours', show: showHours, value: hours, label: labels.hours })
    if (showMinutes) units.push({ k: 'minutes', show: showMinutes, value: minutes, label: labels.minutes })
    if (showSeconds) units.push({ k: 'seconds', show: showSeconds, value: seconds, label: labels.seconds })

    const count = units.length || 1
    const unitWidth = layout === 'vertical' ? width - 40 : Math.floor((width - 20) / count)
    const unitHeight = layout === 'vertical' ? Math.floor((height - 40) / count) : height - 40

    const items: string[] = []
    units.forEach((u, i) => {
      const x = layout === 'vertical' ? 20 : 10 + i * unitWidth
      const y = layout === 'vertical' ? 10 + i * unitHeight : 20
      const numX = x + unitWidth / 2
      const numY = y + unitHeight / 2
      const labelY = numY + fontSize / 2
      items.push(`
        <g>
          <rect x="${x}" y="${y}" width="${unitWidth - 10}" height="${unitHeight - 10}" rx="${borderRadius}" fill="rgba(255,255,255,0)" />
          <text x="${numX}" y="${numY}" dominant-baseline="middle" text-anchor="middle" font-family="${escapeHtml(
            fontFamily
      )}" font-size="${fontSize}" fill="#${color}">${pad(u.value)}</text>
          <text x="${numX}" y="${labelY}" dominant-baseline="hanging" text-anchor="middle" font-family="${escapeHtml(
            fontFamily
      )}" font-size="${labelSize}" fill="#${color}">${escapeHtml(u.label)}</text>
        </g>
      `)
      if (separator && i < units.length - 1 && layout !== 'vertical') {
        const sepX = x + unitWidth - 5
        const sepY = Math.floor(height / 2)
        items.push(`<text x="${sepX}" y="${sepY}" dominant-baseline="middle" text-anchor="middle" font-family="${escapeHtml(
          fontFamily
        )}" font-size="${fontSize}" fill="#${color}">:</text>`)
      }
    })

    const titleEl = title ? `<text x="50%" y="${titleSize + 10}" dominant-baseline="hanging" text-anchor="middle" font-family="${escapeHtml(
      fontFamily
    )}" font-size="${titleSize}" fill="#${color}">${escapeHtml(title)}</text>` : ''

    content = `${titleEl}\n<g transform="translate(0,${title ? titleSize + 20 : 20})">${items.join('\n')}</g>`
  }

  let bgEl = '';
  if (image) {
    bgEl = `<image href="${escapeHtml(image)}" x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />`;
  } else if (gradient) {
    bgEl = `<defs><linearGradient id="g1" x1="0%" x2="100%"><stop offset="0%" stop-color="#${
      (gradient || '').split(',')[0] || 'ffffff'
    }"/><stop offset="100%" stop-color="#${(gradient || '').split(',')[1] || '000000'}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g1)"/>`;
  } else {
    bgEl = `<rect width="100%" height="100%" fill="#${bg}"/>`;
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n    ${bgEl}\n    ${content}\n  </svg>`

  const headers = {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'public, max-age=30, s-maxage=30',
    'Access-Control-Allow-Origin': '*'
  }

  return new Response(svg, { status: 200, headers })
}