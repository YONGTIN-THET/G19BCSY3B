<template>
  <div class="hold-transition login-page">
    <div class="login-box text-center">
      <div class="card card-outline card-primary">
        <div class="card-body p-4">
          <i class="fas fa-spinner fa-spin fa-3x text-primary mb-3"></i>
          <h5>Authenticating with Google...</h5>
          <p class="text-muted">Please wait while we log you in.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { handleGoogleCallbackApi } from '@/functions/api/google-oauth';
import { useUserStore } from '@/stores/user';
import { MessageModal } from '@/functions/swal';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
  // យក URL Query Parameter 'code' ដែល Google បញ្ជូនមក
  const code = route.query.code;

  if (code) {
    try {
      // ផ្ញើ Code ទៅ Backend
      const response = await handleGoogleCallbackApi(code);
      
      // រក្សាទុក User និង Sanctum Token ចូល Pinia Store
      userStore.setState(response.user);
      userStore.setSanctumToken(response.access_token);

      // Redirect ទៅកាន់ Dashboard
      router.replace({ name: 'dashboard' });
    } catch (error) {
      console.error('Google Authentication Error:', error);
      await MessageModal({
        icon: 'error',
        title: 'Authentication Failed',
        text: 'Could not sign in with Google. Please try again.',
      });
      router.replace({ name: 'auth.signin' });
    }
  } else {
    router.replace({ name: 'auth.signin' });
  }
});
</script>