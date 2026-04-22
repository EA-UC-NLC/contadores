export const metadata = {
  title: 'Contador Regresivo',
  description: 'Generador de contadores regresivos SVG para emails',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
