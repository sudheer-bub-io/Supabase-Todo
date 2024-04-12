<template>
  <div>
    <!-- Header with signout button -->

    <!-- Todo input and list -->
    <div class="mt-4 mx-4">
      <div class="flex mb-4">
        <input v-model="newTodo" placeholder="Add new todo" class="border border-gray-300 rounded-md px-3 py-2 mr-2" />
        <input v-model="description" placeholder="Description" class="border border-gray-300 rounded-md px-3 py-2 mr-2" />
        <button @click="addTodo" class="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md cursor-pointer">Add</button>
      </div>
      <ul>
        <li v-for="todo in todos" :key="todo.id" class="mb-2">
          <div class="border border-gray-300 rounded-md p-4 flex items-center justify-between">
            <div>
              <span :class="{ 'line-through': todo.completed }" @click="toggleTodoCompletion(todo)">{{ todo.todo }}</span>
              <div>
                <span v-if="todo.description" class="ml-2 text-gray-500">{{ todo.description }}</span>
              </div>
            </div>
            <div>
              <button @click="deleteTodo(todo)" class="text-red-600 hover:text-red-700">Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class=" py-4 px-6 flex justify-between items-center">
      <div>
        <button @click="signOut" class="bg-slate-600 p-2 rounded-md text-gray-200 hover:text-gray-300 focus:outline-none">
          Sign Out
        </button>
      </div>
    </div>
  </div>
  <button @click="chatBot" class="bg-slate-600 p-2 rounded-md text-gray-200 hover:text-gray-300 focus:outline-none">
    Go to ChatBot
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getChatCompletion } from '@/utils/openai'; 

const user = useSupabaseUser();
const supabase = useSupabaseClient();

const newTodo = ref('');
const description = ref('');
const todos = ref([]);

const fetchTodos = async () => {
  let { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.value.id);
  if (error) {
    console.error('Error fetching todos:', error.message);
  } else {
    todos.value = data || [];
  }
};
await fetchTodos()
onMounted(fetchTodos);

const chatBot =()=>{
  console.log("I got clicked")
  navigateTo("/login");
}

const addTodo = async () => {
  if (newTodo.value.trim() !== '') {
    // Call AI completion function before adding the task
    const taskName = await getChatCompletion(newTodo.value);
    const taskDescription = await getChatCompletion(description.value);
    // const taskDescription = await getChatCompletion(description.value || ''); // Also get description
    const { data, error } = await supabase.from('todos').insert([{ todo: taskName, description: taskDescription, completed: false, user_id: user.value.id }]);
    if (error) {
      console.error('Error adding todo:', error.message);
    } else {
      await fetchTodos();
      todos.value.push(data[0]);
      newTodo.value = '';
      description.value = '';
    }
  }
};

const deleteTodo = async (todo) => {
  const { error } = await supabase.from('todos').delete().eq('id', todo.id);
  if (error) {
    console.error('Error deleting todo:', error.message);
  } else {
    todos.value = todos.value.filter(t => t !== todo);
  }
};

const toggleTodoCompletion = async (todo) => {
  console.log("heello")
  console.log(todo)
  const { data, error } = await supabase
    .from('todos')
    .update({ completed: !todo.completed })
    .eq('id', todo.id)
    .select();

  if (error) {
    console.error('Error updating todo:', error.message);
  } else {
    const updatedTodoIndex = todos.value.findIndex(t => t.id === todo.id);
    todos.value[updatedTodoIndex] = data[0];
  }
};

const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    user.value = null;
  } catch (error) {
    alert(error.message);
  } finally {
    navigateTo("/login");
  }
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>