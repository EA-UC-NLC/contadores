import React from 'react'

export default function Docs(){
  return (
    <html>
      <head><title>Docs - Contador</title></head>
      <body style={{fontFamily:'Arial, sans-serif',padding:20}}>
        <h1>Documentación</h1>
        <h2>Parámetros</h2>
        <ul>
          <li><b>date</b>: YYYY-MM-DD o YYYY-MM-DDTHH:mm (obligatorio)</li>
          <li><b>bg</b>: color fondo sin # (ej: ffffff)</li>
          <li><b>color</b>: color texto sin # (ej: 000000)</li>
          <li><b>fontFamily</b>: Arial|Helvetica|Georgia|Times|Courier|Verdana</li>
          <li><b>fontSize</b>: tamaño números</li>
          <li><b>labelSize</b>: tamaño labels</li>
          <li><b>width</b>, <b>height</b></li>
          <li><b>title</b>, <b>titleSize</b></li>
          <li><b>lang</b>: es|en</li>
          <li><b>showDays</b>, <b>showHours</b>, <b>showMinutes</b>, <b>showSeconds</b></li>
          <li><b>layout</b>: horizontal|vertical</li>
        </ul>
        <h2>Ejemplos</h2>
        <pre>/api/countdown.svg?date=2026-12-25T00:00:00&bg=000000&color=ffffff&title=Navidad</pre>
      </body>
    </html>
  )
}
