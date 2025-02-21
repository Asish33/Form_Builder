const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

require("dotenv").config(); 

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};



export async function Gemini( input : string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Give me the form with form title, form subheadings, form placeholders, and form labels for filling the form in JSON format. Add more common fields like full name, email, etc.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Okay, I'm ready. Please provide the data. I'll do my best to create a JSON form representation based on it. I will assume common fields like `FirstName`, `LastName`, `Email`, etc., unless the data suggests otherwise. Tell me what the data represents (e.g., a customer registration, a product order, etc.) for better context.",
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(
    input + " Don't give any other info, just JSON data.",
  );

  const responseText = await result.response.text(); 
  console.log(responseText);
  return responseText;
}
