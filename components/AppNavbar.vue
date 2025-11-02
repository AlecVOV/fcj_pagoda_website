<template>
  <nav class="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <span class="font-serif text-2xl font-bold text-stone-800">FCAJ Team</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="nav-link"
          >
            {{ item.name }}
          </NuxtLink>
          
          <!-- Music Player in Navbar -->
          <div class="flex items-center space-x-3 border-l border-stone-200 pl-6">
            <!-- Radio/Music Menu Toggle Button -->
            <button 
              @click="toggleMusicMenu"
              class="p-2 rounded-full hover:bg-amber-50 transition-all duration-300 relative"
              :class="{ 'bg-amber-100': isMusicMenuOpen }"
            >
              <Icon 
                name="heroicons:musical-note" 
                class="w-6 h-6 text-amber-700"
              />
              <!-- Playing indicator -->
              <span 
                v-if="isPlaying" 
                class="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"
              ></span>
            </button>

            <!-- Current Track Name (Desktop) -->
            <div v-if="currentTrack" class="hidden lg:block text-sm text-stone-600 max-w-[150px] truncate">
              {{ currentTrack.name }}
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden p-2"
        >
          <Icon :name="isMobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="w-6 h-6" />
        </button>
      </div>

      <!-- Music Dropdown Menu (Desktop) -->
      <!-- Music Dropdown Menu (Desktop) -->
    <Transition name="slide-down">
      <div 
        v-if="isMusicMenuOpen"
        class="hidden md:block absolute right-4 top-20 bg-white rounded-lg shadow-xl p-4 w-64 z-50"
      >
        <h3 class="font-serif text-lg font-semibold text-stone-800 mb-3">Peaceful Sounds</h3>
        <div class="space-y-2">
          <button
            v-for="track in musicTracks"
            :key="track.id"
            @click="selectTrack(track)"
            class="w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3"
            :class="currentTrack?.id === track.id 
              ? 'bg-amber-100 text-amber-800' 
              : 'hover:bg-stone-50 text-stone-700'"
          >
            <!-- Playing indicator for current track -->
            <div class="flex-shrink-0">
              <Icon 
                v-if="currentTrack?.id === track.id"
                name="heroicons:musical-note" 
                class="w-5 h-5 text-amber-700 animate-pulse"
              />
              <Icon 
                v-else
                name="heroicons:musical-note" 
                class="w-5 h-5 text-stone-400"
              />
            </div>
            <span class="text-sm flex-1">{{ track.name }}</span>
            <!-- Round pulsing dot for selected track -->
            <span 
              v-if="currentTrack?.id === track.id"
              class="w-3 h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0"
            ></span>
          </button>
        </div>
      </div>
    </Transition>

      <!-- Mobile Menu -->
      <Transition name="slide-down">
        <div v-if="isMobileMenuOpen" class="md:hidden pb-4">
          <div class="flex flex-col space-y-2">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.path"
              :to="item.path"
              @click="closeMobileMenu"
              class="nav-link-mobile"
            >
              {{ item.name }}
            </NuxtLink>

            <!-- Mobile Music Controls -->
            <div class="border-t border-stone-200 pt-4 mt-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-serif text-sm font-semibold text-stone-800">Music Player</h3>
                <div v-if="isPlaying" class="flex items-center space-x-1">
                  <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span class="text-xs text-green-600">Playing</span>
                </div>
              </div>
              
              <!-- Track Selection -->
              <div class="space-y-2">
                <button
                  v-for="track in musicTracks"
                  :key="track.id"
                  @click="selectTrack(track)"
                  class="w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3"
                  :class="currentTrack?.id === track.id 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'hover:bg-stone-50 text-stone-700'"
                >
                  <Icon 
                    v-if="currentTrack?.id === track.id"
                    name="heroicons:musical-note" 
                    class="w-5 h-5 text-amber-700 animate-pulse"
                  />
                  <Icon 
                    v-else
                    name="heroicons:musical-note" 
                    class="w-5 h-5 text-stone-400"
                  />
                  <span class="text-sm flex-1">{{ track.name }}</span>
                  <Icon 
                    v-if="currentTrack?.id === track.id"
                    name="heroicons:check-circle-solid" 
                    class="w-5 h-5 text-green-400"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Hidden Audio Player -->
    <audio 
      ref="audioPlayer" 
      loop
      preload="auto"
      @ended="onTrackEnded"
      @loadstart="onLoadStart"
      @canplay="onCanPlay"
      @error="onError"
      @pause="onPause"
      @play="onPlay"
    />
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const navItems = [
  { name: 'Motivation Corner', path: '/' },
  { name: 'Wisdom Corner', path: '/wisdom' },
  { name: 'Charity Corner', path: '/charity' },
  { name: 'Temple Guide', path: '/temple-guide' }
]

