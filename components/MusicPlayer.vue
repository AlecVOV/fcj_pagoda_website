<template>
  <div class="fixed top-20 right-4 z-40">
    <!-- Music Player Toggle Button -->
    <button 
      @click="togglePlayer"
      class="music-player p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      :class="{ 'bg-amber-100': isExpanded }"
    >
      <Icon 
        :name="isPlaying ? 'heroicons:pause' : 'heroicons:musical-note'" 
        class="w-6 h-6 text-amber-700"
      />
    </button>

    <!-- Expanded Music Player -->
    <div 
      v-if="isExpanded"
      class="music-player mt-2 p-4 w-64 fade-in"
    >
      <h3 class="font-serif text-lg font-semibold text-stone-800 mb-3">Peaceful Sounds</h3>
      
      <!-- Music Selection -->
      <div class="space-y-2 mb-4">
        <button
          v-for="track in musicTracks"
          :key="track.id"
          @click="selectTrack(track)"
          class="w-full text-left p-2 rounded-md transition-colors duration-200 font-sans text-sm"
          :class="currentTrack?.id === track.id ? 'bg-amber-100 text-amber-800' : 'hover:bg-stone-50 text-stone-700'"
        >
          {{ track.name }}
        </button>
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-between">
        <button
          @click="togglePlayPause"
          class="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors duration-200"
        >
          <Icon 
            :name="isPlaying ? 'heroicons:pause' : 'heroicons:play'" 
            class="w-4 h-4"
          />
          <span class="font-sans text-sm">{{ isPlaying ? 'Pause' : 'Play' }}</span>
        </button>
        
        <div class="flex items-center space-x-2">
          <Icon name="heroicons:speaker-wave" class="w-4 h-4 text-stone-600" />
          <input
            v-model="volume"
            @input="updateVolume"
            type="range"
            min="0"
            max="100"
            class="w-16 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>

    <!-- Hidden Audio Element -->
    <audio
      ref="audioPlayer"
      loop
      @ended="onTrackEnded"
      @loadstart="onLoadStart"
      @canplay="onCanPlay"
    ></audio>
  </div>
</template>

<script setup>
const isExpanded = ref(false)
const isPlaying = ref(false)
const currentTrack = ref(null)
const volume = ref(50)
const audioPlayer = ref(null)

const musicTracks = [
  {
    id: 1,
    name: 'Namo Amituofo (Chinese)',
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

const togglePlayer = () => {
  isExpanded.value = !isExpanded.value
}

const selectTrack = (track) => {
  if (currentTrack.value?.id === track.id) return
  
  currentTrack.value = track
  if (audioPlayer.value) {
    audioPlayer.value.src = track.url
    if (isPlaying.value) {
      audioPlayer.value.play()
    }
  }
}

const togglePlayPause = () => {
  if (!currentTrack.value) {
    // Select first track if none selected
    selectTrack(musicTracks[0])
  }
  
  if (audioPlayer.value) {
    if (isPlaying.value) {
      audioPlayer.value.pause()
    } else {
      audioPlayer.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

const updateVolume = () => {
  if (audioPlayer.value) {
    audioPlayer.value.volume = volume.value / 100
  }
}

const onTrackEnded = () => {
  // Since loop is enabled, this shouldn't fire, but just in case
  isPlaying.value = false
}

const onLoadStart = () => {
  // Track started loading
}

const onCanPlay = () => {
  // Track is ready to play
  updateVolume()
}

onMounted(() => {
  // Set initial volume
  updateVolume()
})
</script>

<style scoped>
/* Custom range slider styling */
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #d97706;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #d97706;
  cursor: pointer;
  border: none;
}
</style>