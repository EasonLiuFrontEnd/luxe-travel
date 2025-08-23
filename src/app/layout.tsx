import '../styles/globals.css'
import ClientLayout from './ClientLayout'
import { Noto_Serif_TC, Luxurious_Script } from 'next/font/google'

const notoSerifTC = Noto_Serif_TC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-serif-tc',
  display: 'swap',
})

const luxuriousScript = Luxurious_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-luxurious-script',
  display: 'swap',
})

interface IRootLayout {
  children: React.ReactNode
}

const RootLayout = ({ children }: IRootLayout) => {
  return (
    <html
      lang='zh-TW'
      className={`${notoSerifTC.variable} ${luxuriousScript.variable}`}
    >
      <head>
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

export default RootLayout
