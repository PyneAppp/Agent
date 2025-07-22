import axios from "axios";

export const chatWithOpenRouter = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-v3-base:free", // or use "deepseek/deepseek-r1:free"
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content || "No response.";

    res.status(200).json({ reply });
  } catch (error) {
    console.error("OpenRouter API Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from OpenRouter." });
  }
};
