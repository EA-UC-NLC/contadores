import { cookies } from 'next/headers';

function getParam(searchParams: URLSearchParams, key: string, def: string) {
  return searchParams.get(key) || def;
}

export default function Page({ searchParams }: { searchParams?: { [key: string]: string | string[] } }) {
  // Obtener parámetros de la URL
  const params = new URLSearchParams(searchParams as any || '');
  const date = getParam(params, 'date', '2026-12-25T00:00:00');
  const title = getParam(params, 'title', 'Navidad');
  const bg = getParam(params, 'bg', 'ffffff');
  const color = getParam(params, 'color', '000000');
  const width = getParam(params, 'width', '600');
  const height = getParam(params, 'height', '200');

  const url = `https://contadores-sigma.vercel.app/api/countdown?date=${encodeURIComponent(date)}&title=${encodeURIComponent(title)}&bg=${bg}&color=${color}&width=${width}&height=${height}`;
  const htmlSnippet = `<img src="${url}" alt="Contador regresivo" width="${width}">`;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '40px', maxWidth: 700, margin: '0 auto' }}>
      <h1>Contador Regresivo</h1>
      <form method="get" style={{ marginBottom: 24, background: '#f9f9f9', padding: 16, borderRadius: 8 }}>
        <label>Fecha objetivo:<br/>
          <input type="datetime-local" name="date" defaultValue={date.slice(0, 16)} style={{ marginBottom: 8 }} />
        </label><br/>
        <label>Título:<br/>
          <input name="title" defaultValue={title} style={{ marginBottom: 8 }} />
        </label><br/>
        <label>Fondo:<br/>
          <input type="color" name="bg" defaultValue={`#${bg}`} style={{ marginBottom: 8 }} />
        </label><br/>
        <label>Color texto:<br/>
          <input type="color" name="color" defaultValue={`#${color}`} style={{ marginBottom: 8 }} />
        </label><br/>
        <label>Ancho:<br/>
          <input type="number" name="width" defaultValue={width} min={100} max={1200} style={{ marginBottom: 8 }} /> px
        </label><br/>
        <label>Alto:<br/>
          <input type="number" name="height" defaultValue={height} min={50} max={600} style={{ marginBottom: 8 }} /> px
        </label><br/>
        <button type="submit">Actualizar vista previa</button>
      </form>
      <h2>Vista previa:</h2>
      <img src={url} alt="Contador regresivo" width={width} height={height} style={{ border: '1px solid #ccc', marginBottom: 20 }} />
      <h2>HTML para HubSpot:</h2>
      <textarea style={{ width: '100%', height: 60 }} readOnly value={htmlSnippet} />
      <p>Pega este código en un módulo HTML personalizado en HubSpot.</p>
      <h2>Ejemplos rápidos:</h2>
      <ul>
        <li><a href="?date=2026-12-25T00:00:00&title=Navidad&bg=ffffff&color=000000&width=600&height=200">Navidad</a></li>
        <li><a href="?date=2026-11-27T00:00:00&title=Black%20Friday&bg=000000&color=ffffff&width=600&height=200">Black Friday</a></li>
        <li><a href="?date=2026-06-01T09:00:00&title=Lanzamiento&bg=1e90ff&color=ffffff&width=600&height=200">Lanzamiento</a></li>
      </ul>
      <h2>Documentación:</h2>
      <p><a href="/docs">Ver docs aquí</a></p>
    </div>
  );
}
