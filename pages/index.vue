<template>
  <div>
    <!-- Loading Screen - Shows first on initial visit -->
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

        <!-- Lotus Flower Icon -->
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

    <!-- Main Content - Shows after loading -->
    <div v-else>
      <!-- Hero Section with Background Image -->
      <div class="relative min-h-screen overflow-hidden rounded-b-3xl">
        <!-- Background Image Slideshow with Blur -->
        <div 
          class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[2000ms] ease-in-out"
          :style="{ backgroundImage: `url('/buddha_wallpaper/${currentImage}')` }"
        >
          <div class="absolute inset-0 backdrop-blur-sm bg-black/10"></div>
        </div>

        <!-- Hero Content -->
        <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
          <!-- Main Title -->
          <div class="text-center mb-12">
            <h1 class="font-serif text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Motivation Corner
            </h1>
            <p class="font-sans text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
              Share an anonymous wish. Breathe in calm, breathe out doubt. Let your words drift across a serene horizon.
            </p>
          </div>

          <!-- Send Wishes Button -->
          <button
            @click="openWishModal"
            class="btn-zen text-lg md:text-xl px-12 py-6 shadow-2xl hover:shadow-3xl"
          >
            Send a wish
          </button>
        </div>
      </div>

      <!-- Wish Wall Section - Below the image -->
      <div class="bg-gradient-to-b from-ivory to-cream-gold py-20 px-4">
        <div class="max-w-6xl mx-auto">
          <!-- Wish Wall Header -->
          <div class="text-center mb-12">
            <h2 class="font-serif text-3xl md:text-4xl font-bold text-wood-brown mb-4">
              Wish Wall
            </h2>
            <p class="font-sans text-lg text-stone-700 max-w-2xl mx-auto">
              Flowing intentions from the community. New wishes gently fade in.
            </p>
          </div>

          <!-- Wishes Display Area -->
          <div v-if="wishes.length === 0" class="text-center py-16">
            <div class="bg-white rounded-2xl p-12 max-w-2xl mx-auto shadow-xl">
              <p class="font-sans text-stone-600 text-lg leading-relaxed">
                Your wish wall is empty. Be the first to share a gentle intention.
              </p>
            </div>
          </div>
          
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="wish in wishes"
              :key="wish.id"
              class="wish-card lift-up fade-in"
            >
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <Icon name="heroicons:heart" class="w-4 h-4 text-white" />
                  </div>
                  <span class="font-sans text-sm text-stone-600">Anonymous</span>
                </div>
                <span class="font-sans text-xs text-stone-500">{{ formatDate(wish.createdAt) }}</span>
              </div>
              
              <p class="font-sans text-stone-800 leading-relaxed">{{ wish.content }}</p>
            </div>
          </div>
      </div>
    </div>

    <!-- Wish Modal -->
    <div
      v-if="showWishModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click="closeWishModal"
    >
      <div
        class="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl"
        @click.stop
      >
        <h2 class="font-serif text-2xl font-semibold text-stone-800 mb-4">Share Your Wish</h2>
        <p class="font-sans text-stone-600 mb-6">
          Write your wish, hope, or positive thought to share with the universe and others.
        </p>
        
        <textarea
          v-model="newWish"
          placeholder="Type your wish here..."
          class="w-full h-32 p-4 border border-stone-300 rounded-lg font-sans text-stone-800 resize-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          maxlength="500"
        ></textarea>
        
        <div class="flex justify-between items-center mt-4">
          <span class="font-sans text-sm text-stone-500">
            {{ newWish.length }}/500 characters
          </span>
          <div class="space-x-3">
            <button
              @click="closeWishModal"
              class="px-4 py-2 text-stone-600 hover:text-stone-800 font-sans transition-colors"
            >
              Cancel
            </button>
            <button
              @click="sendWish"
              :disabled="!newWish.trim() || newWish.length > 500"
              class="btn-zen px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send Wish
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
// Meta tags
useHead({
  title: 'Motivation Corner - FCAJ Team',
  meta: [
    { name: 'description', content: 'Share your wishes with the universe and find inspiration from others in our peaceful motivation corner.' }
  ]
})

// Reactive data
const showWishModal = ref(false)
const newWish = ref('')
const wishes = ref([])
const currentImage = ref('buddha_wallpaper_1.jpg')

// Array of available buddha wallpaper images
const buddhaImages = [
  'buddha_wallpaper_1.jpg',
  'buddha_wallpaper_2.jpg',
  'buddha_wallpaper_3.jpg',
  'buddha_wallpaper_4.jpg',
  'buddha_wallpaper_5.jpg',
  'buddha_wallpaper_6.jpg',
  'buddha_wallpaper_7.jpg',
  'buddha_wallpaper_8.jpg',
  'buddha_wallpaper_9.jpg',
  'buddha_wallpaper_10.jpg',
  'buddha_wallpaper_11.jpg',
  'buddha_wallpaper_12.jpg',
  'buddha_wallpaper_13.jpg',
]

// Image rotation function
let imageRotationInterval = null

const startImageRotation = () => {
  let currentIndex = 0
  
  imageRotationInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % buddhaImages.length
    currentImage.value = buddhaImages[currentIndex]
  }, 6000) // Change image every 6 seconds for smoother transition
}

onMounted(() => {
  // Load wishes from localStorage
  const savedWishes = localStorage.getItem('fcaj-wishes')
  if (savedWishes) {
    wishes.value = JSON.parse(savedWishes)
  }

  // Start image rotation
  startImageRotation()
})

// Cleanup on component unmount
onBeforeUnmount(() => {
  if (imageRotationInterval) {
    clearInterval(imageRotationInterval)
  }
})

// Methods
const openWishModal = () => {
  showWishModal.value = true
  newWish.value = ''
}

const closeWishModal = () => {
  showWishModal.value = false
  newWish.value = ''
}

const sendWish = () => {
  if (!newWish.value.trim() || newWish.value.length > 500) return
  
  const wish = {
    id: Date.now(),
    content: newWish.value.trim(),
    createdAt: new Date().toISOString()
  }
  
  wishes.value.unshift(wish)
  
  // Save to localStorage
  localStorage.setItem('fcaj-wishes', JSON.stringify(wishes.value))
  
  closeWishModal()
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
/* Loading Screen Styles */
.loading-screen {
  position: fixed;
  inset: 0;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FFFFF0 0%, #F5DEB3 50%, #FFFFF0 100%);
  background-size: 200% 200%;
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