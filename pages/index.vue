<template>
  <div class="min-h-screen relative">
    <!-- Background Image -->
    <div 
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url('/buddha_wallpaper.jpg');"
    >
      <div class="absolute inset-0 bg-black/30"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
      <!-- Main Title -->
      <div class="text-center mb-12">
        <h1 class="font-serif text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Motivation Corner
        </h1>
        <p class="font-sans text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
          Share your wishes with the Buddha and find inspiration from others
        </p>
      </div>

      <!-- Send Wishes Button -->
      <button
        @click="openWishModal"
        class="btn-zen text-lg md:text-xl px-12 py-6 mb-16 shadow-2xl hover:shadow-3xl"
      >
        Send Wishes to the Universe
      </button>

      <!-- Wishes Display Area -->
      <div class="w-full max-w-6xl">
        <div v-if="wishes.length === 0" class="text-center text-white/80 font-sans text-lg">
          <p>No wishes have been shared yet. Be the first to send your wish to the universe!</p>
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

// Load wishes from localStorage on mount
onMounted(() => {
  const savedWishes = localStorage.getItem('fcaj-wishes')
  if (savedWishes) {
    wishes.value = JSON.parse(savedWishes)
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