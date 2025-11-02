import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category } = body;

    // 簡単なバリデーション
    if (!title || !description || !category) {
      return NextResponse.json(
        { message: 'タイトル、概要説明、カテゴリーは必須です' },
        { status: 400 }
      );
    }

    // ここでは簡単に成功メッセージを返す
    // 実際の実装では、データベースに保存したり、AIで記事を生成したりできます
    
    return NextResponse.json(
      { message: `「${title}」の投稿を受け付けました。記事として公開されるまでしばらくお待ちください。` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { message: 'エラーが発生しました。もう一度お試しください。' },
      { status: 500 }
    );
  }
}

