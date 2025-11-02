'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PostPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('https://formspree.io/f/mrbordao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          _subject: `記事投稿: ${title}`,
          title,
          description,
          category
        }),
      });
      
      if (res.ok) {
        setResult(`「${title}」の投稿を受け付けました。記事として公開されるまでしばらくお待ちください。`);
      } else {
        setResult('エラーが発生しました。もう一度お試しください。');
      }
    } catch (err) {
      setResult('エラーが発生しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-800 mb-6 transition-colors group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span className="font-medium">ホーム</span>
        </Link>
        <h1 className="text-4xl font-black bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 bg-clip-text text-transparent mb-3">
          ✍️ 記事を投稿
        </h1>
        <p className="text-gray-600 text-lg">
          美容と健康に関する記事のアイデアをシェアしましょう
        </p>
        <div className="h-2 w-32 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mt-4"></div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              タイトル *
            </label>
            <input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="例: 寝る前の5つの習慣で質の高い睡眠を" 
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              カテゴリー *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
              required
            >
              <option value="">選択してください</option>
              <option value="睡眠">😴 睡眠</option>
              <option value="食事">🥗 食事</option>
              <option value="運動">🏃 運動</option>
              <option value="リラックス">🧘 リラックス</option>
              <option value="美容">💄 美容</option>
              <option value="健康">🏥 健康</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              概要説明 *
            </label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="伝えたい内容を簡潔に説明してください" 
              rows={6}
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all resize-none" 
              required
            />
          </div>

          <button 
            disabled={loading} 
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold py-4 rounded-lg hover:from-pink-700 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                <span>処理中...</span>
              </span>
            ) : (
              <span>📤 投稿する</span>
            )}
          </button>
        </form>
        {result && (
          <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">✓ {result}</p>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          💡 ヒント
        </h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 情報はなるべく分かりやすく伝えましょう</li>
          <li>• 実際の体験談や具体的な方法があると大歓迎です</li>
          <li>• 他のユーザーが参考にしやすい記事にしてください</li>
        </ul>
      </div>
    </div>
  );
}
