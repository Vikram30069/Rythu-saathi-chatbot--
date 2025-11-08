import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function generateChatResponse(messages: any[], context: any) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are Rythu Saathi, an AI farming assistant.' },
      ...messages
    ],
  });

  return {
    message: response.choices[0].message.content || '',
    confidence: 0.9,
  };
}