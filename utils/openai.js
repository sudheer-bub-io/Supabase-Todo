// utils/openai.js

import openai from "openai";

const openaiClient = new openai({ apiKey:process.env.OPENAI_API_KEY,dangerouslyAllowBrowser: true,});

export async function getChatCompletion(task) {
    console.log(task)
  try {
    const completion = await openaiClient.chat.completions.create({
        messages: [{"role": "system", "content": `take this as the value : ${task}-- if this value starts with Add remove add give title for the task and value is not started with the task give one line for the given value don't give heading like title for the output if there is add dont give response like vale: Add only give oneliner not like key value if Add Swimming generate only title for it`},],
    model: "gpt-3.5-turbo",
  });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching chat completion:", error);
    throw error;
  }
}