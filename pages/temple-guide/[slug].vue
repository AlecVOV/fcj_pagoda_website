<template>
  <div class="min-h-screen bg-white">
    <!-- Article Header -->
    <div class="relative h-96 overflow-hidden">
      <img
        :src="article.image"
        :alt="article.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      
      <div class="absolute bottom-0 left-0 right-0 p-8">
        <div class="max-w-4xl mx-auto">
          <h1 class="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
            {{ article.title }}
          </h1>
          
          <div class="flex items-center space-x-4 text-white/90">
            <div class="flex items-center space-x-2">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span class="text-white font-semibold">{{ article.author.charAt(0) }}</span>
              </div>
              <span class="font-sans font-medium">{{ article.author }}</span>
            </div>
            <span class="font-sans text-sm">{{ formatDate(article.createdAt) }}</span>
            <span class="font-sans text-sm">{{ article.readTime }} min read</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Article Content -->
    <div class="max-w-4xl mx-auto px-4 py-16">
      <div class="prose prose-lg max-w-none">
        <div class="font-sans text-stone-700 leading-relaxed space-y-6">
          <p class="text-xl text-stone-600 font-light italic mb-8">
            {{ article.excerpt }}
          </p>
          
          <div v-html="article.content"></div>
        </div>
      </div>

      <!-- Share Section -->
      <div class="mt-16 pt-8 border-t border-stone-200">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-serif text-xl font-semibold text-stone-800 mb-2">
              Share this article
            </h3>
            <p class="font-sans text-stone-600 text-sm">
              Spread wisdom and inspiration with others
            </p>
          </div>
          
          <button
            @click="shareArticle"
            class="flex items-center space-x-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors duration-200"
          >
            <Icon name="heroicons:share" class="w-5 h-5" />
            <span class="font-sans font-medium">Copy Link</span>
          </button>
        </div>
      </div>

      <!-- Navigation -->
      <div class="mt-16 pt-8 border-t border-stone-200">
        <NuxtLink
          to="/temple-guide"
          class="inline-flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-sans font-medium transition-colors duration-200"
        >
          <Icon name="heroicons:arrow-left" class="w-4 h-4" />
          <span>Back to Temple Guide</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Share Success Message -->
    <div
      v-if="showShareSuccess"
      class="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg fade-in"
    >
      <div class="flex items-center space-x-2">
        <Icon name="heroicons:check-circle" class="w-5 h-5" />
        <span class="font-sans text-sm">Link copied to clipboard!</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const showShareSuccess = ref(false)

// Sample article data - in a real app, this would be fetched based on the slug
const article = ref({
  id: 1,
  title: 'The Art of Mindful Living: Finding Peace in Daily Routine',
  excerpt: 'Discover how to integrate mindfulness into your everyday activities and transform ordinary moments into opportunities for spiritual growth.',
  image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  author: 'FCAJ Team',
  createdAt: '2024-01-15T10:00:00Z',
  readTime: 8,
  content: `
    <p>In our fast-paced modern world, finding moments of peace and clarity can seem like an impossible task. Yet, the ancient practice of mindfulness offers us a pathway to transform our daily routines into opportunities for spiritual growth and inner peace.</p>

    <h2 class="font-serif text-2xl font-semibold text-stone-800 mt-8 mb-4">What is Mindful Living?</h2>
    
    <p>Mindful living is the practice of bringing conscious awareness to each moment of our day. It's about being fully present in whatever we're doing, whether it's washing dishes, walking to work, or having a conversation with a loved one.</p>

    <p>This practice doesn't require us to sit in meditation for hours or retreat from the world. Instead, it invites us to find the sacred in the ordinary, to discover peace in the midst of our busy lives.</p>

    <h2 class="font-serif text-2xl font-semibold text-stone-800 mt-8 mb-4">Simple Ways to Practice Mindfulness</h2>

    <h3 class="font-serif text-xl font-medium text-stone-800 mt-6 mb-3">Morning Rituals</h3>
    <p>Begin your day with intention. Before reaching for your phone or rushing into your routine, take three deep breaths. Feel your body, notice your surroundings, and set a gentle intention for the day ahead.</p>

    <h3 class="font-serif text-xl font-medium text-stone-800 mt-6 mb-3">Mindful Eating</h3>
    <p>Transform meals into meditation. Eat slowly, savor each bite, and appreciate the nourishment your food provides. This simple practice can bring profound awareness to one of our most basic daily activities.</p>

    <h3 class="font-serif text-xl font-medium text-stone-800 mt-6 mb-3">Walking Meditation</h3>
    <p>Whether you're walking to the bus stop or taking a stroll in the park, use this time for mindfulness. Feel your feet touching the ground, notice your breath, and observe the world around you without judgment.</p>

    <h2 class="font-serif text-2xl font-semibold text-stone-800 mt-8 mb-4">The Benefits of Daily Mindfulness</h2>

    <p>Regular mindfulness practice can lead to:</p>
    <ul class="list-disc list-inside space-y-2 my-4">
      <li>Reduced stress and anxiety</li>
      <li>Improved focus and concentration</li>
      <li>Better emotional regulation</li>
      <li>Enhanced relationships</li>
      <li>Greater appreciation for life's simple pleasures</li>
    </ul>

    <h2 class="font-serif text-2xl font-semibold text-stone-800 mt-8 mb-4">Starting Your Journey</h2>

    <p>Remember, mindfulness is a practice, not a destination. Start small – perhaps with just five minutes of conscious breathing each morning. Be patient with yourself and celebrate small victories along the way.</p>

    <p>As the Buddha taught, "The present moment is the only time over which we have dominion." By cultivating mindfulness in our daily lives, we reclaim this dominion and discover the peace that has always been within us.</p>

    <p class="italic text-stone-600 mt-8">May your journey toward mindful living bring you peace, clarity, and joy in each precious moment.</p>
  `
})

// Meta tags
useHead({
  title: `${article.value.title} - Temple Guide - FCAJ Team`,
  meta: [
    { name: 'description', content: article.value.excerpt }
  ]
})

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const shareArticle = async () => {
  const url = window.location.href
  
  try {
    await navigator.clipboard.writeText(url)
    showShareSuccess.value = true
    
    setTimeout(() => {
      showShareSuccess.value = false
    }, 3000)
  } catch (err) {
    console.error('Failed to copy link: ', err)
  }
}
</script>

<style scoped>
.prose h2 {
  @apply font-serif text-2xl font-semibold text-stone-800 mt-8 mb-4;
}

.prose h3 {
  @apply font-serif text-xl font-medium text-stone-800 mt-6 mb-3;
}

.prose p {
  @apply mb-4 leading-relaxed;
}

.prose ul {
  @apply my-4 space-y-2;
}

.prose li {
  @apply text-stone-700;
}
</style>