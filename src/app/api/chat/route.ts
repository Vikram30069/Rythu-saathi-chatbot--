import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { message, language = 'te', userId } = await request.json();

    if (!message || !userId) {
      return NextResponse.json(
        { error: 'Message and userId are required' },
        { status: 400 }
      );
    }

    // Generate response using Gemini
    const response = await generateChatResponse(
      [{ role: 'user', content: message }],
      { language, userId }  
    );

    return NextResponse.json({
      success: true,
      data: {
        message: response.message,
        confidence: response.confidence,
        sources: response.sources,
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
