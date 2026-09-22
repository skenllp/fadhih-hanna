import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import './cover.css';

const edwardianScript = localFont({
  src: [
    {
      path: '../public/fonts/EdwardianScriptITC.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/EdwardianScriptITC.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/EdwardianScriptITC.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-edwardian',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fadhih-hanna.vercel.app'),
  title: 'Fadhih & Hanna · Wedding Invitation · 25 October 2026',
  description: 'Join us as we celebrate the wedding reception of Fadhih & Hanna on October 25, 2026 at Fayiz Mahal, Kammili, Atholi.',
  icons: { icon: '/assets/logo-2.png' },
  openGraph: {
    title: 'Fadhih & Hanna · Wedding Invitation',
    description: 'Wedding Reception · 25 October 2026 · Fayiz Mahal, Kammili, Atholi',
    url: 'https://fadhih-hanna.vercel.app',
    siteName: 'Fadhih & Hanna Wedding',
    images: [
      {
        url: 'https://fadhih-hanna.vercel.app/og.jpg',
        secureUrl: 'https://fadhih-hanna.vercel.app/og.jpg',
        width: 1200,
        height: 800,
        type: 'image/jpeg',
        alt: 'Fadhih & Hanna Wedding Invitation',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fadhih & Hanna · Wedding Invitation',
    description: 'Wedding Reception · 25 October 2026 · Fayiz Mahal, Kammili, Atholi',
    images: ['https://fadhih-hanna.vercel.app/og.jpg'],
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={edwardianScript.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Great+Vibes&family=Pinyon+Script&family=Sedan:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
