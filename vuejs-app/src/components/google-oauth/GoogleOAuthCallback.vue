<template>
  <div class="flex items-center justify-center h-screen">
    <p class="text-lg font-semibold">Authenticating with Google...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { handleGoogleCallbackApi } from '@/functions/api/google-oauth';

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const code = route.query.code;
  if (code) {
    try {
      const data = await handleGoogleCallbackApi(code);
      localStorage.setItem('auth_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/chat');
    } catch (error) {
      console.error('Google Auth Failed:', error);
      router.push('/signin');
    }
  }
});
</script>