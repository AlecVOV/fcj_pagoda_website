<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
    <NuxtRouteAnnouncer />
    <ClientOnly>
      <AppNavbar v-show="!isLoadingPage" />
    </ClientOnly>
    <main class="pt-20">
      <NuxtPage />
    </main>
    <ClientOnly>
      <AppFooter v-show="!isLoadingPage" />
    </ClientOnly>
  </div>
</template>

<script setup>
const isLoadingPage = useState('isLoadingPage', () => false)
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom CSS Variables for the color palette */
:root {
  --wood-brown: #8B4513;
  --copper-gold: #B87333;
  --cream-gold: #F5DEB3;
  --moss-green: #8FBC8F;
  --ivory-white: #FFFFF0;
}

/* Font families */
.font-serif {
  font-family: 'Playfair Display', serif;
}

.font-sans {
  font-family: 'Inter', sans-serif;
}

/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes liftUp {
  from {
    transform: translateY(0) scale(1);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  to {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

.lift-up {
  transition: all 0.3s ease;
}

.lift-up:hover {
  animation: liftUp 0.3s ease forwards;
}

/* Custom button styles */
.btn-zen {
  @apply px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105;
  background: linear-gradient(135deg, var(--copper-gold), var(--cream-gold));
  color: var(--wood-brown);
}

.btn-zen:hover {
  background: linear-gradient(135deg, var(--cream-gold), var(--copper-gold));
}

/* Card styles */
.wish-card {
  @apply bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/20;
  background: linear-gradient(135deg, rgba(255, 255, 240, 0.9), rgba(245, 222, 179, 0.8));
}

.wisdom-card {
  @apply bg-white rounded-xl p-8 shadow-2xl border border-gray-100;
  background: linear-gradient(135deg, var(--ivory-white), var(--cream-gold));
}

/* Music player styles */
.music-player {
  @apply bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-white/20;
}
</style>
