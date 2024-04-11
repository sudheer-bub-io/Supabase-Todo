<template>
 <NuxtLayout>
  <NuxtPage>
  </NuxtPage>
 </NuxtLayout>
</template>
<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser()
</script>
