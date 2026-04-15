import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Universal Free Local Mock AI Engine (Fallback)
function generateLocalAdvice(messages: any[], explicitLanguage: string) {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
  
  const universalRules = [
    { keys: ["sasa", "mambo", "niaje", "aje", "habari", "hi", "hello", "hey", "unaendelea"], response: "Mambo! (Hello!) I am doing great. As your Keyjani AI advisor, I can help you understand carbon credits, analyze your latest satellite data, or guide you on regenerative practices. How can I help today?" },
    { keys: ["what is", "nini", "carbon credit", "token", "agri"], response: "You can tokenize your farm's carbon sequestration directly through the Keyjani Oracle. Based on your current practices, you are on track to mint 1.25 tCO2 equivalents ($AGRI tokens) this season." },
    { keys: ["soil", "udongo", "degrade", "health", "afya"], response: "To improve soil health and maximize your carbon sequestration, adopt no-till practices and cover crops. Tunashauri utumie kilimo hifadhi bila kulima sana. This unlocks higher Keyjani NFT metadata tiers." },
    { keys: ["water", "maji", "irrigation", "dry", "kiangazi", "mvua"], response: "Given the recent weather patterns in your region, consider contour farming. Kutokana na kiangazi, tumia matandazo (mulching) kuhifadhi unyevu kwenye udongo. It saves water and boosts your $AGRI yield." },
    { keys: ["pest", "disease", "insect", "wadudu", "magonjwa"], response: "Avoid chemical pesticides that degrade soil organic carbon. Instead, try integrated pest management (IPM) using neem oil or intercropping with marigolds to protect your soil microbiome." },
    { keys: ["price", "bei", "sell", "uza", "pesa"], response: "Current market rate is $12.50 per tonne of CO2. You can sell your verified tokens directly in the Keyjani Marketplace via your connected wallet." }
  ];

  for (const rule of universalRules) {
    if (rule.keys.some((k: string) => lastMessage.includes(k))) {
      return rule.response;
    }
  }
  
  if (explicitLanguage === "Kiswahili") return "Ndiyo, nimekuelewa. Ili nikusaidie vizuri zaidi kuhusu Keyjani, unaweza kuuliza kuhusu: Afya ya Udongo, Pesa za Kaboni, au Hali ya hewa (Satellite).";
  if (explicitLanguage === "Kalenjin" || explicitLanguage === "Kikuyu") return "I am processing that context. As we localize for your specific agrozones, please ask me about your Carbon Score, Soil Health, or $AGRI tokens.";
  return "Welcome to Keyjani AI! I am your regenerative agriculture advisor. You can ask me about soil health, carbon payouts, pest management, or your satellite diagnostics.";
}

export async function POST(req: Request) {
  let safeMessages: any[] = [];
  let safeLanguage = "English";

  try {
    const body = await req.json();
    safeLanguage = typeof body.language === "string" ? body.language : "English";
    safeMessages = Array.isArray(body.messages) ? body.messages : [];

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      // Intelligently fallback to the Universal Local engine if the cloud key is missing
      await new Promise(resolve => setTimeout(resolve, 600)); // simulate latency
      return NextResponse.json({ content: generateLocalAdvice(safeMessages, safeLanguage) });
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
  } catch (error: any) {
    console.error("Groq Cloud API rejected the request:", error?.message || error);
    
    // Absolute Fail-Safe: Return our Universal NLP Engine so the bot never throws a 500 status!
    return NextResponse.json({ 
      content: generateLocalAdvice(safeMessages, safeLanguage) 
    });
  }
}
