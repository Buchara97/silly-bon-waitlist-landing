const base = import.meta.env.BASE_URL

export const siteAssets = {
  icon: `${base}assets/app_icon.png`,
  playBadge: `${base}assets/google-play-badge.webp`,
  screenshots: [
    `${base}assets/Screenshots/01.png`,
    `${base}assets/Screenshots/02.png`,
    `${base}assets/Screenshots/03.png`,
    `${base}assets/Screenshots/04.png`,
    `${base}assets/Screenshots/05.png`,
  ],
} as const

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.sillybon.app'

export const SUPPORT_EMAIL = 'support@sillybon.com'

export const socialLinks = {
  instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/sillybondog/',
  tiktok: import.meta.env.VITE_TIKTOK_URL || 'https://www.tiktok.com/@sillybondog',
  youtube: import.meta.env.VITE_YOUTUBE_URL || 'https://www.youtube.com/@sillybondog',
} as const

export const featureCards = [
  {
    emoji: '🎭',
    title: 'Mood memes',
    body: 'Pick a mood, add a caption, and send how you feel without a long text.',
  },
  {
    emoji: '👆',
    title: 'Partner taps',
    body: 'Miss U, Pat, Love, and more — tiny taps that say more than a paragraph.',
  },
  {
    emoji: '📱',
    title: 'Home screen widgets',
    body: 'See their vibe and send quick interacts without opening the app.',
  },
  {
    emoji: '💞',
    title: 'Shared pair Premium',
    body: 'One subscription unlocks Silly Bon for both of you.',
  },
  {
    emoji: '💬',
    title: 'Daily questions',
    body: 'Stay in sync with prompts that spark silly and meaningful chats.',
  },
  {
    emoji: '🐶',
    title: 'Your silly dogs',
    body: 'Blue and pink Bons that turn emotions into playful couple rituals.',
  },
] as const
