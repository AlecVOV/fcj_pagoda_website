<template>
  <!-- Loading Screen - Auto-starts and navigates to index -->
  <div v-if="isLoading" class="loading-screen">
      <div class="loading-content">
        <!-- FCAJ Logo/Text -->
        <div class="logo-container">
          <h1 class="font-serif text-5xl md:text-7xl font-bold text-stone-800 mb-4">
            FCAJ
          </h1>
          <p class="font-sans text-lg text-stone-600 mb-8">
            Zen & Sharing
          </p>
        </div>

        <!-- Lotus Flower Icon - FIXED CENTERING -->
        <div class="lotus-icon mb-8">
          <svg class="w-16 h-16 mx-auto text-amber-600 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C12 2 9 6 9 10C9 11.66 10.34 13 12 13C13.66 13 15 11.66 15 10C15 6 12 2 12 2Z"/>
            <path d="M7 10C7 10 4 12 4 15C4 16.66 5.34 18 7 18C8.66 18 10 16.66 10 15C10 12 7 10 7 10Z"/>
            <path d="M17 10C17 10 20 12 20 15C20 16.66 18.66 18 17 18C15.34 18 14 16.66 14 15C14 12 17 10 17 10Z"/>
            <path d="M12 13C12 13 9 15 9 18C9 19.66 10.34 21 12 21C13.66 21 15 19.66 15 18C15 15 12 13 12 13Z"/>
          </svg>
        </div>

        <!-- Loading Bar -->
        <div class="loading-bar-container">
          <div class="loading-bar-track">
            <div class="loading-bar-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <p class="font-sans text-sm text-stone-500 mt-3">
            Preparing your peaceful journey... {{ Math.floor(progress) }}%
          </p>
        </div>

      </div>

      <!-- Decorative Elements -->
      <div class="decorative-elements">
        <div class="floating-circle circle-1"></div>
        <div class="floating-circle circle-2"></div>
        <div class="floating-circle circle-3"></div>
      </div>
    </div>
</template>

<script setup>
const isLoading = ref(true)
const progress = ref(0)
const router = useRouter()

onMounted(() => {
  // Mark that user has seen the loading screen
  sessionStorage.setItem('hasSeenLoading', 'true')
  
  // Load for exactly 4 seconds, reaching 100%
  const duration = 4000 // 4 seconds
  const interval = 50 // Update every 50ms
  const increment = 100 / (duration / interval)
  
  const loadingInterval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += increment
      if (progress.value >= 100) {
        progress.value = 100
      }
    } else {
      clearInterval(loadingInterval)
      // After loading completes, navigate to index page
      setTimeout(() => {
        router.push('/')
      }, 500)
    }
  }, interval)
})
</script>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FFFFF0 0%, #F5DEB3 50%, #FFFFF0 100%);
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.loading-content {
  text-align: center;
  z-index: 10;
  animation: fadeInUp 0.8s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-container {
  animation: logoFloat 2s ease-in-out infinite;
}

@keyframes logoFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.lotus-icon {
  animation: lotusRotate 4s ease-in-out infinite;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes lotusRotate {
  0%, 100% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(5deg) scale(1.1);
  }
}

.loading-bar-container {
  width: 280px;
  margin: 0 auto;
}

.loading-bar-track {
  width: 100%;
  height: 8px;
  background: linear-gradient(90deg, 
    rgba(139, 69, 19, 0.1) 0%, 
    rgba(245, 222, 179, 0.3) 100%
  );
  border-radius: 999px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, 
    #B87333 0%, 
    #F5DEB3 50%, 
    #B87333 100%
  );
  background-size: 200% 100%;
  border-radius: 999px;
  transition: width 0.05s linear;
  animation: shimmer 1.5s ease-in-out infinite;
  box-shadow: 0 2px 8px rgba(184, 115, 51, 0.4);
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Decorative floating elements */
.decorative-elements {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.floating-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(184, 115, 51, 0.15) 0%, transparent 70%);
  animation: float 8s ease-in-out infinite;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
  animation-delay: 0s;
}

.circle-2 {
  width: 400px;
  height: 400px;
  bottom: -200px;
  right: -200px;
  animation-delay: 2s;
}

.circle-3 {
  width: 250px;
  height: 250px;
  top: 50%;
  right: -125px;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(20px, -20px) scale(1.1);
    opacity: 0.5;
  }
}
</style>