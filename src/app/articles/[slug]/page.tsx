import { getAllArticles, getArticleBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: '記事が見つかりません',
    };
  }

  const url = `${siteUrl}/articles/${slug}`;
  const articleImage = article.category === '食事' 
    ? `${siteUrl}/images/breakfast.webp`
    : article.category === '睡眠'
    ? `${siteUrl}/images/sleep-hero.webp`
    : `${siteUrl}/images/breakfast.webp`; // デフォルト画像

  return {
    title: `${article.title} | AI Life Guide`,
    description: article.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: url,
      siteName: 'AI Life Guide',
      type: 'article',
      publishedTime: article.date,
      authors: article.author ? [article.author] : undefined,
      tags: article.tags,
      images: [
        {
          url: articleImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [articleImage],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Markdown to HTML conversion
  const processedContent = await remark()
    .use(remarkHtml)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(article.content);

  const htmlContent = processedContent.toString();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Link */}
      <Link 
        href="/" 
        className="inline-flex items-center text-sm text-gray-600 hover:text-pink-600 transition-colors mb-8"
      >
        ← ホームに戻る
      </Link>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-gradient-to-r from-pink-50 to-rose-50 text-pink-700 rounded-lg text-xs font-bold border border-pink-200">
            {article.category || '美容・健康'}
          </span>
          {article.date && (
            <span className="text-sm text-gray-500">
              {new Date(article.date).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">{article.title}</h1>
        <p className="text-lg text-gray-600 mb-4">{article.description}</p>
        {article.author && (
          <p className="text-sm text-gray-500">
            <span className="font-medium">執筆者: </span>{article.author}
          </p>
        )}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Article Content */}
      <article 
        className="prose prose-lg max-w-none bg-white rounded-xl p-8 shadow-lg article-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}

