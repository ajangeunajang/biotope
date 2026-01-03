import './globals.css';
import './multilingual.css';
import MultilingualProvider from './components/MultilingualProvider';
import ProjectModal from './components/ProjectModal';

export const metadata = {
  title: 'BIOTOPE',
  description: '비오톱',
  openGraph: {
    title: 'BIOTOPE',
    description: '비오톱',
    siteName: '비오톱',
    images: [
      {
        url: '/biotopeog.png',
        width: 1200,
        height: 630,
        alt: 'BIOTOPE',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BIOTOPE',
    description: '비오톱',
    images: ['/biotopeog.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="bg-[#C1FF00] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <head>
        {/* 폰트 프리로드 */}
        <link
          rel="preload"
          href="/font/PretendardVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/font/BallPill-regular.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`antialiased`}>
        <MultilingualProvider>
          {children}
          <ProjectModal />
        </MultilingualProvider>
      </body>
    </html>
  );
}
