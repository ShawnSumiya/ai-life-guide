import Link from 'next/link';
import { getAllArticles } from '@/lib/content';

export default function HomePage() {
  const articles = getAllArticles();
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-600 via-rose-600 to-orange-600 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-3">🌸 内側から美しく、健康に</h2>
          <p className="text-lg text-pink-100 max-w-2xl">
            美容と健康に関する役立つ情報をお届けします。睡眠、食事、運動など、日常の習慣から内側の美しさを育てましょう。
          </p>
        </div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Articles Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">📚 人気の記事</h3>
          <span className="px-4 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold">
            {articles.length}件
          </span>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link 
              key={article.slug} 
              href={`/articles/${article.slug}`}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Gradient Top Bar */}
              <div className="h-2 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500"></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-pink-50 to-rose-50 text-pink-700 rounded-lg text-xs font-bold border border-pink-200">
                    {article.category || '美容・健康'}
                  </span>
                  <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {article.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    🌸 <span className="font-medium">詳細を見る</span>
                  </span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">カテゴリー</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-2xl mb-2">😴</div>
            <div className="font-semibold text-gray-900">睡眠</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-2xl mb-2">🥗</div>
            <div className="font-semibold text-gray-900">食事</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-2xl mb-2">🏃</div>
            <div className="font-semibold text-gray-900">運動</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-2xl mb-2">🧘</div>
            <div className="font-semibold text-gray-900">リラックス</div>
          </div>
        </div>
      </div>
    </div>
  );
}
