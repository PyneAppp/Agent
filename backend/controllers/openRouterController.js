import axios from "axios";

export const chatWithOpenRouter = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  // Check if API key exists
  if (!process.env.OPENROUTER_API_KEY) {
    console.error("OpenRouter API key not found in environment variables");
    return res.status(500).json({ error: "API configuration error" });
  }

  console.log("Attempting OpenRouter API call for prompt:", prompt.substring(0, 50) + "...");

  try {
    const requestData = {
      model: "deepseek/deepseek-v3-base:free",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant specialized in helping people find accommodation. You should be friendly, informative, and focus on housing-related topics."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7
    };

    console.log("Making request to OpenRouter...");
    
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5000",
          "X-Title": "Torabasa Accommodation Assistant"
        },
        timeout: 30000 // 30 second timeout
      }
    );

    console.log("OpenRouter response received:", response.status);
    
    const reply = response.data.choices?.[0]?.message?.content || "I apologize, but I didn't receive a proper response. Could you please try asking your question again?";

    res.status(200).json({ reply });
  } catch (error) {
    console.error("OpenRouter API Error Details:");
    console.error("Status:", error?.response?.status);
    console.error("Data:", error?.response?.data);
    console.error("Message:", error.message);
    
    // Provide fallback response based on the prompt
    let fallbackResponse = "I'm having trouble connecting to my AI service right now. ";
    
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes('hello') || lowerPrompt.includes('hi')) {
      fallbackResponse += "Hello! I'm here to help you find accommodation. What are you looking for?";
    } else if (lowerPrompt.includes('price') || lowerPrompt.includes('cost')) {
      fallbackResponse += "Our accommodations typically range from $800 to $1400 per month. What's your budget?";
    } else if (lowerPrompt.includes('location') || lowerPrompt.includes('area')) {
      fallbackResponse += "We have properties in Chitungwiza Unit A, B, C, and L. Which area interests you?";
    } else {
      fallbackResponse += "I can help you with accommodation pricing, locations, amenities, and booking. What would you like to know?";
    }
    
    res.status(200).json({ reply: fallbackResponse });
  }
};
