import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Article = {
  slug: string;
  title: string;
  description: string;
  category?: string;
  date?: string;
  tags?: string[];
  author?: string;
  content: string;
  updatedAt?: number; // ファイルの更新日時（ミリ秒）
};

const CONTENT_DIR = path.join(process.cwd(), 'content', 'articles');

export function getAllArticles(): Article[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  const articles = files.map((file) => {
    const article = getArticleBySlug(file.replace(/\.md$/, ''));
    // ファイルの更新日時を取得
    const fullPath = path.join(CONTENT_DIR, file);
    const stats = fs.statSync(fullPath);
    return {
      ...article,
      updatedAt: stats.mtime.getTime(), // ファイルの更新日時を追加
    };
  });
  // ファイルの更新日時の新しい順にソート（更新順）
  return articles.sort((a, b) => {
    return (b.updatedAt || 0) - (a.updatedAt || 0); // 新しい順（降順）
  });
}

export function getArticleBySlug(slug: string): Article {
  const fullPath = path.join(CONTENT_DIR, `${slug}.md`);
  const source = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(source);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    category: data.category,
    date: data.date,
    tags: data.tags,
    author: data.author,
    content,
  };
}

