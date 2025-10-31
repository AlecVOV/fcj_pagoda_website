<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 py-16">
    <div class="max-w-6xl mx-auto px-4">
      <!-- Page Header -->
      <div class="text-center mb-16">
        <h1 class="font-serif text-4xl md:text-5xl font-bold text-stone-800 mb-6">
          Temple Guide
        </h1>
        <p class="font-sans text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
          Discover wisdom, practices, and guidance for your spiritual journey. 
          A collection of insights and teachings to nurture your inner peace.
        </p>
      </div>

      <!-- Featured Post -->
      <div v-if="featuredPost" class="mb-16">
        <div class="bg-white rounded-2xl shadow-2xl overflow-hidden lift-up">
          <div class="relative h-64 md:h-80">
            <img
              :src="featuredPost.image"
              :alt="featuredPost.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div class="absolute top-4 left-4">
              <span class="bg-amber-600 text-white px-3 py-1 rounded-full font-sans text-sm font-medium">
                Featured
              </span>
            </div>
            <div class="absolute bottom-6 left-6 right-6">
              <h2 class="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
                {{ featuredPost.title }}
              </h2>
              <p class="font-sans text-white/90 text-sm md:text-base">
                {{ featuredPost.excerpt }}
              </p>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <span class="text-white font-semibold text-sm">{{ featuredPost.author.charAt(0) }}</span>
                </div>
                <div>
                  <p class="font-sans text-stone-800 font-medium">{{ featuredPost.author }}</p>
                  <p class="font-sans text-stone-500 text-sm">{{ formatDate(featuredPost.createdAt) }}</p>
                </div>
              </div>
              <button
                @click="sharePost(featuredPost)"
                class="flex items-center space-x-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors duration-200"
              >
                <Icon name="heroicons:share" class="w-4 h-4 text-stone-600" />
                <span class="font-sans text-sm text-stone-600">Share</span>
              </button>
            </div>
            <NuxtLink
              :to="`/temple-guide/${featuredPost.slug}`"
              class="inline-flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-sans font-medium transition-colors duration-200"
            >
              <span>Read Full Article</span>
              <Icon name="heroicons:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Posts Grid -->
      <div v-if="posts.length > 0" class="space-y-8">
        <h2 class="font-serif text-2xl font-semibold text-stone-800">Latest Articles</h2>
        
        <div class="space-y-6">
          <article
            v-for="post in posts"
            :key="post.id"
            class="bg-white rounded-xl shadow-lg overflow-hidden lift-up"
          >
            <div class="md:flex">
              <div class="md:w-1/3">
                <img
                  :src="post.image"
                  :alt="post.title"
                  class="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div class="md:w-2/3 p-6">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <span class="text-white font-semibold text-xs">{{ post.author.charAt(0) }}</span>
                    </div>
                    <div>
                      <p class="font-sans text-stone-700 text-sm font-medium">{{ post.author }}</p>
                      <p class="font-sans text-stone-500 text-xs">{{ formatDate(post.createdAt) }}</p>
                    </div>
                  </div>
                  <button
                    @click="sharePost(post)"
                    class="p-2 hover:bg-stone-100 rounded-lg transition-colors duration-200"
                  >
                    <Icon name="heroicons:share" class="w-4 h-4 text-stone-500" />
                  </button>
                </div>
                
                <h3 class="font-serif text-xl font-semibold text-stone-800 mb-3">
                  {{ post.title }}
                </h3>
                
                <p class="font-sans text-stone-600 mb-4 leading-relaxed">
                  {{ post.excerpt }}
                </p>
                
                <NuxtLink
                  :to="`/temple-guide/${post.slug}`"
                  class="inline-flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-sans font-medium transition-colors duration-200"
                >
                  <span>Read More</span>
                  <Icon name="heroicons:arrow-right" class="w-4 h-4" />
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-6 bg-stone-100 rounded-full flex items-center justify-center">
          <Icon name="heroicons:document-text" class="w-12 h-12 text-stone-400" />
        </div>
        <h2 class="font-serif text-2xl font-semibold text-stone-800 mb-4">
          Coming Soon
        </h2>
        <p class="font-sans text-stone-600 max-w-md mx-auto">
          We're preparing meaningful content for your spiritual journey. 
          Check back soon for inspiring articles and guidance.
        </p>
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
  </div>
</template>

<script setup>
// Meta tags
useHead({
  title: 'Temple Guide - FCAJ Team',
  meta: [
    { name: 'description', content: 'Discover wisdom, practices, and guidance for your spiritual journey through our temple guide articles and teachings.' }
  ]
})

// Reactive data
const showShareSuccess = ref(false)

// Sample data - in a real app, this would come from an API or CMS
const featuredPost = ref({
  id: 1,
  title: 'The Art of Mindful Living: Finding Peace in Daily Routine',
  excerpt: 'Discover how to integrate mindfulness into your everyday activities and transform ordinary moments into opportunities for spiritual growth.',
  content: '',
  image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  author: 'FCAJ Team',
  createdAt: '2024-01-15T10:00:00Z',
  slug: 'mindful-living-daily-routine'
})

const posts = ref([
  {
    id: 2,
    title: 'Understanding Buddhist Meditation Practices',
    excerpt: 'A comprehensive guide to different meditation techniques and how to incorporate them into your spiritual practice.',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    author: 'FCAJ Team',
    createdAt: '2024-01-10T14:30:00Z',
    slug: 'buddhist-meditation-practices'
  },
  {
    id: 3,
    title: 'The Power of Compassion in Modern Life',
    excerpt: 'Exploring how cultivating compassion can transform our relationships and bring greater meaning to our daily interactions.',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    author: 'FCAJ Team',
    createdAt: '2024-01-05T09:15:00Z',
    slug: 'power-of-compassion'
  }
])

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const sharePost = async (post) => {
  const url = `${window.location.origin}/temple-guide/${post.slug}`
  
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