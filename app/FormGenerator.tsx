"use client";
import React, { useState } from "react";

// Paleta Kreator: rojo #c20000, negro #181818, gris #bdbdbd, blanco #fff, dorado #e6b800
const KREATOR_COLORS = {
  primary: "#c20000",
  dark: "#181818",
  gray: "#bdbdbd",
  light: "#fff",
  gold: "#e6b800"
};

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
    <div style={{
      background: `linear-gradient(135deg, ${KREATOR_COLORS.dark} 0%, ${KREATOR_COLORS.primary} 100%)`,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0
    }}>
      <form style={{
        background: KREATOR_COLORS.light,
        borderRadius: 18,
        boxShadow: `0 4px 24px 0 ${KREATOR_COLORS.dark}33`,
        padding: 32,
        maxWidth: 420,
        width: '100%',
        margin: 32,
        border: `2px solid ${KREATOR_COLORS.primary}`,
        color: KREATOR_COLORS.dark,
        fontFamily: 'Arial Rounded MT Bold, Arial, sans-serif',
        fontSize: 17
      }} onSubmit={e => e.preventDefault()}>
        <h2 style={{
          color: KREATOR_COLORS.primary,
          textAlign: 'center',
          marginBottom: 24,
          letterSpacing: 1.5,
          fontWeight: 700
        }}>Generador de Contadores</h2>
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
        <h2 style={{ color: KREATOR_COLORS.primary, marginTop: 32, fontSize: 20 }}>Vista previa:</h2>
        <img src={url} alt="Contador regresivo" width={width} height={height} style={{ border: `2px solid ${KREATOR_COLORS.gold}`, borderRadius: 12, marginBottom: 20, display: 'block', background: KREATOR_COLORS.gray }} />
        <h2 style={{ color: KREATOR_COLORS.primary, fontSize: 18 }}>HTML para HubSpot:</h2>
        <div style={{ position: 'relative', marginBottom: 8 }}>
          <textarea style={{width:'100%',height:60, border: `1.5px solid ${KREATOR_COLORS.gray}`, borderRadius: 6, fontFamily: 'monospace', fontSize: 15, background: KREATOR_COLORS.light, color: KREATOR_COLORS.dark, padding: 8 }} readOnly value={htmlSnippet} />
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(htmlSnippet);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: copied ? KREATOR_COLORS.gold : KREATOR_COLORS.primary,
              color: copied ? KREATOR_COLORS.dark : KREATOR_COLORS.light,
              border: 'none',
              borderRadius: 4,
              padding: '4px 14px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: 15,
              boxShadow: copied ? `0 0 0 2px ${KREATOR_COLORS.gold}` : 'none',
              transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
              zIndex: 2
            }}
            aria-label="Copiar código"
          >
            {copied ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>
        <p style={{ color: KREATOR_COLORS.gray, fontSize: 14, marginBottom: 0, textAlign: 'center' }}>Pega este código en un módulo HTML personalizado en HubSpot.</p>
      </form>
    </div>
  );
}
