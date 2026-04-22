export default function Page() {
  return (
    <html>
      <head>
        <title>Contador Regresivo</title>
      </head>
      <body style={{ fontFamily: 'Arial, sans-serif', padding: '40px' }}>
        <h1>Contador Regresivo</h1>
        <p>Generador de contadores SVG para emails</p>
        <h2>Ejemplos:</h2>
        <ul>
          <li><a href="/api/countdown?date=2026-12-25T00:00:00&title=Navidad&bg=ffffff&color=000000&width=600&height=200">Navidad</a></li>
          <li><a href="/api/countdown?date=2026-11-27T00:00:00&title=Black%20Friday&bg=000000&color=ffffff&width=600&height=200">Black Friday</a></li>
          <li><a href="/api/countdown?date=2026-06-01T09:00:00&title=Lanzamiento&bg=1e90ff&color=ffffff&width=600&height=200">Lanzamiento</a></li>
        </ul>
        <h2>Documentación:</h2>
        <p><a href="/docs">Ver docs aquí</a></p>
      </body>
    </html>
  )
}
