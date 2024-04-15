import openai from "openai";
const openaiClient = new openai({ apiKey:process.env.OPENAI_API_KEY,dangerouslyAllowBrowser: true,});

let chatHistory = [];

// Function to get chat completion
export async function getChatCompletion(messages) {
  try {
    // Add the new messages to the chat history
    chatHistory = [...chatHistory, ...messages];

    // Request completion from OpenAI
    const completion = await openaiClient.chat.completions.create({
      messages: chatHistory,
      model: "gpt-3.5-turbo",
    });

    // Return the completion text
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching chat completion:", error);
    throw error;
  }
}