<script setup lang="ts">
const user = useSupabaseUser();
const client = useSupabaseAuthClient();
const router = useRouter();
// Login method using providers
const login = async (provider: "google") => {
  const { error } = await client.auth.signInWithOAuth({ provider });
  if (error) {
    return alert("Something went wrong !");
  }
  router.push("/");
};
</script>
<template>
  <button class="btn" @click="login('google')">Login with Google</button>
</template>
