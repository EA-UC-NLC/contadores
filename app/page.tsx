import React, { useState, useMemo } from 'react'
import Head from 'next/head'

const FONTS = ['Arial','Helvetica','Georgia','Times','Courier','Verdana']

function buildUrl(params: URLSearchParams){
  return `/api/countdown.svg?${params.toString()}`
}

export default function Page(){
  const [date, setDate] = useState(new Date().toISOString().slice(0,16))
  const [bg, setBg] = useState('ffffff')
  const [color, setColor] = useState('000000')
  const [fontFamily, setFontFamily] = useState('Arial')
  const [fontSize, setFontSize] = useState('48')
  const [labelSize, setLabelSize] = useState('14')
  const [width, setWidth] = useState('600')
  const [height, setHeight] = useState('200')
  const [title, setTitle] = useState('')
  const [titleSize, setTitleSize] = useState('24')
  const [lang, setLang] = useState('es')
  const [layout, setLayout] = useState('horizontal')
  const [showDays, setShowDays] = useState(true)
  const [showHours, setShowHours] = useState(true)
  const [showMinutes, setShowMinutes] = useState(true)
  const [showSeconds, setShowSeconds] = useState(true)

  const params = useMemo(()=>{
    const p = new URLSearchParams()
    p.set('date', date)
    p.set('bg', bg)
    p.set('color', color)
    p.set('fontFamily', fontFamily)
    p.set('fontSize', fontSize)
    p.set('labelSize', labelSize)
    p.set('width', width)
    p.set('height', height)
    p.set('title', title)
    p.set('titleSize', titleSize)
    p.set('lang', lang)
    p.set('layout', layout)
    p.set('showDays', String(showDays))
    p.set('showHours', String(showHours))
    p.set('showMinutes', String(showMinutes))
    p.set('showSeconds', String(showSeconds))
    return p
  },[date,bg,color,fontFamily,fontSize,labelSize,width,height,title,titleSize,lang,layout,showDays,showHours,showMinutes,showSeconds])

  const url = buildUrl(params)

  return (
    <html>
      <head>
        <title>Contador Regresivo</title>
      </head>
      <body style={{fontFamily:'Arial, sans-serif', padding:20}}>
        <h1>Contador Regresivo</h1>
        <div style={{display:'flex',gap:20}}>
          <div style={{flex:'1 1 400px'}}>
            <label>Fecha objetivo</label>
            <input type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} />
            <div>
              <label>Fondo</label>
              <input type="color" value={'#'+bg} onChange={e=>setBg(e.target.value.slice(1))} />
              <label>Color</label>
              <input type="color" value={'#'+color} onChange={e=>setColor(e.target.value.slice(1))} />
            </div>
            <div>
              <label>Fuente</label>
              <select value={fontFamily} onChange={e=>setFontFamily(e.target.value)}>
                {FONTS.map(f=> <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label>Tamaños</label>
              <input type="range" min={10} max={120} value={fontSize} onChange={e=>setFontSize(e.target.value)} /> {fontSize}
              <input type="range" min={8} max={48} value={labelSize} onChange={e=>setLabelSize(e.target.value)} /> {labelSize}
            </div>
            <div>
              <label>Dimensiones</label>
              <input type="number" value={width} onChange={e=>setWidth(e.target.value)} /> x <input type="number" value={height} onChange={e=>setHeight(e.target.value)} />
            </div>
            <div>
              <label>Título</label>
              <input value={title} onChange={e=>setTitle(e.target.value)} />
            </div>
            <div>
              <label>Mostrar</label>
              <div><label><input type="checkbox" checked={showDays} onChange={e=>setShowDays(e.target.checked)} /> Días</label></div>
              <div><label><input type="checkbox" checked={showHours} onChange={e=>setShowHours(e.target.checked)} /> Horas</label></div>
              <div><label><input type="checkbox" checked={showMinutes} onChange={e=>setShowMinutes(e.target.checked)} /> Minutos</label></div>
              <div><label><input type="checkbox" checked={showSeconds} onChange={e=>setShowSeconds(e.target.checked)} /> Segundos</label></div>
            </div>
          </div>
          <div style={{width:640}}>
            <h3>Vista previa</h3>
            <div style={{border:'1px solid #ddd', padding:10}}>
              <img src={url} alt="Preview" width={width} />
            </div>
            <div>
              <button onClick={()=>navigator.clipboard.writeText(url)}>Copiar URL</button>
              <button onClick={()=>navigator.clipboard.writeText(`<img src=\"${url}\" alt=\"Contador regresivo\" width=\"${width}\">`)}>Copiar HTML para email</button>
            </div>
            <div>
              <h4>URL</h4>
              <code>{url}</code>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
