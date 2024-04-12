import openai from "openai";
const openaiClient = new openai({ apiKey:process.env.OPENAI_API_KEY,dangerouslyAllowBrowser: true,});

let chatHistory = [{
    role: "system", 
    content: `You are a Virtual Assistant. 
    If asked about the course provide more information about it.
    If the course is not found, please ask them to subscribe to our newsletter.
    Answer all the questions in your capacity.
    `
  }, ...messages]


  const completion = await openai.createChatCompletion({
    messages: chatHistory,
    model: "gpt-3.5-turbo",
  });
  console.log(completion)

  const response = completion.data.choices[0].message

  return {
    message: response,
  }
