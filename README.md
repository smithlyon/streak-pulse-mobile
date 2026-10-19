# DailyPulse - Mobile Streak & Task Tracker

A sleek, production-ready React web application styled inside an authentic modern smartphone chassis wrapper.

## ✨ Features

- **📱 Smartphone Chassis Wrapper**:
  - Max-width: 400px with realistic curved corners (`rounded-[50px]`)
  - Top status bar featuring a live dynamic clock, battery, Wi-Fi, cellular signal bars, and a modern Dynamic Island / notch
  - Bottom iOS-style home indicator bar
  - External metallic chassis accents (volume rockers, mute switch, power button)
- **🎨 Dual Dark Themes**:
  - **"Jojo"**: Deep obsidian/navy dark mode with vibrant sky-blue accents and glows
  - **"Chocks"**: Midnight violet dark mode with rich neon purple accents and glows
  - Fluid animated sliding toggle with theme persistence in `localStorage`
- **🔥 Dynamic Daily Streak Progress Bar**:
  - Real-time percentage calculation based on daily tasks
  - Animated spring progress bar with ambient glow
  - Celebration confetti effect triggered when reaching 100% completion
- **📅 Interactive Day Selector**:
  - Monday to Sunday pill structure with day dates
  - Mini completion indicators (status dots & checkmarks)
  - Framer Motion sliding pill indicator
- **✅ Task List with Fluid Animations**:
  - Custom bouncy animated checkboxes
  - Strikethrough text styling and opacity transition for completed tasks
  - Category badges with dedicated icons (Fitness, Work, Learning, Health, Mind)
  - Filter pills (All, Active, Completed)
- **🔐 Secret Admin PIN Modal (`PIN: 1234`)**:
  - Triggered by clicking the ✨ **Sparkle** icon in the header
  - iOS-style 4-digit keypad with physical keyboard support
  - Shake animation and hint on incorrect PIN
  - Unlocks inline task creation form (title, category, time) and dynamic task deletion

## 🛠️ Stack

- **React 18**
- **Vite**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**
- **Canvas Confetti**

## 🚀 Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.
