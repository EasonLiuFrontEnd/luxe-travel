import '../styles/globals.css'
import ClientLayout from './ClientLayout'
import { Noto_Serif_TC, Luxurious_Script } from 'next/font/google'
import styles from './style.module.css'

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

type TRootLayout = {
  children: React.ReactNode
}

const RootLayout = ({ children }: TRootLayout) => {
  return (
    <html
      lang='zh-TW'
      className={`${notoSerifTC.variable} ${luxuriousScript.variable}`}
    >
      <head />
      <body className="bg-figma-neutral-50">
        <ClientLayout className={styles['auto-text-space']}>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}

export default RootLayout
