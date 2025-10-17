const { GoogleGenAI } = require("@google/genai");


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const aiChat = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ response: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI service error" });
  }
};

module.exports = { aiChat };
