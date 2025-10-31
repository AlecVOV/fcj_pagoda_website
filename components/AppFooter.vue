<template>
  <footer class="bg-stone-100 border-t border-stone-200 py-8 mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <p class="text-stone-600 font-sans text-sm">
          © {{ currentYear }} FCAJ Team. All rights reserved. Made with ❤️ for peace and sharing.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>