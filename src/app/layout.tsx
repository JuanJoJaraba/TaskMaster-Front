import './globals.css'


export const metadata = {
  title: 'TaskMaster',
  description: 'Juan Jaraba',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
