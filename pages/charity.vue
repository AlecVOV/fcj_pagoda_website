<template>
  <div class="min-h-screen bg-white py-16">
    <div class="max-w-6xl mx-auto px-4">
      <!-- Page Title -->
      <div class="text-center mb-16">
        <h1 class="font-serif text-4xl md:text-5xl font-bold text-stone-800 mb-6">
          Charity Corner
        </h1>
        <p class="font-sans text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
          Join us in making a difference. Every contribution, no matter how small, 
          helps create positive change in our community.
        </p>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- QR Code Section -->
        <div class="text-center lg:text-left">
          <div class="bg-white p-8 rounded-2xl shadow-2xl border border-stone-100 inline-block">
            <div class="mb-6">
              <h2 class="font-serif text-2xl font-semibold text-stone-800 mb-2">
                Vietnam Fatherland Front Committee
              </h2>
              <p class="font-sans text-stone-600">
                Scan to donate directly
              </p>
            </div>
            
            <!-- QR Code Placeholder -->
            <div class="w-64 h-64 mx-auto bg-gradient-to-br from-stone-100 to-stone-200 rounded-xl flex items-center justify-center mb-4">
              <div class="text-center">
                <img src="/mat_tran_to_quoc_viet_nam.png" alt="QR Code" class="w-32 h-32 mx-auto mb-2" />
                <p class="font-sans text-sm text-stone-500">QR Code</p>
                <p class="font-sans text-xs text-stone-400">Vietnam Fatherland Front</p>
              </div>
            </div>
            
            <!-- Bank Details -->
            <div class="text-center space-y-2">
              <p class="font-sans text-sm text-stone-600">
                <strong>Bank:</strong> MB Bank
              </p>
              <p class="font-sans text-sm text-stone-600">
                <strong>Account Number:</strong> 0606
              </p>
              <p class="font-sans text-sm text-stone-600">
                <strong>Purpose:</strong> Join hands to support our compatriots to overcome natural disasters
              </p>
            </div>
          </div>
        </div>

        <!-- Commitment Text Section -->
        <div class="space-y-8">
          <div class="bg-stone-50 p-8 rounded-2xl border border-stone-200">
            <h2 class="font-serif text-2xl font-semibold text-stone-800 mb-6">
              Our Commitment
            </h2>
            
            <div class="space-y-4 font-sans text-stone-700 leading-relaxed">
              <p>
                <strong>FCAJ Team</strong> operates with complete transparency and integrity 
                in all charitable activities.
              </p>
              
              <p>
                <strong>We do not keep any money.</strong> All donations are transferred 
                directly to the Vietnam Fatherland Front Committee, ensuring 100% of 
                your contribution reaches those in need.
              </p>
              
              <p>
                Our role is purely facilitative - we provide the platform and information 
                to connect generous hearts with meaningful causes.
              </p>
              
              <p>
                Every donation is tracked and reported transparently. We believe in 
                accountability and will provide regular updates on the impact of 
                community contributions.
              </p>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-200">
            <h3 class="font-serif text-lg font-semibold text-stone-800 mb-3">
              Questions or Concerns?
            </h3>
            <p class="font-sans text-stone-600 text-sm">
              All the information about our charitable activities is publicly available.
              We take the information on <a href="https://thiennguyen-bca.app/" target="_blank" rel="noopener noreferrer">https://thiennguyen-bca.app/</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Meta tags
useHead({
  title: 'Charity Corner - FCAJ Team',
  meta: [
    { name: 'description', content: 'Join our charitable efforts to make a positive impact in the community. Transparent donations through Vietnam Fatherland Front Committee.' }
  ]
})

// Reactive data for impact numbers
const totalDonations = ref('1,247')
const familiesHelped = ref('89')

// These would typically come from an API or database
// For now, using static values as placeholders
</script>