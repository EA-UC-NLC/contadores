import Head from "next/head";

export const metadata = {
  title: "Contador Regresivo",
  description: "Generador de contadores regresivos SVG para emails",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/svg+xml" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
