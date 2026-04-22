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
      <body>{children}</body>
    </html>
  );
}
