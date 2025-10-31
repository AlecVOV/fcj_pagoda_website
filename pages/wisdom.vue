<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-16">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <!-- Page Title -->
      <h1 class="font-serif text-4xl md:text-5xl font-bold text-stone-800 mb-8">
        Wisdom Corner
      </h1>
      <p class="font-sans text-lg text-stone-600 mb-16 max-w-2xl mx-auto">
        Draw wisdom from ancient teachings and find guidance for your journey
      </p>

      <!-- Lotus/Divination Box Image -->
      <div class="mb-16">
        <div class="w-48 h-48 mx-auto mb-8 relative">
          <img
            src="/lotus.png"
            alt="Lotus Flower"
            class="w-full h-full object-cover rounded-full shadow-2xl"
          />
          <div class="absolute inset-0 rounded-full bg-gradient-to-t from-amber-200/20 to-transparent"></div>
        </div>
      </div>

      <!-- Draw Wisdom Button -->
      <button
        @click="drawWisdom"
        :disabled="isDrawing"
        class="btn-zen text-xl px-12 py-6 mb-16 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="!isDrawing">Seek a word of wisdom</span>
        <span v-else class="flex items-center space-x-2">
          <Icon name="heroicons:arrow-path" class="w-5 h-5 animate-spin" />
          <span>Taking wisdom...</span>
        </span>
      </button>

      <!-- Wisdom Card -->
      <div
        v-if="currentWisdom"
        class="wisdom-card max-w-2xl mx-auto fade-in"
      >
        <div class="mb-6">
          <Icon name="heroicons:sparkles" class="w-8 h-8 text-amber-600 mx-auto mb-4" />
        </div>
        
        <blockquote class="font-serif text-xl md:text-2xl text-stone-800 leading-relaxed mb-6 italic">
          "{{ currentWisdom.quote }}"
        </blockquote>
        
        <div class="border-t border-stone-200 pt-4">
          <p class="font-sans text-stone-600 font-medium">
            — {{ currentWisdom.author }}
          </p>
          <p class="font-sans text-sm text-stone-500 mt-1">
            {{ currentWisdom.source }}
          </p>
        </div>

        <!-- Copy Button -->
        <button
          @click="copyWisdom"
          class="mt-6 flex items-center space-x-2 mx-auto px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors duration-200"
        >
          <Icon name="heroicons:clipboard-document" class="w-4 h-4 text-stone-600" />
          <span class="font-sans text-sm text-stone-600">Copy advice</span>
        </button>

        <!-- Copy Success Message -->
        <p
          v-if="showCopySuccess"
          class="mt-2 font-sans text-sm text-green-600 fade-in"
        >
          Wisdom copied to clipboard!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Meta tags
useHead({
  title: 'Wisdom Corner - FCAJ Team',
  meta: [
    { name: 'description', content: 'Draw wisdom from ancient teachings and Buddhist philosophy to guide your spiritual journey.' }
  ]
})

// Reactive data
const currentWisdom = ref(null)
const isDrawing = ref(false)
const showCopySuccess = ref(false)
const wisdomQuotes = ref([])
const loadError = ref(false)

// Load wisdom quotes from JSON file
const loadWisdomQuotes = async () => {
  try {
    const response = await fetch('/data/wisdom-quotes.json')
    if (!response.ok) {
      throw new Error('Failed to load wisdom quotes')
    }
    wisdomQuotes.value = await response.json()
  } catch (error) {
    console.error('Error loading wisdom quotes:', error)
    loadError.value = true
  }
}

// Load quotes when component is mounted
onMounted(() => {
  loadWisdomQuotes()
})

// Methods
const drawWisdom = async () => {
  if (wisdomQuotes.value.length === 0) {
    console.error('No wisdom quotes available')
    return
  }
  
  isDrawing.value = true
  
  // Simulate card drawing animation delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Select random wisdom
  const randomIndex = Math.floor(Math.random() * wisdomQuotes.value.length)
  currentWisdom.value = wisdomQuotes.value[randomIndex]
  
  isDrawing.value = false
}

const copyWisdom = async () => {
  if (!currentWisdom.value) return
  
  const textToCopy = `"${currentWisdom.value.quote}" — ${currentWisdom.value.author}, ${currentWisdom.value.source}`
  
  try {
    await navigator.clipboard.writeText(textToCopy)
    showCopySuccess.value = true
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      showCopySuccess.value = false
    }, 3000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>