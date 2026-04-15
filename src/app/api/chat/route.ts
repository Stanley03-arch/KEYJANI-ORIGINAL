import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const { messages, language } = await req.json();
    const safeLanguage = typeof language === "string" ? language : "English";
    const safeMessages = Array.isArray(messages) ? messages : [];

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json({ 
        content: "Groq API Key is missing. Please add GROQ_API_KEY to your .env.local file to activate live AI." 
      });
    }

    const groq = new Groq({ apiKey: groqApiKey });

    const systemPrompt = `
      You are Keyjani AI, a world-class agritech assistant specializing in Kenyan regenerative agriculture and Web3 carbon markets.
      You are speaking to a farmer. Tone: professional, encouraging, and communal.
      
      Current UI Language Selection: ${safeLanguage}
      
      CRITICAL INSTRUCTIONS:
      1. If the user speaks Swahili or Sheng (e.g., "sasa", "unaendelea aje", "mambo"), immediately respond in fluent, friendly conversational Swahili/Sheng, REGARDLESS of the UI language selection.
      2. If the user explicitly asks about the platform, explain how they can tokenize soil carbon via the Keyjani Oracle for $AGRI tokens at the current market rate of $12.50/tonne.
      3. Provide deeply scientific but accessible regenerative agriculture advice (no-till, cover crops, biochar, etc).
      4. Keep responses concise (under 3 sentences) unless they ask a complex question.
    `;

    // Filter out any system messages from the client state to avoid conflicts
    const formattedMessages = safeMessages.filter(m => m.role !== 'system');

    const response = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...formattedMessages
      ],
      model: process.env.GROQ_MODEL || "llama3-8b-8192",
      temperature: 0.6,
      max_tokens: 500,
    });

    return NextResponse.json({ 
      content: response.choices[0]?.message?.content || "No response generated." 
    });
  } catch (error) {
    console.error("Groq Cloud AI Error:", error);
    return NextResponse.json({ error: "Failed to process request through Groq Cloud" }, { status: 500 });
  }
}
