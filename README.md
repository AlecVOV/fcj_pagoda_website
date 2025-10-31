# 💎 FCAJ Team - Zen & Sharing Website

A peaceful and elegant website built with Nuxt.js, featuring motivation sharing, wisdom quotes, charity information, and spiritual guidance.

## ✨ Features

### 🏠 **Motivation Corner (Home Page)**
- Beautiful wish wall with blurred bamboo forest background
- Users can send wishes to the universe (500 character limit)
- Real-time display of wishes with fade-in animations
- Responsive grid layout (1 column on mobile)

### 🧘 **Wisdom Corner**
- Interactive wisdom card drawing experience
- Curated collection of Buddhist and spiritual quotes
- Copy-to-clipboard functionality
- Elegant lotus flower imagery

### ❤️ **Charity Corner**
- QR code for Vietnam Fatherland Front Committee donations
- Transparent commitment statements
- Impact tracking display
- Professional, formal design

### 📖 **Temple Guide (Blog)**
- Magazine-style layout with featured posts
- Article sharing functionality (copy link)
- Responsive design with lift-up hover effects
- Rich content display with proper typography

### 🎵 **Music Player**
- Fixed position music player in navbar
- 3 types of peaceful music: Buddhist chanting, Six-character mantra, Instrumental meditation
- Continuous playback across page navigation
- Volume control and play/pause functionality

### 🎨 **Design System**
- **Colors**: Wood brown, Copper gold, Cream gold, Moss green, Ivory white
- **Typography**: Playfair Display (serif) for headings, Inter (sans-serif) for body text
- **Animations**: Fade-in effects, lift-up hover states, smooth transitions
- **Responsive**: Mobile-first design with proper breakpoints

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd fcj-zen-app

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit `http://localhost:3000` to see your application.

### Production

```bash
# Build for production
npm run build
# or
yarn build
# or
pnpm build

# Preview production build
npm run preview
# or
yarn preview
# or
pnpm preview
```

## 📁 Project Structure

```
fcj-zen-app/
├── assets/
│   └── css/
│       └── main.css          # Global styles and custom CSS
├── components/
│   ├── AppNavbar.vue         # Main navigation component
│   ├── AppFooter.vue         # Footer component
│   └── MusicPlayer.vue       # Floating music player
├── pages/
│   ├── index.vue             # Motivation Corner (Home)
│   ├── wisdom.vue            # Wisdom Corner
│   ├── charity.vue           # Charity Corner
│   └── temple-guide/
│       ├── index.vue         # Blog listing page
│       └── [slug].vue        # Individual article page
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── app.vue                   # Root component
├── error.vue                 # 404 error page
├── nuxt.config.ts           # Nuxt configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json
```

## 🛠️ Technologies Used

- **Framework**: Nuxt.js 4.2.0
- **Styling**: Tailwind CSS
- **Icons**: Nuxt Icon (Heroicons)
- **Fonts**: Google Fonts (Playfair Display, Inter)
- **Storage**: LocalStorage for wishes persistence

## 🎨 Customization

### Colors
The color palette is defined in both CSS variables and Tailwind config:
- Wood Brown: `#8B4513`
- Copper Gold: `#B87333` 
- Cream Gold: `#F5DEB3`
- Moss Green: `#8FBC8F`
- Ivory White: `#FFFFF0`

### Content Management
- **Wishes**: Stored in browser localStorage
- **Wisdom Quotes**: Defined in `pages/wisdom.vue`
- **Blog Posts**: Sample data in temple-guide pages (ready for CMS integration)

### Music Integration
Replace placeholder audio URLs in `components/MusicPlayer.vue` with actual audio files:
```javascript
const musicTracks = [
  {
    id: 1,
    name: 'Buddhist Chanting',
    url: '/audio/buddhist-chanting.mp3' // Add your audio files to public/audio/
  },
  // ... more tracks
]
```

## 🌟 Key Features Implementation

### Micro-interactions
- Hover effects on buttons and cards
- Smooth color transitions
- Lift-up animations on card hover
- Fade-in animations for new content

### Responsive Design
- Mobile-first approach
- Collapsible navigation menu
- Responsive grid layouts
- Optimized typography scaling

### Performance
- Lazy loading for images
- Optimized font loading
- Efficient component structure
- Minimal bundle size

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to FCAJ Team.

## 🙏 Acknowledgments

- Buddhist teachings and wisdom quotes
- Unsplash for beautiful imagery
- The open-source community for amazing tools

---

Made with ❤️ by FCAJ Team for peace and sharing.
