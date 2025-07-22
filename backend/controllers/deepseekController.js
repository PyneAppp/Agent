import axios from "axios";

export const chatWithDeepSeek = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      "https://api.deepseek.com/v1/chat/completions", // replace with the correct endpoint if different
      {
        model: "deepseek-chat", // or "deepseek-coder" if you're doing code completion
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`
        }
      }
    );

    const reply = response.data.choices[0]?.message?.content || "No response from DeepSeek.";

    res.status(200).json({ reply });
  } catch (error) {
    console.error("DeepSeek API Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate response from DeepSeek." });
  }
};
