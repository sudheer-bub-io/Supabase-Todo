// utils/openai.js

import openai from "openai";

const openaiClient = new openai({ apiKey:process.env.OPENAI_API_KEY,dangerouslyAllowBrowser: true,});

export async function getChatCompletion(task) {
    console.log(task)
  try {
    const completion = await openaiClient.chat.completions.create({
        messages: [{"role": "system", "content": `${task}`},],
    model: "gpt-3.5-turbo",
  });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching chat completion:", error);
    throw error;
  }
}
