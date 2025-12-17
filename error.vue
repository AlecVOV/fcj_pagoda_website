<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Background Image -->
    <div 
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
    >
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <!-- Error Icon -->
      <div class="mb-8">
        <div class="w-24 h-24 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Icon name="heroicons:map" class="w-12 h-12 text-white" />
        </div>
      </div>

      <!-- Error Message -->
      <div class="max-w-2xl mx-auto mb-12">
        <h1 class="font-serif text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Lost in the Forest
        </h1>
        <p class="font-sans text-lg md:text-xl text-white/90 leading-relaxed drop-shadow">
          It seems you've wandered off the path and lost your way. 
          <br class="hidden md:block">
          Please return to the home page to find some peace.
        </p>
      </div>

      <!-- Error Details -->
      <div class="mb-12 text-white/80">
        <p class="font-sans text-sm">
          Error {{ error.statusCode }}: {{ error.statusMessage }}
        </p>
      </div>

      <!-- Back to Home Button -->
      <NuxtLink
        to="/"
        class="btn-zen text-lg px-8 py-4 shadow-2xl hover:shadow-3xl inline-flex items-center space-x-3"
      >
        <Icon name="heroicons:home" class="w-5 h-5" />
        <span>Back to Home</span>
      </NuxtLink>

      <!-- Additional Navigation -->
      <div class="mt-8 flex flex-wrap justify-center gap-4 text-white/80">
        <NuxtLink 
          to="/wisdom" 
          class="font-sans text-sm hover:text-white transition-colors duration-200 underline underline-offset-4"
        >
          Wisdom Corner
        </NuxtLink>
        <NuxtLink 
          to="/charity" 
          class="font-sans text-sm hover:text-white transition-colors duration-200 underline underline-offset-4"
        >
          Charity Corner
        </NuxtLink>
      </div>
    </div>

    <!-- Floating Elements for Ambiance -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
      <div class="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000"></div>
      <div class="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-2000"></div>
    </div>
  </div>
</template>

<script setup>
// Get error details
const props = defineProps({
  error: Object
})

// Set page title
useHead({
  title: 'Page Not Found - FCAJ Team'
})
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 3s ease-in-out infinite;
}

.delay-1000 {
  animation-delay: 1s;
}

.delay-2000 {
  animation-delay: 2s;
}
</style>