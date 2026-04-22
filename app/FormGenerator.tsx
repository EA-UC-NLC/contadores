"use client";
import { useState } from "react";

const FONT_OPTIONS = [
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Verdana", value: "Verdana, Geneva, sans-serif" },
  { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { label: "Courier New", value: "'Courier New', Courier, monospace" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Tahoma", value: "Tahoma, Geneva, sans-serif" },
  { label: "Impact", value: "Impact, Charcoal, sans-serif" },
];

export default function FormGenerator() {
  const [date, setDate] = useState("2026-12-25T00:00:00");
  const [title, setTitle] = useState("Navidad");
  const [bg, setBg] = useState("ffffff");
  const [color, setColor] = useState("000000");
  const [width, setWidth] = useState("600");
  const [height, setHeight] = useState("200");
  const [font, setFont] = useState(FONT_OPTIONS[0].value);

  const url = `/api/countdown?date=${encodeURIComponent(
    date
  )}&title=${encodeURIComponent(title)}&bg=${bg.replace('#','')}&color=${color.replace('#','')}&width=${width}&height=${height}&font=${encodeURIComponent(font)}`;
  const htmlSnippet = `<img src="https://contadores-sigma.vercel.app${url}" alt="Contador regresivo" width="${width}">`;

  return (
    <div style={{marginBottom: 24, background: '#f9f9f9', padding: 16, borderRadius: 8}}>
      <form onSubmit={e => e.preventDefault()}>
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
      </form>
      <h2>Vista previa:</h2>
      <img src={url} alt="Contador regresivo" width={width} height={height} style={{border:'1px solid #ccc',marginBottom:20}} />
      <h2>HTML para HubSpot:</h2>
      <textarea style={{width:'100%',height:60}} readOnly value={htmlSnippet} />
      <p>Pega este código en un módulo HTML personalizado en HubSpot.</p>
    </div>
  );
}
