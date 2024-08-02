<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex-1">
      <slot />
    </div>
    <footer>
      <UContainer class="p-2">
        <p class="text-center">
          Made with ❤️ by <NuxtLink to="http://emmanuelapabiekun.vercel.app/" target="_blank" external class="text-primary-500">Emmanuel
            Apabiekun</NuxtLink>
        </p>
      </UContainer>
    </footer>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>