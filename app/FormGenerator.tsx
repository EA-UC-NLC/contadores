"use client";
import React, { useState } from "react";

const FONT_OPTIONS = [
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Verdana", value: "Verdana, Geneva, sans-serif" },
  { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { label: "Courier New", value: "'Courier New', Courier, monospace" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Tahoma", value: "Tahoma, Geneva, sans-serif" },
  { label: "Impact", value: "Impact, Charcoal, sans-serif" },
];

const JUSTIFY_OPTIONS = [
  { label: "Izquierda", value: "start" },
  { label: "Centro", value: "middle" },
  { label: "Derecha", value: "end" },
];

export default function FormGenerator() {
  const [date, setDate] = useState("2026-12-25T00:00:00");
  const [title, setTitle] = useState("Navidad");
  const [bg, setBg] = useState("ffffff");
  const [color, setColor] = useState("000000");
  const [width, setWidth] = useState("600");
  const [height, setHeight] = useState("200");
  const [font, setFont] = useState(FONT_OPTIONS[0].value);
  const [gradient1, setGradient1] = useState("#1e90ff");
  const [gradient2, setGradient2] = useState("#0072ff");
  const [useGradient, setUseGradient] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // para imagen temporal
  const [borderRadius, setBorderRadius] = useState(16);
  const [showDays, setShowDays] = useState(true);
  const [showHours, setShowHours] = useState(true);
  const [showMinutes, setShowMinutes] = useState(true);
  const [showSeconds, setShowSeconds] = useState(false);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [justify, setJustify] = useState("middle");
  const [copied, setCopied] = useState(false);

  const gradientParam = useGradient ? `&gradient=${encodeURIComponent(gradient1.replace('#',''))},${encodeURIComponent(gradient2.replace('#',''))}` : '';
  const url = `/api/countdown?date=${encodeURIComponent(
    date
  )}&title=${encodeURIComponent(title)}&bg=${bg.replace('#','')}&color=${color.replace('#','')}&width=${width}&height=${height}&font=${encodeURIComponent(font)}${gradientParam}${imageUrl ? `&image=${encodeURIComponent(imageUrl)}` : ''}&borderRadius=${borderRadius}&showDays=${showDays}&showHours=${showHours}&showMinutes=${showMinutes}&showSeconds=${showSeconds}&bold=${bold}&italic=${italic}&justify=${justify}`;
  const htmlSnippet = `<img src="https://contadores-sigma.vercel.app${url}" alt="Contador regresivo" width="${width}">`;

  return (
    <form style={{ marginBottom: 32 }} onSubmit={e => e.preventDefault()}>
      <label>Fecha objetivo:<br/>
        <input type="datetime-local" value={date.slice(0,16)} onChange={e=>setDate(e.target.value)} style={{marginBottom:8}} />
      </label><br/>
      <label>Título:<br/>
        <input value={title} onChange={e=>setTitle(e.target.value)} style={{marginBottom:8}} />
      </label><br/>
      <label>Fondo:<br/>
        <input type="color" value={`#${bg}`} onChange={e=>setBg(e.target.value.replace('#',''))} style={{marginBottom:8}} />
      </label><br/>
      <label>Color texto:<br/>
        <input type="color" value={`#${color}`} onChange={e=>setColor(e.target.value.replace('#',''))} style={{marginBottom:8}} />
      </label><br/>
      <label>Ancho:<br/>
        <input type="number" value={width} min={100} max={1200} onChange={e=>setWidth(e.target.value)} style={{marginBottom:8}} /> px
      </label><br/>
      <label>Alto:<br/>
        <input type="number" value={height} min={50} max={600} onChange={e=>setHeight(e.target.value)} style={{marginBottom:8}} /> px
      </label><br/>
      <label style={{ display: 'block', margin: '12px 0 4px' }}>Fuente:</label>
      <select value={font} onChange={e => setFont(e.target.value)} style={{ width: '100%', padding: 6 }}>
        {FONT_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '12px 0 4px' }}>
        <button type="button" style={{ fontWeight: bold ? 'bold' : 'normal', border: '1px solid #ccc', background: '#fff', padding: '4px 8px', cursor: 'pointer' }} onClick={() => setBold(b => !b)}>B</button>
        <button type="button" style={{ fontStyle: italic ? 'italic' : 'normal', border: '1px solid #ccc', background: '#fff', padding: '4px 8px', cursor: 'pointer' }} onClick={() => setItalic(i => !i)}>I</button>
        <select value={justify} onChange={e => setJustify(e.target.value)} style={{ padding: 4 }}>
          {JUSTIFY_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <label style={{ display: 'block', margin: '12px 0 4px' }}>Usar gradiente:</label>
      <input type="checkbox" checked={useGradient} onChange={e => setUseGradient(e.target.checked)} />
      {useGradient && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '8px 0' }}>
          <input type="color" value={gradient1} onChange={e => setGradient1(e.target.value)} />
          <span style={{ fontWeight: 600 }}>→</span>
          <input type="color" value={gradient2} onChange={e => setGradient2(e.target.value)} />
        </div>
      )}
      <label style={{ display: 'block', margin: '12px 0 4px' }}>Imagen de fondo (URL temporal):</label>
      <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: 6 }} />
      <label style={{ display: 'block', margin: '12px 0 4px' }}>Radio de borde (px):</label>
      <input type="number" min={0} max={100} value={borderRadius} onChange={e => setBorderRadius(Number(e.target.value))} style={{ width: '100%', padding: 6 }} />
      <fieldset style={{ margin: '12px 0 4px', border: '1px solid #ccc', padding: 8 }}>
        <legend>Mostrar unidades:</legend>
        <label><input type="checkbox" checked={showDays} onChange={e => setShowDays(e.target.checked)} /> Días</label>{' '}
        <label><input type="checkbox" checked={showHours} onChange={e => setShowHours(e.target.checked)} /> Horas</label>{' '}
        <label><input type="checkbox" checked={showMinutes} onChange={e => setShowMinutes(e.target.checked)} /> Minutos</label>{' '}
        <label><input type="checkbox" checked={showSeconds} onChange={e => setShowSeconds(e.target.checked)} /> Segundos</label>
      </fieldset>
      <h2>HTML para HubSpot:</h2>
      <div style={{ position: 'relative', marginBottom: 8 }}>
        <textarea style={{width:'100%',height:60}} readOnly value={htmlSnippet} />
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(htmlSnippet);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            background: copied ? '#4caf50' : '#f5f5f5',
            color: copied ? '#fff' : '#333',
            border: '1px solid #ccc',
            borderRadius: 4,
            padding: '4px 10px',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'background 0.2s, color 0.2s',
            zIndex: 2
          }}
          aria-label="Copiar código"
        >
          {copied ? '¡Copiado!' : 'Copiar'}
        </button>
      </div>
      <p>Pega este código en un módulo HTML personalizado en HubSpot.</p>

      <h2>Vista previa:</h2>
      <img src={url} alt="Contador regresivo" width={width} height={height} style={{ border: '1px solid #ccc', marginBottom: 20, display: 'block' }} />
    </form>
  );
}
