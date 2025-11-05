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
  const articles = files.map((file) => getArticleBySlug(file.replace(/\.md$/, '')));
  // 投稿日（date）の新しい順にソート（投稿順）
  return articles.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA; // 新しい順（降順）
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

