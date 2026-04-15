import { NextResponse } from "next/server";

// Sophisticated Free Local Mock AI
function generateLocalAdvice(messages: any[], language: string) {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
  
  const adviceDB: Record<string, any> = {
    "English": [
      { keys: ["soil", "degrade", "health"], response: "To improve soil health and maximize your carbon sequestration, I strongly recommend adopting no-till practices and integrating cover crops like Mucuna pruriens. This will instantly qualify you for higher tier Keyjani Carbon Credits." },
      { keys: ["water", "irrigation", "dry"], response: "Given the recent drought patterns, consider contour farming and mulching to retain soil moisture. These regenerative practices not only save water but also increase your $AGRI token yield." },
      { keys: ["carbon", "credit", "sell"], response: "You can tokenize your farm's carbon sequestration directly through the Keyjani Oracle. Based on your current practices, you are on track to mint 1.25 tCO2 equivalents this season." },
      { keys: ["pest", "disease", "insect"], response: "Instead of chemical pesticides which degrade soil carbon, try integrated pest management (IPM) using neem oil or intercropping with marigolds. This protects your soil microbiome." },
      { keys: ["default"], response: "Welcome to Keyjani AI! I am your regenerative agriculture advisor. How can I assist you with maximizing your yield and carbon credits today?" }
    ],
    "Kiswahili": [
      { keys: ["udongo", "afya", "mchanga"], response: "Ndugu mkulima, ili kuboresha afya ya udongo na kuongeza kiasi cha kaboni, ninashauri utumie kilimo hifadhi bila kulima sana na upande mimea ya kufunika udongo. Hii itaongeza mapato yako ya Keyjani." },
      { keys: ["maji", "kiangazi", "mvua"], response: "Kutokana na kiangazi, tumia matandazo (mulching) kuhifadhi unyevu kwenye udongo. Hii itasaidia mimea yako na kukuongezea pointi za $AGRI." },
      { keys: ["kaboni", "pesa", "uza"], response: "Unaweza kuuza kaboni yako kupitia Keyjani Oracle. Kwa sasa, shamba lako lina uwezo wa kuzalisha tani 1.25 za kaboni msimu huu." },
      { keys: ["default"], response: "Karibu Keyjani AI! Mimi ni mshauri wako wa kilimo hai. Nikusaidie vipi leo kuongeza mazao na mapato yako ya kaboni?" }
    ]
  };

  const selectedLang = adviceDB[language] ? language : "English";
  const rules = adviceDB[selectedLang];

  for (const rule of rules) {
    if (rule.keys[0] === "default") return rule.response;
    if (rule.keys.some((k: string) => lastMessage.includes(k))) {
      return rule.response;
    }
  }
  
  return rules.find((r: any) => r.keys[0] === "default").response;
}

export async function POST(req: Request) {
  try {
    const { messages, language } = await req.json();
    const safeLanguage = typeof language === "string" ? language : "English";
    const safeMessages = Array.isArray(messages) ? messages : [];

    // Always use the local mock generator so it works for 100% free locally
    // No API key required. Simulated thinking delay to feel like a real AI.
    const mockResponse = generateLocalAdvice(safeMessages, safeLanguage);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({ 
      content: mockResponse 
    });
  } catch (error) {
    console.error("Local AI Error:", error);
    return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 });
  }
}
