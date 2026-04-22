import Head from "next/head";

export const metadata = {
  title: "Contador Regresivo | Blackhole Edition",
  description: "Generador de contadores regresivos SVG para emails",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <Head>
        <title>Contador Regresivo | Blackhole Edition</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <meta property="og:title" content="Contador Regresivo | Blackhole Edition" />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:url" content="https://contadores-sigma.vercel.app/" />
      </Head>
      <body style={{ margin: 0, background: '#181818' }}>
        <header style={{ width: '100%', background: '#c20000', color: '#fff', padding: '18px 0 12px 0', textAlign: 'center', letterSpacing: 2, fontWeight: 700, fontSize: 22, fontFamily: 'Arial Rounded MT Bold, Arial, sans-serif', boxShadow: '0 2px 8px #0002' }}>
          <span style={{ filter: 'drop-shadow(0 1px 2px #0008)' }}>Contador Regresivo</span>
        </header>
        <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </main>
        <footer style={{ width: '100%', background: '#181818', color: '#bdbdbd', textAlign: 'center', fontSize: 15, padding: '18px 0 12px 0', fontFamily: 'Arial Rounded MT Bold, Arial, sans-serif', letterSpacing: 1 }}>
          Creado por Manuel Martí
        </footer>
      </body>
    </html>
  );
}