const isMobileMenuOpen = ref(false)
const isMusicMenuOpen = ref(false)

// Music Player State
const isPlaying = ref(false)
const currentTrack = ref(null)
const audioPlayer = ref(null)
const isLoading = ref(false)

const musicTracks = [
  {
    id: 1,
    name: 'Namo Amitabha Chanting',
    url: '/audio/Namo Amitabha.mp3'
  },
  {
    id: 2,
    name: 'Six-Syllable Mantra',
    url: '/audio/Six-syllable Mantra.mp3'
  },
  {
    id: 3,
    name: 'Meditation Music',
    url: '/audio/Meditation Music.mp3'
  }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    isMusicMenuOpen.value = false
  }
}

const toggleMusicMenu = () => {
  isMusicMenuOpen.value = !isMusicMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const selectTrack = async (track) => {
  try {
    // If clicking the same track, do nothing
    if (currentTrack.value?.id === track.id) {
      // Close menu
      if (!isMobileMenuOpen.value) {
        isMusicMenuOpen.value = false
      }
      return
    }
    
    currentTrack.value = track
    isLoading.value = true
    
    if (audioPlayer.value) {
      audioPlayer.value.src = track.url
      audioPlayer.value.loop = true // Ensure loop is set
      audioPlayer.value.load()
      
      // Auto-play the new track
      try {
        await audioPlayer.value.play()
        isPlaying.value = true
      } catch (error) {
        console.error('Error playing audio:', error)
        // Retry after user interaction
        setTimeout(async () => {
          try {
            await audioPlayer.value.play()
            isPlaying.value = true
          } catch (retryError) {
            console.error('Retry failed:', retryError)
          }
        }, 100)
      }
    }
    
    // Close music menu after selection on desktop
    if (!isMobileMenuOpen.value) {
      isMusicMenuOpen.value = false
    }
  } catch (error) {
    console.error('Error selecting track:', error)
  } finally {
    isLoading.value = false
  }
}

const onTrackEnded = async () => {
  // Ensure continuous playback - restart the track immediately
  console.log('Track ended, restarting...')
  if (audioPlayer.value && currentTrack.value) {
    try {
      audioPlayer.value.currentTime = 0
      await audioPlayer.value.play()
      isPlaying.value = true
    } catch (error) {
      console.error('Error restarting track:', error)
    }
  }
}

const onLoadStart = () => {
  isLoading.value = true
}

const onCanPlay = () => {
  isLoading.value = false
}

const onError = (event) => {
  console.error('Audio error:', event)
  isPlaying.value = false
  isLoading.value = false
  console.error('Failed to load audio file. Track:', currentTrack.value?.name)
}

const onPause = () => {
  // Only set isPlaying to false if the audio is actually paused by user
  // Not when it's paused for buffering or track switching
  if (audioPlayer.value && audioPlayer.value.ended) {
    return // Ignore pause events when track has ended
  }
  isPlaying.value = false
}

const onPlay = () => {
  isPlaying.value = true
}

// Auto-start music when component mounts
const startAutoPlay = async () => {
  if (audioPlayer.value && musicTracks.length > 0) {
    currentTrack.value = musicTracks[0]
    audioPlayer.value.src = musicTracks[0].url
    audioPlayer.value.volume = 0.5 // Set default volume to 50%
    audioPlayer.value.loop = true // Ensure loop is enabled
    
    try {
      await audioPlayer.value.play()
      isPlaying.value = true
    } catch (error) {
      console.log('Autoplay blocked by browser. Music will start on user interaction.')
      // Browser blocked autoplay, wait for user interaction
      // Add click listener to start music on first click
      const startOnInteraction = async () => {
        try {
          await audioPlayer.value.play()
          isPlaying.value = true
          document.removeEventListener('click', startOnInteraction)
        } catch (e) {
          console.error('Failed to start music:', e)
        }
      }
      document.addEventListener('click', startOnInteraction, { once: true })
    }
  }
}

onMounted(() => {
  // Start autoplay after a short delay to ensure everything is loaded
  setTimeout(() => {
    startAutoPlay()
  }, 500)
})

onBeforeUnmount(() => {
  if (audioPlayer.value) {
    audioPlayer.value.pause()
    audioPlayer.value.src = ''
  }
})

if (process.client) {
  const handleClickOutside = (e) => {
    if (!e.target.closest('nav')) {
      isMusicMenuOpen.value = false
    }
  }
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
}
</script>

<style scoped>
.nav-link {
  @apply font-serif text-stone-700 hover:text-amber-700 transition-colors duration-200 font-medium;
}

.nav-link-mobile {
  @apply font-serif text-stone-700 hover:text-amber-700 hover:bg-stone-50 transition-colors duration-200 px-4 py-2 rounded-lg;
}

.router-link-active {
  @apply text-amber-700;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>