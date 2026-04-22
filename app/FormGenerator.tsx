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
  )}&title=${encodeURIComponent(title)}&bg=${bg.replace('#','')}&color=${color.replace('#','')}&width=${width}&height=${height}&font=${encodeURIComponent(font)}${gradientParam}${imageUrl ? `&image=${encodeURIComponent(imageUrl)}` : ''}&showDays=${showDays}&showHours=${showHours}&showMinutes=${showMinutes}&showSeconds=${showSeconds}&bold=${bold}&italic=${italic}&justify=${justify}`;
  const htmlSnippet = `<img src="https://contadores-sigma.vercel.app${url}" alt="Contador regresivo" width="${width}">`;

  // Calcular el ancho máximo para el formulario y la vista previa
  const previewMaxWidth = Math.max(420, Math.min(Number(width), 700));
  const fieldStyle: React.CSSProperties = {
    marginTop: 6,
    width: '100%',
    padding: '10px 12px',
    borderRadius: 8,
    border: `1.5px solid ${KREATOR_COLORS.gray}`,
    fontSize: 15,
    boxSizing: 'border-box',
    background: '#fff',
    color: KREATOR_COLORS.dark,
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'none',
      padding: '32px 16px',
    }}>
      <form style={{
        background: KREATOR_COLORS.light,
        borderRadius: 14,
        boxShadow: `0 8px 28px 0 ${KREATOR_COLORS.dark}2e`,
        padding: 28,
        maxWidth: previewMaxWidth,
        width: '100%',
        margin: '24px auto',
        border: `2px solid ${KREATOR_COLORS.primary}`,
        color: KREATOR_COLORS.dark,
        fontFamily: 'Arial Rounded MT Bold, Arial, sans-serif',
        fontSize: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        alignItems: 'stretch',
      }} onSubmit={e => e.preventDefault()}>
        <h2 style={{
          color: KREATOR_COLORS.primary,
          textAlign: 'center',
          margin: '0 0 6px 0',
          letterSpacing: 1,
          fontWeight: 700,
          fontSize: 34
        }}>Generador de Contadores</h2>
        <label style={{ fontWeight: 600, width: '100%' }}>Fecha objetivo:
          <input type="datetime-local" value={date.slice(0,16)} onChange={e=>setDate(e.target.value)} style={fieldStyle} />
        </label>
        <label style={{ fontWeight: 600, width: '100%' }}>Titulo:
          <input value={title} onChange={e=>setTitle(e.target.value)} style={fieldStyle} />
        </label>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr', width: '100%' }}>
          <label style={{ fontWeight: 600, flex: 1 }}>Fondo:
            <input type="color" value={`#${bg}`} onChange={e=>setBg(e.target.value.replace('#',''))} style={{marginTop:6, width:'100%', height:42, border:'none', background:'none', padding: 0}} />
          </label>
          <label style={{ fontWeight: 600, flex: 1 }}>Color texto:
            <input type="color" value={`#${color}`} onChange={e=>setColor(e.target.value.replace('#',''))} style={{marginTop:6, width:'100%', height:42, border:'none', background:'none', padding: 0}} />
          </label>
        </div>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr', width: '100%' }}>
          <label style={{ fontWeight: 600, flex: 1 }}>Ancho:
            <input type="number" value={width} min={100} max={1200} onChange={e=>setWidth(e.target.value)} style={fieldStyle} />
          </label>
          <label style={{ fontWeight: 600, flex: 1 }}>Alto:
            <input type="number" value={height} min={50} max={600} onChange={e=>setHeight(e.target.value)} style={fieldStyle} />
          </label>
        </div>
        <label style={{ fontWeight: 600, width: '100%' }}>Fuente:
          <select value={font} onChange={e => setFont(e.target.value)} style={fieldStyle}>
            {FONT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
        <div style={{ display: 'grid', gap: 10, gridTemplateColumns: '52px 52px 1fr', alignItems: 'end', width: '100%' }}>
          <button type="button" style={{ fontWeight: bold ? 'bold' : 'normal', border: `1.5px solid ${KREATOR_COLORS.gray}`, background: '#fff', height: 42, cursor: 'pointer', borderRadius: 8, fontSize: 18, color: KREATOR_COLORS.primary }} onClick={() => setBold(b => !b)}>B</button>
          <button type="button" style={{ fontStyle: italic ? 'italic' : 'normal', border: `1.5px solid ${KREATOR_COLORS.gray}`, background: '#fff', height: 42, cursor: 'pointer', borderRadius: 8, fontSize: 18, color: KREATOR_COLORS.primary }} onClick={() => setItalic(i => !i)}>I</button>
          <select value={justify} onChange={e => setJustify(e.target.value)} style={{ ...fieldStyle, marginTop: 0 }}>
            {JUSTIFY_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <label style={{ fontWeight: 600, marginBottom: 0 }}>Usar gradiente:
          <input type="checkbox" checked={useGradient} onChange={e => setUseGradient(e.target.checked)} style={{ marginLeft: 8 }} />
        </label>
        {useGradient && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '2px 0 4px 0', justifyContent: 'center' }}>
            <input type="color" value={gradient1} onChange={e => setGradient1(e.target.value)} style={{ width: 36, height: 36, border: 'none', background: 'none' }} />
            <span style={{ fontWeight: 600, color: KREATOR_COLORS.primary }}>→</span>
            <input type="color" value={gradient2} onChange={e => setGradient2(e.target.value)} style={{ width: 36, height: 36, border: 'none', background: 'none' }} />
          </div>
        )}
        <label style={{ fontWeight: 600, width: '100%' }}>Imagen de fondo (URL temporal):
          <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." style={fieldStyle} />
        </label>
        <fieldset style={{ margin: 0, border: `1.5px solid ${KREATOR_COLORS.gray}`, padding: 10, borderRadius: 8, background: '#fafafa' }}>
          <legend style={{ color: KREATOR_COLORS.primary, fontWeight: 600 }}>Mostrar unidades:</legend>
          <label style={{ marginRight: 8 }}><input type="checkbox" checked={showDays} onChange={e => setShowDays(e.target.checked)} /> Días</label>
          <label style={{ marginRight: 8 }}><input type="checkbox" checked={showHours} onChange={e => setShowHours(e.target.checked)} /> Horas</label>
          <label style={{ marginRight: 8 }}><input type="checkbox" checked={showMinutes} onChange={e => setShowMinutes(e.target.checked)} /> Minutos</label>
          <label><input type="checkbox" checked={showSeconds} onChange={e => setShowSeconds(e.target.checked)} /> Segundos</label>
        </fieldset>
        <h2 style={{ color: KREATOR_COLORS.primary, margin: '8px 0 0 0', fontSize: 20, textAlign: 'center' }}>Vista previa:</h2>
        <div style={{
          width: '100%',
          maxWidth: previewMaxWidth,
          minHeight: 80,
          margin: '0 auto 6px auto',
          overflowX: 'auto',
          background: `linear-gradient(135deg, ${KREATOR_COLORS.gray} 0%, #fff 100%)`,
          border: `1.5px solid ${KREATOR_COLORS.gray}`,
          borderRadius: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: `0 2px 12px 0 ${KREATOR_COLORS.dark}22`,
          padding: 16,
        }}>
          <img src={url} alt="Contador regresivo" width={width} height={height} style={{ display: 'block', maxWidth: '100%', height: 'auto', background: KREATOR_COLORS.gray, border: 'none', borderRadius: 0, boxShadow: `0 1px 8px 0 ${KREATOR_COLORS.dark}22` }} />
        </div>
        <h2 style={{ color: KREATOR_COLORS.primary, fontSize: 18, textAlign: 'center', margin: '6px 0 0 0' }}>HTML para HubSpot:</h2>
        <div style={{ position: 'relative', marginBottom: 8 }}>
          <textarea style={{width:'100%',height:66, border: `1.5px solid ${KREATOR_COLORS.gray}`, borderRadius: 8, fontFamily: 'monospace', fontSize: 14, background: KREATOR_COLORS.light, color: KREATOR_COLORS.dark, padding: 10, boxSizing: 'border-box' }} readOnly value={htmlSnippet} />
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
