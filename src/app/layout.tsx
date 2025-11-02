import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: 'AI Life Guide - 美容と健康のライフガイド',
  description: '美容と健康に関する役立つ情報をお届けします。睡眠、食事、運動など、日常の習慣から内側の美しさを育てましょう。',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'AI Life Guide - 美容と健康のライフガイド',
    description: '美容と健康に関する役立つ情報をお届けします。睡眠、食事、運動など、日常の習慣から内側の美しさを育てましょう。',
    url: siteUrl,
    siteName: 'AI Life Guide',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/images/breakfast.webp`,
        width: 1200,
        height: 630,
        alt: 'AI Life Guide - 美容と健康のライフガイド',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Life Guide - 美容と健康のライフガイド',
    description: '美容と健康に関する役立つ情報をお届けします。睡眠、食事、運動など、日常の習慣から内側の美しさを育てましょう。',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7286325354162680"
          crossOrigin="anonymous"
          dangerouslySetInnerHTML={{ __html: '' }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 antialiased">
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center justify-between">
              <Link href="/">
                <div className="group cursor-pointer">
                  <h1 className="text-4xl font-black bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                    AI Life Guide
                  </h1>
                  <p className="text-sm font-medium text-gray-600 mt-1 group-hover:text-gray-900 transition-colors">
                    🌸 美容と健康のライフガイド
                  </p>
                </div>
              </Link>
              <Link href="/post">
                <button className="px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                  ✍️ 投稿する
                </button>
              </Link>
            </div>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
          </header>

          <main className="mb-16">{children}</main>

          {/* Footer */}
          <footer className="mt-20 pt-8 border-t border-gray-200">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-600">
                  © {new Date().getFullYear()} AI Life Guide. All rights reserved.
                </div>
                <div className="flex items-center gap-6 text-sm flex-wrap justify-center">
                  <Link href="/" className="text-gray-600 hover:text-pink-600 transition-colors">ホーム</Link>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
                <Link href="/privacy" className="hover:text-pink-600 transition-colors">プライバシーポリシー</Link>
                <span className="text-gray-300">|</span>
                <Link href="/terms" className="hover:text-pink-600 transition-colors">利用規約</Link>
                <span className="text-gray-300">|</span>
                <Link href="/disclaimer" className="hover:text-pink-600 transition-colors">免責事項</Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
