<template>
  <div class="w-96 h-1/2 absolute top-[68px] left[20%] ml-96 shadow shadow-gray-600 rounded-lg overflow-hidden flex flex-col bg-black">
    <header class="w-full h-10 flex-none bg-gradient-to-r flex items-center justify-between px-3 from-slate-600 to-slate-200">
      <h1 class="text-lg text-gray-50 font-semibold">AI Chat</h1>
    </header>

    <div class="messages flex flex-col h-full space-y-4 w-full overflow-x-hidden overflow-y-auto py-8 scroll-smooth" ref="messageContainer">
      <template v-for="(message, index) in messages" :key="index">
        <div
          :class="[message.role === 'assistant' ? 'assistant-message' : 'user-message']"
          :style="{ alignSelf: message.role === 'assistant' ? 'flex-end' : 'flex-start' }"
        >
          {{ message.content }}
        </div>
      </template>
    </div>

    <form @submit.prevent="sendMessage" class="flex items-center mt-auto">
      <input v-model="messageText" type="text" class="w-full py-6 px-3 h-10 bg-gray-900 text-slate-200 border border-gray-900 placeholder:text-gray-600 outline-none focus:outline-none transition-all duration-150 ease-in-out focus:border-slate-600" placeholder="Enter your message here ..." />
      <button type="submit" class="btn btn-md btn-primary rounded-md bg-slate-600 p-2.5 text-white">Send</button>
    </form>
  </div>
  <button @click="goToHome" class="btn btn-md btn-primary rounded-md bg-slate-600 p-2.5 text-white">Go to home</button>
</template>

<script setup>
import { ref } from 'vue';
import { getChatCompletion } from '@/utils/chatbot';

const messageText = ref("");
const messages = ref([
  { role: "assistant", content: "Hello, how can I help you?" },
  { role: "assistant", content: "You can ask me anything you like about our services." },
]);
const messageContainer = ref();

async function sendMessage() {
  messages.value = [...messages.value, { role: "user", content: messageText.value }];
  messageText.value = "";

  setTimeout(() => {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }, 500);

  const botResponse = await getChatCompletion(messages.value);
  messages.value = [...messages.value, { role: "assistant", content: botResponse }];
}
function goToHome(){
  navigateTo("/")
}
</script>

<style scoped>
.messages {
  display: flex;
  flex-direction: column;
}

.user-message {
  background-color: #007bff;
  color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
}

.assistant-message {
  background-color: #eaeaea;
  color: #000;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
}

.scroll-smooth {
  scroll-behavior: smooth;
}
</style>
