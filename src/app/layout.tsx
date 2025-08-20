import '../styles/globals.css'
import ClientLayout from './ClientLayout'

interface IRootLayout {
  children: React.ReactNode
}

const RootLayout = ({ children }: IRootLayout) => {
  return (
    <html lang='zh-TW'>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

export default RootLayout
