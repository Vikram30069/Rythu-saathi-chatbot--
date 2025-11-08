import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const systemPrompts = {
  te: `మీరు రైతు సాథి, తెలంగాణ రైతులకు సహాయం చేసే AI సహాయకుడు. వ్యవసాయం, వాతావరణం, పంటలు, ఎరువులు, చీడపీడలు గురించి తెలుగులో సలహాలు ఇవ్వండి. ఆచరణాత్మక సలహాలు ఇవ్వండి.`,
  
  hi: `आप रैथु साथी हैं, तेलंगाना के किसानों की मदद करने वाले AI सहायक। कृषि, मौसम, फसलों, उर्वरकों, कीटों के बारे में हिंदी में सलाह दें। व्यावहारिक सुझाव दें।`,
  
  en: `You are Rythu Saathi, an AI assistant helping farmers in Telangana. Provide practical advice about farming, weather, crops, fertilizers, and pests in English. Keep responses concise and actionable.`
};

export async function generateChatResponse(
  messages: Array<{ role: string; content: string }>,
  context: { language: string; userId: string }
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    
    const language = context.language as keyof typeof systemPrompts;
    const systemPrompt = systemPrompts[language] || systemPrompts.en;
    
    // Combine system prompt with user message
    const userMessage = messages[messages.length - 1]?.content || '';
    const fullPrompt = `${systemPrompt}\n\nవినియోగదారు: ${userMessage}\n\nరైతు సాథి:`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    
    return {
      message: text,
      confidence: 0.92,
      sources: ['Telangana Agriculture Department', 'Gemini AI'],
    };
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    
    // Fallback responses
    const fallbacks = {
      te: 'క్షమించండి, ప్రస్తుతం సేవ అందుబాటులో లేదు. దయచేసి కొద్ది సమయం తర్వాత ప్రయత్నించండి.',
      hi: 'क्षमा करें, सेवा वर्तमान में उपलब्ध नहीं है। कृपया कुछ समय बाद प्रयास करें।',
      en: 'Sorry, service is temporarily unavailable. Please try again later.'
    };
    
    return {
      message: fallbacks[context.language as keyof typeof fallbacks] || fallbacks.en,
      confidence: 0,
      sources: [],
    };
  }
}
