import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contador Regresivo | Blackhole Edition",
  description: "Generador de contadores regresivos SVG para emails",
  openGraph: {
    title: "Contador Regresivo | Blackhole Edition",
    images: ["/icon.png"],
    url: "https://contadores-sigma.vercel.app/",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, background: '#181818' }}>
        <header style={{ width: '100%', background: '#c20000', height: 32 }} />
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
