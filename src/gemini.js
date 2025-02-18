// let apiKey="AIzaSyAnGBJmhox6qKBEN3BqQVTI7avOZgUtGA0"

// import {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } from "@google/generative-ai";

//   const genAI = new GoogleGenerativeAI(apiKey);

//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash-8b",
//   });

//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 20,
//     responseMimeType: "text/plain",
//   };

// async function run(prompt) {
//   const chatSession = model.startChat({
//     generationConfig,
//     history: [
//     ],
//   });

//   const result = await chatSession.sendMessage(prompt);
//   return result.response.text()
// }

async function run(prompt) {
  try {
    const response = await fetch(
      "https://quza-backend.vercel.app/api/chatbot",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: prompt })
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch response from server");
    }

    const data = await response.json();
    console.log(data);
    return data.response; // Ensure your backend sends a response in this format
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred while processing your request.";
  }
}

export default run;
