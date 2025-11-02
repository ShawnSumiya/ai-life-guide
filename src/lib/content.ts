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
};

const CONTENT_DIR = path.join(process.cwd(), 'content', 'articles');

export function getAllArticles(): Article[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  return files.map((file) => getArticleBySlug(file.replace(/\.md$/, '')));
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

